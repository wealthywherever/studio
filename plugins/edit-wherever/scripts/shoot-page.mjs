import r from"node:fs";import a from"node:path";import{fileURLToPath as n}from"node:url";var i={hello:"Director online. I'll set up each shot with you and check every take the moment it lands.","hello-2":"Hi. I'm your director today. Read the shot, roll when you're ready, and I'll tell you if we have it.",next:"Next shot.","next-2":"On to the next one.","next-3":"Next up.",move:"Change of scene. Take the phone to the next spot on the list.","move-2":"New location. Set up at the next place, and we'll carry on.",half:"Halfway there.","half-2":"That's half the shots done.",last:"Last shot. Let's finish strong.",done:"Every shot is in. Lovely work. Your footage is waiting in the studio.","done-2":"That's a wrap. Every shot has a keeper. Head back to the studio for the edit.",idle:"Whenever you're ready. Tap Film this shot to roll.","idle-2":"Take your time. I'm here when you want to go again.",organized:"Footage organised, in story order and trimmed. Ready for the edit.","setup-close":"Close-up. Phone at eye level, about a forearm away. Let your face fill the frame.","setup-medium":"Medium shot. Phone at eye level, about an arm's length away, chest up in frame.","setup-wide":"Wide shot. Step back so the room is in it, and keep the phone level.","setup-detail":"Detail shot. Get in close on your hands. Keep the phone still and let the action move.",hook:"This one's the hook. Give it energy from the very first frame.","hook-2":"Hook shot. Start the moment you hit record, no warm-up.","text-top":"Leave a little space above your head. The words go up there.","text-bottom":"Keep your face in the top half. The captions sit low.",lens:"Look into the lens, not at yourself on the screen.","lens-2":"Eyes on the camera lens. That's where your viewer is.",light:"Face the light, not away from it.",steadytip:"If you can, lean the phone on something solid.",checking:"Got it. One moment while I check.","checking-2":"Received. Checking it now.","checking-3":"Take's in. Give me a second.",keep:"That's the one. Moving on.","keep-2":"Perfect. We have it.","keep-3":"Lovely. That's a keeper.",first:"First take. Nicely done.",streak:"Three in a row. You're on a roll.",retry:"Don't chase perfect. One more go, and I'll keep the best take.",upright:"You're filming sideways. Turn the phone upright, please.",face:"I lost your face for most of that. Face the camera, and let's go again.","framing-tight":"A touch too tight. Bring the phone back a little.","framing-wide":"A little too wide. Bring the phone closer.","room-top":"I need room above your head for the words. Tilt up slightly, and again.","room-bottom":"You're too low in the frame. Raise the phone a little, and again.","room-head":"You're right under the app's top bar. Tilt up slightly, and again.","room-air":"Too much space above your head. Tilt down a touch, or come closer.",side:"Slide toward the middle. The app's buttons cover the right edge.",length:"That was a little short. Hold it longer after you press record.",dark:"It's too dark. Find a light or face a window, and go again.",blown:"Too bright. Step out of the direct light, and go again.",backlit:"The light is behind you. Turn to face it, and go again.",steady:"A bit shaky. Rest the phone on something steady, and again.",sharp:"That's soft. Wipe the lens, tap to focus, and go again.",loud:"The sound is distorting. Move the phone away from the noise, and go again.",lost:"I've lost the connection. Check your phone is on the same Wi-Fi as your computer."};var s=a.join(a.dirname(n(import.meta.url)),"..","app","voice"),d=()=>{try{return r.readdirSync(s).filter(e=>e.endsWith(".mp3")).map(e=>e.slice(0,-4))}catch{return[]}},o=e=>JSON.stringify(e).replace(/</g,"\\u003c"),l=`function guide(s){var f=s.framing,t=s.text,o='<svg viewBox="0 0 90 160" role="img" aria-label="Frame guide: '+f+' shot'+(t==="none"?"":", words at the "+t)+'"><defs><pattern id="hz" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" stroke-width="1.2" opacity=".28"/></pattern></defs>';
o+='<rect x="0" y="0" width="90" height="22.4" fill="url(#hz)"/><rect x="0" y="104" width="90" height="56" fill="url(#hz)"/><rect x="73.8" y="22.4" width="16.2" height="81.6" fill="url(#hz)"/>';
o+='<g stroke="currentColor" stroke-width=".4" stroke-dasharray="1.5 2" opacity=".35"><line x1="30" y1="0" x2="30" y2="160"/><line x1="60" y1="0" x2="60" y2="160"/><line x1="0" y1="53.3" x2="90" y2="53.3"/><line x1="0" y1="106.7" x2="90" y2="106.7"/></g>';
if(t==="top")o+='<rect class="tx" x="6" y="23.5" width="66" height="11" rx="2"/>';if(t==="bottom")o+='<rect class="tx" x="6" y="92" width="66" height="11" rx="2"/>';
if(s.face){if(f==="close")o+='<ellipse class="sb" cx="40" cy="58" rx="22" ry="28"/><path class="sb" d="M8 112 Q40 92 72 112 L72 160 L8 160Z"/>';
else if(f==="medium")o+='<ellipse class="sb" cx="40" cy="52" rx="10" ry="13"/><path class="sb" d="M14 104 Q16 72 40 70 Q64 72 66 104Z"/>';
else o+='<circle class="sb" cx="40" cy="58" r="4.5"/><path class="sb" d="M33 88 L35 66 Q40 63 45 66 L47 88Z"/>';
o+='<g class="eye"><line x1="1" y1="53.3" x2="7" y2="53.3"/><line x1="83" y1="53.3" x2="89" y2="53.3"/></g>'}
else{var w=f==="close"?34:f==="medium"?48:62,x=40-w/2,y=62-w/2,c=6;o+='<path class="rt" d="M'+x+' '+(y+c)+'V'+y+'H'+(x+c)+'M'+(x+w-c)+' '+y+'H'+(x+w)+'V'+(y+c)+'M'+(x+w)+' '+(y+w-c)+'V'+(y+w)+'H'+(x+w-c)+'M'+(x+c)+' '+(y+w)+'H'+x+'V'+(y+w-c)+'"/>'}
return o+'<rect x=".5" y=".5" width="89" height="159" rx="5" fill="none" stroke="currentColor" opacity=".5"/></svg>'}`,c=`:root{--ink:#070a10;--panel:rgba(16,24,38,.78);--line:rgba(140,200,255,.18);--sig:#6fe7ff;--ok:#4cf0a6;--no:#ffb547;--tx:#e8f1ff;--mu:#8a9bb4;color-scheme:dark}
*{box-sizing:border-box}[hidden]{display:none!important}html{background:var(--ink)}body{margin:0;min-height:100vh;color:var(--tx);font:16px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif;background:radial-gradient(130% 70% at 50% -12%,#12284a 0,rgba(7,10,16,0) 62%),var(--ink);-webkit-font-smoothing:antialiased}
main{max-width:520px;margin:0 auto;padding:max(14px,env(safe-area-inset-top)) 16px max(28px,env(safe-area-inset-bottom))}
.num{font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace;font-variant-numeric:tabular-nums}
.bar{display:flex;align-items:center;gap:12px;padding:10px 12px;border:1px solid var(--line);border-radius:16px;background:var(--panel);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);position:sticky;top:max(8px,env(safe-area-inset-top));z-index:2}
.bar b{display:block;font-size:13px;color:var(--sig);font-weight:600}.bar p{margin:0;font-size:14px;min-height:20px}
.core{--lv:0;position:relative;width:46px;height:46px;flex:none}.core i{position:absolute;inset:0;border-radius:50%;border:1.5px solid var(--sig);transition:transform .08s linear,opacity .2s}
.core i:nth-child(1){opacity:.22;transform:scale(calc(.62 + var(--lv)*.42))}.core i:nth-child(2){opacity:.45;transform:scale(calc(.46 + var(--lv)*.3))}
.core i:nth-child(3){border:0;background:radial-gradient(circle,#dffaff 0,var(--sig) 45%,rgba(111,231,255,0) 72%);transform:scale(calc(.32 + var(--lv)*.22));box-shadow:0 0 calc(10px + var(--lv)*26px) rgba(111,231,255,.55)}
.core.big{width:132px;height:132px;margin:0 auto 22px}
#gate{position:fixed;inset:0;z-index:5;display:grid;place-content:center;text-align:center;padding:24px;background:radial-gradient(90% 60% at 50% 40%,#10233f 0,var(--ink) 70%)}
#gate h1{font-size:26px;line-height:1.2;margin:0 0 8px;font-weight:650;letter-spacing:-.01em}#gate p{color:var(--mu);margin:0 auto 24px;max-width:30ch}
button,.rec{font:600 16px system-ui,-apple-system,sans-serif;color:var(--tx);border-radius:14px;cursor:pointer;min-height:48px}
.go{border:1px solid var(--sig);background:rgba(111,231,255,.1);padding:14px 22px;box-shadow:0 0 0 4px rgba(111,231,255,.06),0 0 30px rgba(111,231,255,.18)}
button:focus-visible,.rec:focus-within{outline:2px solid var(--sig);outline-offset:3px}
.hud{position:relative;margin:16px 0 0;padding:16px;border-radius:18px;background:var(--panel);border:1px solid var(--line)}
.hud:before{content:"";position:absolute;inset:-1px;border-radius:18px;pointer-events:none;background:linear-gradient(var(--sig),var(--sig)) 0 0/18px 1.5px,linear-gradient(var(--sig),var(--sig)) 0 0/1.5px 18px,linear-gradient(var(--sig),var(--sig)) 100% 100%/18px 1.5px,linear-gradient(var(--sig),var(--sig)) 100% 100%/1.5px 18px;background-repeat:no-repeat;opacity:.8}
.meta{display:flex;justify-content:space-between;align-items:baseline;color:var(--mu);font-size:13px}.meta .num{color:var(--sig)}
.prog{display:flex;gap:4px;margin:10px 0 14px}.prog i{flex:1;height:3px;border-radius:2px;background:rgba(140,200,255,.18)}.prog i.d{background:var(--ok)}.prog i.c{background:var(--sig);box-shadow:0 0 8px var(--sig)}
.beat{color:var(--mu);font-size:13px;margin:0 0 4px}.act{font-size:22px;line-height:1.3;font-weight:600;margin:0 0 16px;letter-spacing:-.005em}
.grid{display:grid;grid-template-columns:96px 1fr;gap:16px;align-items:start}.guide{color:#9cc8ff}.guide svg{display:block;width:96px;height:auto}
.guide .tx{fill:rgba(111,231,255,.22);stroke:var(--sig);stroke-width:.6}.guide .sb{fill:rgba(232,241,255,.1);stroke:#e8f1ff;stroke-width:.8}.guide .eye line{stroke:var(--sig);stroke-width:1.4}.guide .rt{fill:none;stroke:var(--sig);stroke-width:1.4}
dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:6px 12px;font-size:14px}dt{color:var(--mu)}dd{margin:0}
.leg{grid-column:1/-1;color:var(--mu);font-size:12px;margin-top:6px}
.rec{display:flex;align-items:center;gap:14px;margin:18px 0 0;padding:14px 16px;border:1px solid rgba(255,90,90,.45);background:rgba(255,70,70,.08)}.rec input{position:absolute;opacity:0;width:1px;height:1px}
.rec .dot{width:26px;height:26px;border-radius:50%;border:2px solid #ff6b6b;display:grid;place-items:center;flex:none}.rec .dot:after{content:"";width:14px;height:14px;border-radius:50%;background:#ff5a5a;box-shadow:0 0 12px #ff5a5a}
.rec small{display:block;color:var(--mu);font-weight:500;font-size:13px}
.ghost{width:100%;margin:10px 0 0;border:1px solid var(--line);background:transparent;padding:12px}
.up{margin:16px 0 0}.up .track{height:4px;border-radius:2px;background:rgba(140,200,255,.15);overflow:hidden}.up .track i{display:block;height:100%;width:0;background:var(--sig);box-shadow:0 0 10px var(--sig);transition:width .2s}
.up p{margin:8px 0 0;color:var(--mu);font-size:14px}
.v{margin:16px 0 0;padding:16px;border-radius:18px;border:1px solid}.v.ok{border-color:rgba(76,240,166,.5);background:rgba(76,240,166,.07)}.v.no{border-color:rgba(255,181,71,.5);background:rgba(255,181,71,.07)}
.v h2{margin:0 0 4px;font-size:18px}.v.ok h2{color:var(--ok)}.v.no h2{color:var(--no)}.v p{margin:0 0 12px}
.v ul{list-style:none;margin:0;padding:0;display:grid;gap:4px;font-size:13px}.v li{display:flex;justify-content:space-between;gap:12px;border-top:1px solid var(--line);padding-top:4px}.v li span:first-child:before{content:"\u2713 ";color:var(--ok)}.v li.x span:first-child:before{content:"\u2715 ";color:var(--no)}.v li span:last-child{color:var(--mu)}
.end{text-align:center;padding:28px 16px}.end h1{font-size:24px;margin:0 0 6px}.end p{color:var(--mu);margin:0}
@media (prefers-reduced-motion:reduce){.core i{transition:none;transform:none!important}.up .track i{transition:none}}`,x=(e,t)=>`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#070a10"><title>Director \xB7 Edit Wherever</title><style>${c}</style></head>
<body><div id="gate"><div class="core big" id="core0"><i></i><i></i><i></i></div><h1>Your director is ready</h1><p>Turn your sound up. I'll set up each shot with you and check every take.</p><button class="go" id="go">Start the director</button></div>
<main><div class="bar"><div class="core" id="core"><i></i><i></i><i></i></div><div><b>Director</b><p id="cap" aria-live="polite">Standing by.</p></div></div>
<section class="hud" id="shot" hidden><div class="meta"><span>Shot <span class="num" id="no"></span></span><span id="pl"></span></div><div class="prog" id="prog"></div>
<p class="beat" id="beat"></p><h1 class="act" id="act"></h1>
<div class="grid"><div class="guide" id="guide"></div><dl id="spec"></dl></div>
<label class="rec" id="rec"><input type="file" accept="video/*,.mp4,.mov,.m4v,.webm" id="f"><span class="dot" aria-hidden="true"></span><span><b>Film this shot</b><small>Or choose a take you already filmed</small></span></label>
<button class="ghost" id="read">Hear the setup again</button></section>
<div class="up" id="up" hidden><div class="track"><i id="bi"></i></div><p id="st" aria-live="polite"></p></div><div id="v" aria-live="assertive"></div>
<section class="end" id="end" hidden><h1 id="eh"></h1><p id="ep"></p></section></main>
<script>
var T="/u/${e}",L=${o(i)},H=${o(d())},$=function(i){return document.getElementById(i)};
var cur=null,busy=0,on=0,streak=0,tries=0,idleT=0,lastV={},q=[],playing=0,said={},au=new Audio(),an=null,buf=null;
${l}
// a variant of a line (key, key-2, key-3), never the same one twice running
function vk(k){var a=[k,k+"-2",k+"-3"].filter(function(x){return L[x]});if(a.length>1)a=a.filter(function(x){return x!==lastV[k]});var p=a[Math.floor(Math.random()*a.length)]||k;lastV[k]=p;return p}
// a line with no recording: hold its caption for reading time, no sound
function quiet(t,done){setTimeout(done,700+t.length*45)}
function say(keys){if(!on||!keys||!keys.length)return;q=q.concat(keys.map(vk));if(!playing)nextQ()}
function hush(){q=[];playing=0;try{au.pause()}catch(e){}}
function nextQ(){var k=q.shift();if(!k){playing=0;return}playing=1;$("cap").textContent=L[k];var once=0,go=function(){if(!once++)nextQ()},fb=function(){if(!once)quiet(L[k],go)};
if(H.indexOf(k)<0)return quiet(L[k],go);au.src=T+"/voice/"+k+".mp3";au.onended=function(){setTimeout(go,220)};au.onerror=fb;var p=au.play();if(p)p.catch(fb)}
// the core breathes with the voice
function tick(){var lv=0;if(playing){if(an&&!au.paused){an.getByteTimeDomainData(buf);var s=0;for(var i=0;i<buf.length;i++){var d=(buf[i]-128)/128;s+=d*d}lv=Math.min(1,Math.sqrt(s/buf.length)*4)}else if(!au.paused)lv=.35+.25*Math.sin(Date.now()/160)}
$("core").style.setProperty("--lv",lv.toFixed(3));requestAnimationFrame(tick)}
$("go").onclick=function(){on=1;$("gate").hidden=true;try{var C=window.AudioContext||window.webkitAudioContext,ctx=new C(),src=ctx.createMediaElementSource(au);an=ctx.createAnalyser();an.fftSize=512;buf=new Uint8Array(an.fftSize);src.connect(an);an.connect(ctx.destination);ctx.resume()}catch(e){an=null}
au.src=T+"/voice/keep.mp3";au.muted=true;var p=au.play();if(p)p.then(function(){au.pause();au.muted=false},function(){au.muted=false});setTimeout(function(){au.muted=false;if(cur)say(cur.cue);else if(said.done)say(["done"])},300);if(!matchMedia("(prefers-reduced-motion: reduce)").matches)tick()};
function idle(){clearTimeout(idleT);idleT=setTimeout(function(){if(!busy&&cur)say(["idle"])},90000)}
function show(j){var s=j.shot;if(!s){cur=null;$("shot").hidden=true;$("end").hidden=false;clearTimeout(idleT);
if(j.done){$("eh").textContent="That's a wrap.";$("ep").textContent="Every shot has a keeper. Go back to your studio and press Organize footage.";if(!said.done){said.done=1;say(["done"])}}
else{$("eh").textContent="No shot picked yet.";$("ep").textContent="Pick a shot in the studio on your computer."}return}
if(cur&&cur.id===s.id)return;cur=s;tries=s.tries||0;$("end").hidden=true;$("shot").hidden=false;$("v").innerHTML="";
$("no").textContent=(s.n<10?"0":"")+s.n+" / "+(s.total<10?"0":"")+s.total;$("pl").textContent=s.place;$("beat").textContent=s.beat;$("act").textContent=s.action;
var pr="";for(var i=1;i<=s.total;i++)pr+='<i class="'+(i<s.n?"d":i===s.n?"c":"")+'"></i>';$("prog").innerHTML=pr;$("guide").innerHTML=guide(s);
var rows=[["Feel",s.feel],["Framing",s.framing.charAt(0).toUpperCase()+s.framing.slice(1)],["Hold",s.seconds+" s"],["Words",s.text==="none"?"None on screen":"At the "+s.text]],dl="";
rows.forEach(function(r){dl+="<dt>"+r[0]+"</dt><dd></dd>"});$("spec").innerHTML=dl+'<p class="leg">Keep inside the clear area. The shaded edges are covered by the app.</p>';var dd=$("spec").getElementsByTagName("dd");rows.forEach(function(r,i){dd[i].textContent=r[1]});
say(s.cue);idle()}
function load(){if(busy)return;var r=new XMLHttpRequest();r.open("GET",T+"/shot");r.onload=function(){try{show(JSON.parse(r.responseText))}catch(e){}};r.send()}
$("read").onclick=function(){if(!cur)return;hush();on=1;say(cur.cue)};
$("f").onchange=function(){var x=$("f").files[0];$("f").value="";if(!x||busy||!cur)return;var ext=(x.name.split(".").pop()||"").toLowerCase();
if(!/^(mp4|mov|m4v|webm)$/.test(ext))ext=/quicktime/.test(x.type)?"mov":/webm/.test(x.type)?"webm":"mp4";
if(x.size>${t}){$("st").textContent="Too big. Videos can be up to ${Math.round(t/1e9)} GB.";$("up").hidden=false;return}
busy=1;said.c=0;clearTimeout(idleT);$("v").innerHTML="";$("up").hidden=false;$("bi").style.width="0";var r=new XMLHttpRequest();r.open("POST",T+"/up?ext="+ext+"&shot="+encodeURIComponent(cur.id));
r.upload.onprogress=function(e){if(e.total){$("bi").style.width=(100*e.loaded/e.total)+"%";$("st").textContent=e.loaded<e.total?"Sending "+Math.round(100*e.loaded/e.total)+"%":"Checking framing, light, shake, sound and length";if(e.loaded>=e.total&&!said.c){said.c=1;say(["checking"])}}};
r.onload=function(){busy=0;$("up").hidden=true;var j={};try{j=JSON.parse(r.responseText)}catch(e){}var c=j.take;
if(r.status!==200||!c){$("v").innerHTML='<div class="v no"><h2>That didn\\'t go through</h2><p></p></div>';$("v").getElementsByTagName("p")[0].textContent=j.error||"Try again.";idle();return}
var keep=c.verdict==="keep",k;if(keep){streak++;k=[tries===0?"first":streak%3===0?"streak":"keep"]}else{streak=0;k=[c.say||"retry"];if(tries>=2)k.push("retry")}tries++;
var d=document.createElement("div");d.className="v "+(keep?"ok":"no");d.innerHTML="<h2></h2><p></p><ul></ul>";d.firstChild.textContent=keep?"Keeper":"One more take";d.childNodes[1].textContent=keep?"That's the one. The next shot is coming up.":c.fix;
c.checks.forEach(function(x){var li=document.createElement("li");if(!x.ok)li.className="x";li.innerHTML="<span></span><span class=num></span>";li.firstChild.textContent=x.label;li.lastChild.textContent=x.value;d.lastChild.appendChild(li)});$("v").appendChild(d);
say(k);if(keep){cur=null;setTimeout(load,2500)}else idle()};
r.onerror=function(){busy=0;$("up").hidden=true;$("st").textContent="";say(["lost"]);$("v").innerHTML='<div class="v no"><h2>Connection lost</h2><p>Check your phone is on the same Wi-Fi as your computer, then try again.</p></div>'};r.send(x)};
load();setInterval(load,4000);
</script></body></html>`;export{l as GUIDE_JS,x as SHOOT_PAGE,s as VOICE_DIR};
