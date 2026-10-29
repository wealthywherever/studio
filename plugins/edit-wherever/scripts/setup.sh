#!/usr/bin/env bash
# Edit Wherever setup for macOS. Installs everything into the user's own folder: no admin password needed.
# Safe to run again: it skips what is already installed. Prints one plain line per step.
HOME2="${EDIT_WHEREVER_HOME:-$HOME/Edit Wherever}"; TOOLS="$HOME2/.studio/tools"; LOG="$HOME2/.studio/setup-log.txt"
mkdir -p "$TOOLS/bin" "$HOME2/Inbox" "$HOME2/Projects" "$HOME2/Brand"; export PATH="$TOOLS/bin:$TOOLS/node/bin:$PATH"
say() { echo "[$1/6] $2"; echo "$(date -u +%FT%T) $2" >> "$LOG"; }
has() { command -v "$1" >/dev/null 2>&1; }
HF="hyperframes@0.8.206"   # every flag the studio uses was checked on this version
INSTALLED=""              # anything new on PATH needs a Claude restart before Claude can see it
ARCH=$(uname -m); [ "$ARCH" = "arm64" ] && NARCH=arm64 || NARCH=x64
# make the tools available in every new terminal and Claude session
grep -q "Edit Wherever tools" "$HOME/.zprofile" 2>/dev/null || printf '\n# Edit Wherever tools\nexport PATH="%s/bin:%s/node/bin:$PATH"\n' "$TOOLS" "$TOOLS" >> "$HOME/.zprofile"

say 1 "Checking Node.js (runs your studio)..."
node_major() { if has node; then node --version | tr -d v | cut -d. -f1; else echo 0; fi; }
if [ "$(node_major)" -lt 22 ]; then INSTALLED=1   # HyperFrames needs Node 22+
  if has brew; then brew install node >> "$LOG" 2>&1
  else V=$(curl -fsSL https://nodejs.org/dist/index.json | grep -o '"version":"v22[^"]*"' | head -1 | cut -d'"' -f4)
       curl -fsSL "https://nodejs.org/dist/$V/node-$V-darwin-$NARCH.tar.gz" | tar -xz -C "$TOOLS" && mv "$TOOLS/node-$V-darwin-$NARCH" "$TOOLS/node"; fi
fi
[ "$(node_major)" -ge 22 ] || { say 1 "FAILED: Edit Wherever needs Node.js 22 or newer. Install the LTS version from https://nodejs.org, then run setup again."; exit 1; }
say 1 "Node.js $(node --version) ready."

say 2 "Checking ffmpeg (cuts, sound, export)..."
if ! has ffmpeg; then INSTALLED=1
  if has brew; then brew install ffmpeg >> "$LOG" 2>&1
  else npm install --prefix "$TOOLS" ffmpeg-static ffprobe-static --no-fund --no-audit >> "$LOG" 2>&1
       ln -sf "$TOOLS/node_modules/ffmpeg-static/ffmpeg" "$TOOLS/bin/ffmpeg"
       ln -sf "$(find "$TOOLS/node_modules/ffprobe-static/bin/darwin" -name ffprobe | grep "$NARCH" | head -1)" "$TOOLS/bin/ffprobe"; fi
fi
has ffmpeg || { say 2 "FAILED: could not install ffmpeg."; exit 1; }
say 2 "ffmpeg ready."

say 3 "Installing HyperFrames (the motion-graphics engine)..."
has hyperframes || { INSTALLED=1; npm install -g "$HF" --prefix "$TOOLS/node" --no-fund --no-audit >> "$LOG" 2>&1 || npm install -g "$HF" --no-fund --no-audit >> "$LOG" 2>&1; }
has hyperframes || { say 3 "FAILED: HyperFrames did not install. See $LOG"; exit 1; }
say 3 "HyperFrames ready."

say 4 "Downloading the render browser (one time, ~150 MB)..."; hyperframes browser ensure >> "$LOG" 2>&1
CHROME=$(hyperframes browser path 2>/dev/null | tail -1); [ -n "$CHROME" ] && [ -e "$CHROME" ] || { say 4 "FAILED: the render browser did not download. Check your internet and run setup again."; exit 1; }
say 4 "Render browser ready."
say 5 "Downloading the caption model (one time, ~600 MB, runs offline)..."; hyperframes models install parakeet >> "$LOG" 2>&1
hyperframes models list --json 2>/dev/null | grep -q '"engine":"parakeet"[^}]*"installed":true' || { say 5 "FAILED: the caption model did not download. Check your internet and run setup again."; exit 1; }
say 5 "Caption model ready."

# optional: lets the studio study the full original of an example post (with sound). Not fatal if it fails.
if ! has yt-dlp; then INSTALLED=1
  if has brew; then brew install yt-dlp >> "$LOG" 2>&1
  else curl -fsSL -o "$TOOLS/bin/yt-dlp" https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos >> "$LOG" 2>&1 && chmod +x "$TOOLS/bin/yt-dlp"; fi
fi
has yt-dlp && echo "yt-dlp ready" >> "$LOG" || echo "yt-dlp not installed: examples will use the studio's short clips" >> "$LOG"

say 6 "Testing a 2-second render..."
# the test video stays in .studio, so it never counts as the buyer's first video; deleted first so an old one can't fake a pass
OUT="$HOME2/.studio/setup-test.mp4"; rm -f "$OUT"
T=$(mktemp -d)/ws-test; hyperframes init "$T" --non-interactive --skip-skills >> "$LOG" 2>&1 && (cd "$T" && hyperframes render -o "$OUT" >> "$LOG" 2>&1)
[ -s "$OUT" ] && { rm -f "$OUT"; say 6 "All set. Your studio can render videos."; } || { if [ -n "$INSTALLED" ]; then echo "RESTART NEEDED: new tools were installed. Quit Claude fully and reopen it, then run setup once more to finish the test."; exit 0; fi; say 6 "Render test did not finish. Reply to your purchase email with the file $LOG attached."; exit 1; }
if [ -n "$INSTALLED" ]; then echo "RESTART NEEDED: new tools were installed. Quit Claude fully and reopen it before making a video."; fi
