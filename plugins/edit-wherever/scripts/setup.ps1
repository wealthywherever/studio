# Edit Wherever setup for Windows. Installs everything the studio needs, then checks it.
# Safe to run again: it skips what is already installed. Prints one plain line per step.
$ErrorActionPreference = "Continue"
$Home2 = if ($env:EDIT_WHEREVER_HOME) { $env:EDIT_WHEREVER_HOME } else { Join-Path $env:USERPROFILE "Edit Wherever" }
$Log = Join-Path $Home2 ".studio\setup-log.txt"
New-Item -ItemType Directory -Force (Split-Path $Log), (Join-Path $Home2 "Inbox"), (Join-Path $Home2 "Projects"), (Join-Path $Home2 "Brand") | Out-Null
function Say($n, $t) { Write-Output "[$n/6] $t" ; Add-Content $Log "$(Get-Date -Format s) $t" }
function Has($c) { [bool](Get-Command $c -ErrorAction SilentlyContinue) }
function RefreshPath { $env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User") }
$haveWinget = Has winget
$HF = "hyperframes@0.8.206"   # every flag the studio uses was checked on this version
$Installed = $false           # anything new on PATH needs a Claude restart before Claude can see it

Say 1 "Checking Node.js (runs your studio)..."
function NodeMajor { if (Has node) { [int](((node --version) -replace 'v', '').Split('.')[0]) } else { 0 } }
if ((NodeMajor) -lt 22) {   # HyperFrames needs Node 22+; an older Node "works" until the first render
  if ($haveWinget) { winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements --silent 2>&1 | Add-Content $Log; RefreshPath; $Installed = $true }
  if ((NodeMajor) -lt 22) { Say 1 "FAILED: Edit Wherever needs Node.js 22 or newer. Install the LTS version from https://nodejs.org, then run setup again."; exit 1 }
}
Say 1 "Node.js $(node --version) ready."

Say 2 "Checking ffmpeg (cuts, sound, export)..."
if (-not (Has ffmpeg)) {
  if ($haveWinget) { winget install -e --id Gyan.FFmpeg --accept-source-agreements --accept-package-agreements --silent 2>&1 | Add-Content $Log; RefreshPath; $Installed = $true }
  if (-not (Has ffmpeg)) { Say 2 "FAILED: could not install ffmpeg automatically. Install it from https://ffmpeg.org/download.html, then run setup again."; exit 1 }
}
Say 2 "ffmpeg ready."

Say 3 "Installing HyperFrames (the motion-graphics engine)..."
if (-not (Has hyperframes)) { npm install -g $HF --no-fund --no-audit 2>&1 | Add-Content $Log; RefreshPath; $Installed = $true }
if (-not (Has hyperframes)) { Say 3 "FAILED: HyperFrames did not install. See $Log"; exit 1 }
Say 3 "HyperFrames ready."

Say 4 "Downloading the render browser (one time, ~150 MB)..."
hyperframes browser ensure 2>&1 | Add-Content $Log
$chrome = (hyperframes browser path 2>$null | Select-Object -Last 1)
if (-not $chrome -or -not (Test-Path $chrome)) { Say 4 "FAILED: the render browser did not download. Check your internet and run setup again."; exit 1 }
Say 4 "Render browser ready."
Say 5 "Downloading the caption model (one time, ~600 MB, runs offline)..."
hyperframes models install parakeet 2>&1 | Add-Content $Log
if ((hyperframes models list --json 2>$null | Out-String) -notmatch '"engine":"parakeet"[^}]*"installed":true') { Say 5 "FAILED: the caption model did not download. Check your internet and run setup again."; exit 1 }
Say 5 "Caption model ready."

# optional: lets the studio study the full original of an example post (with sound). Not fatal if it fails.
if (-not (Has yt-dlp)) { if ($haveWinget) { winget install -e --id yt-dlp.yt-dlp --accept-source-agreements --accept-package-agreements --silent | Out-Null; RefreshPath; $Installed = $true } }
if (Has yt-dlp) { Add-Content $Log "yt-dlp ready" } else { Add-Content $Log "yt-dlp not installed: examples will use the studio's short clips" }

Say 6 "Testing a 2-second render..."
# the test video stays in .studio, so it never counts as the buyer's first video; deleted first so an old one can't fake a pass
$t = Join-Path $env:TEMP "ws-setup-test"; $out = Join-Path $Home2 ".studio\setup-test.mp4"
Remove-Item -Recurse -Force $t, $out -ErrorAction SilentlyContinue
hyperframes init $t --non-interactive --skip-skills 2>&1 | Add-Content $Log
Push-Location $t; hyperframes render -o $out 2>&1 | Add-Content $Log; Pop-Location
if ((Test-Path $out) -and (Get-Item $out).Length -gt 0) { Remove-Item -Force $out; Say 6 "All set. Your studio can render videos." } elseif ($Installed) { Write-Output "RESTART NEEDED: new tools were installed. Quit Claude fully and reopen it, then run setup once more to finish the test."; exit 0 }   # a fresh install usually just needs the restart
else { Say 6 "Render test did not finish. Reply to your purchase email with the file $Log attached." ; exit 1 }
if ($Installed) { Write-Output "RESTART NEEDED: new tools were installed. Quit Claude fully and reopen it before making a video." }
