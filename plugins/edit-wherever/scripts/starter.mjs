import r from"node:fs";import o from"node:path";import{fileURLToPath as k}from"node:url";import R from"node:os";import t from"node:path";import y from"node:fs";import{fileURLToPath as O}from"node:url";var S=t.resolve(t.dirname(O(import.meta.url)),".."),f=process.argv.indexOf("--studio"),e=f>1&&process.argv[f+1]||process.env.EDIT_WHEREVER_HOME||t.join(R.homedir(),"Edit Wherever"),j={home:e,inbox:t.join(e,"Inbox"),projects:t.join(e,"Projects"),brand:t.join(e,"Brand"),data:t.join(e,".studio"),edits:t.join(e,"Edits"),styles:t.join(e,"Styles"),trials:t.join(e,"Projects","Trials")},W={brand:t.join(j.brand,"brand_kit.json"),state:t.join(j.data,"state.json")},F=(()=>{try{return JSON.parse(y.readFileSync(t.join(S,"config.json"),"utf8"))}catch{return{}}})(),L=(F.license_url||process.env.EW_LICENSE_URL||"").replace(/\/$/,""),J=(()=>{try{return JSON.parse(y.readFileSync(t.join(S,".claude-plugin","plugin.json"),"utf8")).version}catch{return"0.0.0"}})();var l=process.argv.slice(2),c=(i,b)=>{let u=l.indexOf(i);return u>=0?l[u+1]:b},n=o.resolve(l[0]||"."),N=c("--studio",e),_=o.dirname(k(import.meta.url)),m=i=>{try{return JSON.parse(r.readFileSync(i,"utf8"))}catch{return null}},x=m(o.join(n,"prep.json")),h=m(o.join(n,"words.json"));(!x||!h||!r.existsSync(o.join(n,"assets","clean.mp4")))&&(console.log("Run prep.mjs on the clip first."),process.exit(1));var s=m(o.join(N,"Brand","brand_kit.json"))||{},p={palette:s.palette||{},heading_font:s.heading_font||"",cta:s.cta||"START"},g=["pop","box","karaoke","outline","clean","emoji"],v=g.includes(c("--caption"))?c("--caption"):g.includes(s.caption_style)?s.caption_style:"pop",a=+x.clean.seconds.toFixed(2),w=c("--hook","");r.copyFileSync(o.join(_,"..","blocks","wf-blocks.js"),o.join(n,"wf-blocks.js"));r.writeFileSync(o.join(n,"words.js"),"window.WF_WORDS = "+JSON.stringify(h)+`;
`);r.existsSync(o.join(n,"hyperframes.json"))||r.writeFileSync(o.join(n,"hyperframes.json"),`{}
`);var E=p.heading_font?`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(p.heading_font)}:wght@600;800&display=swap">`:"",d=i=>JSON.stringify(i).replace(/</g,"\\u003c");r.writeFileSync(o.join(n,"index.html"),`<!doctype html>
<html lang="en"><head><meta charset="UTF-8" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
${E}
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
  WF.captions(tl, root, words, { style: ${d(v)}, brand: BRAND, until: Math.max(0, DUR - 2.5) });   // captions stop where the end card starts
  WF.endcard(tl, root, { at: Math.max(0, DUR - 2.5), word: BRAND.cta, brand: BRAND });
  tl.set({}, {}, DUR);
  window.__timelines["main"] = tl;
</script>
</body></html>
`);console.log(`Starter ready: ${o.join(n,"index.html")}  (${a}s, ${h.length} words, captions: ${v})`);
