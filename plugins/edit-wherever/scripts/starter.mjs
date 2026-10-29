import r from"node:fs";import t from"node:path";import{fileURLToPath as O}from"node:url";import v from"node:os";import o from"node:path";import j from"node:fs";import{fileURLToPath as R}from"node:url";var y=o.resolve(o.dirname(R(import.meta.url)),".."),n=process.env.EDIT_WHEREVER_HOME||o.join(v.homedir(),"Edit Wherever"),f={home:n,inbox:o.join(n,"Inbox"),projects:o.join(n,"Projects"),brand:o.join(n,"Brand"),data:o.join(n,".studio"),edits:o.join(n,"Edits")},U={brand:o.join(f.brand,"brand_kit.json"),state:o.join(f.data,"state.json")},F=(()=>{try{return JSON.parse(j.readFileSync(o.join(y,"config.json"),"utf8"))}catch{return{}}})(),W=(F.license_url||process.env.EW_LICENSE_URL||"").replace(/\/$/,""),L=(()=>{try{return JSON.parse(j.readFileSync(o.join(y,".claude-plugin","plugin.json"),"utf8")).version}catch{return"0.0.0"}})();var l=process.argv.slice(2),c=(i,b)=>{let u=l.indexOf(i);return u>=0?l[u+1]:b},e=t.resolve(l[0]||"."),k=c("--studio",n),N=t.dirname(O(import.meta.url)),m=i=>{try{return JSON.parse(r.readFileSync(i,"utf8"))}catch{return null}},g=m(t.join(e,"prep.json")),h=m(t.join(e,"words.json"));(!g||!h||!r.existsSync(t.join(e,"assets","clean.mp4")))&&(console.log("Run prep.mjs on the clip first."),process.exit(1));var s=m(t.join(k,"Brand","brand_kit.json"))||{},p={palette:s.palette||{},heading_font:s.heading_font||"",cta:s.cta||"START"},S=["pop","box","karaoke","outline","clean","emoji"],x=S.includes(c("--caption"))?c("--caption"):S.includes(s.caption_style)?s.caption_style:"pop",a=+g.clean.seconds.toFixed(2),w=c("--hook","");r.copyFileSync(t.join(N,"..","blocks","wf-blocks.js"),t.join(e,"wf-blocks.js"));r.writeFileSync(t.join(e,"words.js"),"window.WF_WORDS = "+JSON.stringify(h)+`;
`);r.existsSync(t.join(e,"hyperframes.json"))||r.writeFileSync(t.join(e,"hyperframes.json"),`{}
`);var _=p.heading_font?`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(p.heading_font)}:wght@600;800&display=swap">`:"",d=i=>JSON.stringify(i).replace(/</g,"\\u003c");r.writeFileSync(t.join(e,"index.html"),`<!doctype html>
<html lang="en"><head><meta charset="UTF-8" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
${_}
<script src="words.js"></script><script src="wf-blocks.js"></script>
<style>*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1920px;overflow:hidden;background:#000}</style>
</head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${a}" data-width="1080" data-height="1920" style="position:relative;width:1080px;height:1920px;overflow:hidden">
  <div class="wf-full" id="aroll"><video id="clean" class="clip" src="assets/clean.mp4" data-has-audio="true" data-start="0" data-duration="${a}" data-track-index="0"></video></div>
</div>
<script>
  const BRAND = ${d(p)}, DUR = ${a};
  const tl = gsap.timeline({ paused: true }), root = document.getElementById("root"), words = window.WF_WORDS || [];
  ${w?`WF.title(tl, root, { text: ${d(w)}, at: 0, dur: 2.4, brand: BRAND });`:"// no hook title: pass --hook to add one"}
  WF.punch(tl, "#aroll", WF.emphasis(words), { scale: 1.1 });
  WF.captions(tl, root, words, { style: ${d(x)}, brand: BRAND, until: Math.max(0, DUR - 2.5) });   // captions stop where the end card starts
  WF.endcard(tl, root, { at: Math.max(0, DUR - 2.5), word: BRAND.cta, brand: BRAND });
  tl.set({}, {}, DUR);
  window.__timelines["main"] = tl;
</script>
</body></html>
`);console.log(`Starter ready: ${t.join(e,"index.html")}  (${a}s, ${h.length} words, captions: ${x})`);
