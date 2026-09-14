export function fartV1Bridge() {
  return {
    name: "fart-v1-data-bridge",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx") && !id.endsWith("\\src\\App.jsx")) return null;

      let next = code;
      if (!next.includes('import { STATES } from "./data/states.js";')) next = `import { STATES } from "./data/states.js";\nimport { getCartographerPencilTier } from "./data/stateMilestones.js";\n${next}`;

      const localStatesPattern = /const STATES = \[[\s\S]*?\n\];\nfunction Button/;
      if (!localStatesPattern.test(next)) throw new Error("F.A.R.T. V1 bridge could not find local STATES.");
      next = next.replace(localStatesPattern, "function Button");

      const markerAnchor = 'function CrayonText({ children, className = "" }) {';
      if (!next.includes(markerAnchor)) throw new Error("F.A.R.T. V1 bridge could not find CrayonText.");
      const markerComponent = `function HomeMarkerText({ children, className = "" }) {\n  const text = String(children).toUpperCase();\n  const font = '\"Arial Black\", Impact, sans-serif';\n  const passes = [\n    {x:-2.2,y:.4,o:.18,r:-.35},{x:1.7,y:-.8,o:.16,r:.25},{x:.8,y:1.6,o:.20,r:-.15}\n  ];\n  return <span className={\`relative inline-block \${className}\`} style={{fontFamily:font,fontWeight:900,letterSpacing:'-.055em',lineHeight:.88,textTransform:'uppercase',transform:'scaleX(.88) rotate(-.8deg)',transformOrigin:'center',isolation:'isolate'}}>\n    {passes.map((p,i)=><span key={i} aria-hidden=\"true\" className=\"absolute inset-0 select-none\" style={{transform:\`translate(\${p.x}px,\${p.y}px) rotate(\${p.r}deg)\`,opacity:p.o,mixBlendMode:'multiply',WebkitTextStroke:'1.4px currentColor',filter:'blur(.18px)'}}>{text}</span>)}\n    <span className=\"relative\" style={{WebkitTextStroke:'1px currentColor',textShadow:'1px .5px rgba(0,0,0,.16)'}}>{text}</span>\n    <span aria-hidden=\"true\" className=\"absolute inset-0 select-none pointer-events-none\" style={{color:'transparent',backgroundImage:'repeating-linear-gradient(97deg,transparent 0 5px,rgba(255,255,255,.18) 6px 7px,transparent 8px 12px,rgba(0,0,0,.12) 13px 14px,transparent 15px 21px)',WebkitBackgroundClip:'text',backgroundClip:'text',mixBlendMode:'overlay',opacity:.95}}>{text}</span>\n  </span>;\n}\n\nfunction MarkerUnderline({ color = \"currentColor\" }) {\n  return <span aria-hidden=\"true\" className=\"block mt-1 h-2 w-full rounded-full opacity-90\" style={{background:\`linear-gradient(177deg, transparent 0 18%, \${color} 22% 55%, transparent 60%), linear-gradient(181deg, transparent 0 35%, \${color} 39% 72%, transparent 76%)\`,transform:'rotate(-1deg)'}} />;\n}\n\n`;
      next = next.replace(markerAnchor, markerComponent + markerAnchor);

      const stateCountLine = "  const stateStampCount = stats.statesCollected?.length || 0;";
      if (!next.includes(stateCountLine)) throw new Error("Missing stateStampCount.");
      next = next.replace(stateCountLine, `${stateCountLine}\n  const pencilTier = getCartographerPencilTier(stats.statesCollected || []);`);

      const milestone25 = '  <p className="text-lg font-black">{stateStampCount >= 25 ? "✅" : "⬜"} Cross-Country Cruiser - 25 states</p>';
      if (!next.includes(milestone25)) throw new Error("Missing milestone row.");
      next = next.replace(milestone25, `${milestone25}\n  <p className="text-lg font-black">{stateStampCount >= 30 ? "✅" : "⬜"} Highway Man - 30 states</p>\n  <p className="text-lg font-black">{stateStampCount >= 40 ? "✅" : "⬜"} Interstate Master - 40 states</p>\n  <p className="text-lg font-black">{stateStampCount >= 50 ? "✅" : "⬜"} Great American Road Trip - 50 states</p>`);

      const extrasCard = '<HandCard className="p-6"><h2 className="text-3xl"><MarkerTitle>Extras</MarkerTitle></h2><p className="text-xl font-black mt-3">Sounds, rewards, and secrets later.</p></HandCard>';
      if (!next.includes(extrasCard)) throw new Error("Missing Extras card.");
      next = next.replace(extrasCard, `<HandCard className="p-6 space-y-2"><h2 className="text-3xl"><MarkerTitle>Extras</MarkerTitle></h2><p className="text-xl font-black">✏️ Cartographer's Pencil</p><p className="text-lg font-black text-slate-700">{pencilTier ? pencilTier.name : "Next: Graphite Pencil at 10 states."}</p></HandCard>`);

      const passportCardStart = '<HandCard className="p-6 space-y-3">\n<div className="flex items-center gap-3 flex-wrap">';
      if (!next.includes(passportCardStart)) throw new Error("Missing Passport selector.");
      next = next.replace(passportCardStart, `<HandCard className="p-6 space-y-3">\n<select value={stateIndex} onChange={(e) => setStateIndex(Number(e.target.value))} className="w-full rounded-xl border-2 border-slate-950 bg-yellow-100 px-4 py-2 text-xl font-black">{STATES.map((item, index) => <option key={item.id} value={index}>{item.name}</option>)}</select>\n<div className="flex items-center gap-3 flex-wrap">`);
      next = next.replace('<MarkerTitle>Coming Later</MarkerTitle></h2><p className="text-xl font-bold text-slate-700 mt-2">States visited, Road Trip Passport, and Interstate Explorer will live here when we build Version 1.5.</p>', '<MarkerTitle>Passport Progress</MarkerTitle></h2><p className="text-xl font-bold text-slate-700 mt-2">State stamps, XP, Road Tokens, and road-trip milestones are now tracked in Version 1.</p>');

      const coverStart = next.indexOf("function CoverPage(");
      const ownerStart = next.indexOf("function OwnerPage(");
      if (coverStart < 0 || ownerStart <= coverStart) throw new Error("Could not isolate CoverPage.");
      let cover = next.slice(coverStart, ownerStart);
      cover = cover.replaceAll("<MarkerTitle>", "<HomeMarkerText>").replaceAll("</MarkerTitle>", "</HomeMarkerText>");
      const coverTitleBlock = `<h1 className="text-6xl sm:text-8xl font-black leading-none uppercase drop-shadow-sm">\n            <span className="text-blue-700 block rotate-[-4deg]"><HomeMarkerText>FuN?</HomeMarkerText></span>\n            <span className="text-red-700 block rotate-[2deg]"><HomeMarkerText>ALwaYs!</HomeMarkerText></span>\n            <span className="text-green-700 block rotate-[-1deg]"><HomeMarkerText>RoAd TRiP!</HomeMarkerText></span>\n          </h1>`;
      const coverArt = `<div className="relative mx-auto w-[82vw] max-w-[560px] overflow-hidden rounded-2xl rotate-[-1deg] shadow-sm">\n            <img src="https://raw.githubusercontent.com/TravLaneDesigns/TRAVAPP_04.2/main/cover-title.jpg" alt="FUN? ALWAYS! ROAD TRIP! hand-drawn marker title" className="block w-full h-auto mix-blend-multiply" />\n          </div>`;
      if (!cover.includes(coverTitleBlock)) throw new Error("Could not find cover title block for artwork swap.");
      cover = cover.replace(coverTitleBlock, coverArt);
      cover = cover.replace('<p className="text-2xl text-slate-800 rotate-[-2deg]"><CrayonText>games for the road</CrayonText></p>', '<p className="text-xl sm:text-2xl text-slate-900 rotate-[-2deg] tracking-wide [font-family:Trebuchet_MS,Arial,sans-serif]">games for the road ☺</p>');
      next = next.slice(0, coverStart) + cover + next.slice(ownerStart);

      const homeStart = next.indexOf("function Home(");
      const settingsStart = next.indexOf("function SettingsPage(");
      if (homeStart < 0 || settingsStart <= homeStart) throw new Error("Could not isolate Home.");
      let home = next.slice(homeStart, settingsStart);
      home = home.replaceAll("<MarkerTitle>", "<HomeMarkerText>").replaceAll("</MarkerTitle>", "</HomeMarkerText>");
      home = home.replace('<p className="text-slate-700 mt-1 text-lg"><CrayonText>Pick a game and have fun!</CrayonText></p>', '<p className="text-slate-900 mt-2 text-lg tracking-wide rotate-[-1deg] [font-family:Trebuchet_MS,Arial,sans-serif]">Pick a game and have fun! ☺</p>');
      home = home.replace('<span className="text-slate-800"><CrayonText>🚗 road trip games • {unlockedCount}/{STICKERS.length} stickers</CrayonText></span>', '<span className="text-slate-800 tracking-wide [font-family:Trebuchet_MS,Arial,sans-serif]">🚗 road trip games • {unlockedCount}/{STICKERS.length} stickers</span>');
      home = home.replace('<h2 className="text-2xl underline decoration-blue-500 decoration-2 underline-offset-4"><CrayonText>{game.title}</CrayonText></h2>', '<h2 className="text-2xl"><HomeMarkerText>{game.title}</HomeMarkerText><MarkerUnderline color="currentColor" /></h2>');
      home = home.replace('<p className="text-slate-700 mt-3 text-lg"><CrayonText>{game.desc}</CrayonText></p><p className="mt-5 text-slate-950"><CrayonText>Play →</CrayonText></p>', '<p className="text-slate-800 mt-3 text-lg tracking-wide [font-family:Trebuchet_MS,Arial,sans-serif]">{game.desc}</p><p className="mt-5 text-slate-950 font-bold tracking-wide [font-family:Trebuchet_MS,Arial,sans-serif]">Play →</p>');
      next = next.slice(0, homeStart) + home + next.slice(settingsStart);

      return { code: next, map: null };
    },
  };
}

export default fartV1Bridge;
