import s from"node:fs";import e from"node:path";import{fileURLToPath as N}from"node:url";import R from"node:os";import t from"node:path";import w from"node:fs";import{fileURLToPath as F}from"node:url";var S=t.resolve(t.dirname(F(import.meta.url)),".."),y=process.argv.indexOf("--studio"),o=y>1&&process.argv[y+1]||process.env.EDIT_WHEREVER_HOME||t.join(R.homedir(),"Edit Wherever"),j={home:o,inbox:t.join(o,"Inbox"),projects:t.join(o,"Projects"),brand:t.join(o,"Brand"),data:t.join(o,".studio"),edits:t.join(o,"Edits"),styles:t.join(o,"Styles"),trials:t.join(o,"Projects","Trials"),reviews:t.join(o,"Projects","Reviews"),exports:t.join(o,"Projects","Exports"),covers:t.join(o,"Projects","Covers"),scripts:t.join(o,"Projects","Scripts")},T={brand:t.join(j.brand,"brand_kit.json"),state:t.join(j.data,"state.json")},O=(()=>{try{return JSON.parse(w.readFileSync(t.join(S,"config.json"),"utf8"))}catch{return{}}})(),W=(O.license_url||process.env.EW_LICENSE_URL||"").replace(/\/$/,""),L=(()=>{try{return JSON.parse(w.readFileSync(t.join(S,".claude-plugin","plugin.json"),"utf8")).version}catch{return"0.0.0"}})();var f=process.argv.slice(2),l=(n,c)=>{let a=f.indexOf(n);return a>=0?f[a+1]:c},r=e.resolve(f[0]||"."),_=l("--studio",o),$=e.dirname(N(import.meta.url)),u=n=>{try{return JSON.parse(s.readFileSync(n,"utf8"))}catch{return null}},b=u(e.join(r,"prep.json")),h=u(e.join(r,"words.json"));(!b||!h||!s.existsSync(e.join(r,"assets","clean.mp4")))&&(console.log("Run prep.mjs on the clip first."),process.exit(1));var i=u(e.join(_,"Brand","brand_kit.json"))||{},m={palette:i.palette||{},heading_font:i.heading_font||"",body_font:i.body_font||"",cta:i.cta||"START"},g=["pop","box","karaoke","outline","clean","emoji"],E=g.includes(l("--caption"))?l("--caption"):g.includes(i.caption_style)?i.caption_style:"pop",d=+b.clean.seconds.toFixed(2),x=l("--hook","");s.copyFileSync(e.join($,"..","blocks","wf-blocks.js"),e.join(r,"wf-blocks.js"));s.writeFileSync(e.join(r,"words.js"),"window.WF_WORDS = "+JSON.stringify(h)+`;
`);s.existsSync(e.join(r,"hyperframes.json"))||s.writeFileSync(e.join(r,"hyperframes.json"),`{}
`);async function k(n){let c=encodeURIComponent(n).replace(/%20/g,"+"),a=`family=${c}:wght@600;800`;try{if((await fetch(`https://fonts.googleapis.com/css2?${a}&display=swap`,{signal:AbortSignal.timeout(5e3)})).ok)return a}catch{}return`family=${c}`}var v=[...new Set([m.heading_font,m.body_font].filter(Boolean))],I=v.length?`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${(await Promise.all(v.map(k))).join("&")}&display=swap">`:"",p=n=>JSON.stringify(n).replace(/</g,"\\u003c");s.writeFileSync(e.join(r,"index.html"),`<!doctype html>
<html lang="en"><head><meta charset="UTF-8" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
${I}
<script src="words.js"></script><script src="wf-blocks.js"></script>
<style>*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1920px;overflow:hidden;background:#000}</style>
</head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${d}" data-width="1080" data-height="1920" style="position:relative;width:1080px;height:1920px;overflow:hidden">
  <div class="wf-full" id="aroll"><video id="clean" class="clip" src="assets/clean.mp4" data-has-audio="true" data-start="0" data-duration="${d}" data-track-index="0"></video></div>
</div>
<script>
  const BRAND = ${p(m)}, DUR = ${d};
  const tl = gsap.timeline({ paused: true }), root = document.getElementById("root"), words = window.WF_WORDS || [];
  ${x?`WF.title(tl, root, { text: ${p(x)}, at: 0, dur: 2.4, brand: BRAND });`:"// no hook title: pass --hook to add one"}
  WF.punch(tl, "#aroll", WF.emphasis(words), { scale: 1.1 });
  WF.captions(tl, root, words, { style: ${p(E)}, brand: BRAND });   // the end card sits above the head, so captions run to the last word
  WF.endcard(tl, root, { word: BRAND.cta, brand: BRAND, words, total: DUR });   // after the last word, at most the last 1.5s; none under 6s
  tl.set({}, {}, DUR);
  window.__timelines["main"] = tl;
</script>
</body></html>
`);console.log(`Starter ready: ${e.join(r,"index.html")}  (${d}s, ${h.length} words, captions: ${E})`);
