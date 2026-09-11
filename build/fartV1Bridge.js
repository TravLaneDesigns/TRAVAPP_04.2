export function fartV1Bridge() {
  return {
    name: "fart-v1-data-bridge",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx") && !id.endsWith("\\src\\App.jsx")) return null;

      let next = code;

      if (!next.includes('import { STATES } from "./data/states.js";')) {
        next = `import { STATES } from "./data/states.js";\nimport { getCartographerPencilTier } from "./data/stateMilestones.js";\n${next}`;
      }

      const localStatesPattern = /const STATES = \[[\s\S]*?\n\];\nfunction Button/;
      if (!localStatesPattern.test(next)) throw new Error("F.A.R.T. V1 bridge could not find the temporary local STATES array in App.jsx.");
      next = next.replace(localStatesPattern, "function Button");

      const markerAnchor = 'function CrayonText({ children, className = "" }) {';
      if (!next.includes(markerAnchor)) throw new Error("F.A.R.T. V1 bridge could not find CrayonText for marker styling.");
      const homeMarkerComponent = `function HomeMarkerText({ children, className = "" }) {\n  const text = String(children);\n  return (\n    <span\n      className={\`relative inline-block \${className}\`}\n      style={{\n        fontFamily: '\"Arial Black\", Impact, Haettenschweiler, \"Trebuchet MS\", sans-serif',\n        fontWeight: 900,\n        letterSpacing: '-0.045em',\n        transform: 'skewX(-7deg) rotate(-1deg)',\n        transformOrigin: 'center',\n        lineHeight: 0.92,\n      }}\n    >\n      <span\n        aria-hidden=\"true\"\n        className=\"absolute inset-0 select-none\"\n        style={{\n          opacity: 0.30,\n          transform: 'translate(2px, 1px) skewX(2deg)',\n          filter: 'blur(0.35px)',\n          mixBlendMode: 'multiply',\n          WebkitTextStroke: '1.2px currentColor',\n        }}\n      >{text}</span>\n      <span\n        aria-hidden=\"true\"\n        className=\"absolute inset-0 select-none\"\n        style={{\n          opacity: 0.22,\n          transform: 'translate(-1.5px, -0.5px) skewX(-1deg)',\n          mixBlendMode: 'multiply',\n          WebkitTextStroke: '0.8px currentColor',\n        }}\n      >{text}</span>\n      <span\n        className=\"relative\"\n        style={{\n          WebkitTextStroke: '0.7px currentColor',\n          textShadow: '1px 0 currentColor, -0.7px 0 currentColor, 0 1.1px rgba(0,0,0,.18)',\n          opacity: 0.92,\n        }}\n      >{text}</span>\n      <span\n        aria-hidden=\"true\"\n        className=\"absolute left-[8%] right-[4%] top-[18%] h-[14%] rounded-full select-none\"\n        style={{ background: 'rgba(255,255,255,.13)', transform: 'rotate(-2deg)', mixBlendMode: 'screen' }}\n      />\n    </span>\n  );\n}\n\n`;
      next = next.replace(markerAnchor, homeMarkerComponent + markerAnchor);

      const stateCountLine = "  const stateStampCount = stats.statesCollected?.length || 0;";
      if (!next.includes(stateCountLine)) throw new Error("F.A.R.T. V1 bridge could not find stateStampCount in GAMEPage.");
      next = next.replace(stateCountLine, `${stateCountLine}\n  const pencilTier = getCartographerPencilTier(stats.statesCollected || []);`);

      const milestone25 = '  <p className="text-lg font-black">{stateStampCount >= 25 ? "✅" : "⬜"} Cross-Country Cruiser - 25 states</p>';
      if (!next.includes(milestone25)) throw new Error("F.A.R.T. V1 bridge could not find the 25-state milestone row.");
      next = next.replace(milestone25, `${milestone25}\n  <p className="text-lg font-black">{stateStampCount >= 30 ? "✅" : "⬜"} Highway Man - 30 states</p>\n  <p className="text-lg font-black">{stateStampCount >= 40 ? "✅" : "⬜"} Interstate Master - 40 states</p>\n  <p className="text-lg font-black">{stateStampCount >= 50 ? "✅" : "⬜"} Great American Road Trip - 50 states</p>`);

      const extrasCard = '<HandCard className="p-6"><h2 className="text-3xl"><MarkerTitle>Extras</MarkerTitle></h2><p className="text-xl font-black mt-3">Sounds, rewards, and secrets later.</p></HandCard>';
      if (!next.includes(extrasCard)) throw new Error("F.A.R.T. V1 bridge could not find the Extras card.");
      next = next.replace(extrasCard, `<HandCard className="p-6 space-y-2"><h2 className="text-3xl"><MarkerTitle>Extras</MarkerTitle></h2><p className="text-xl font-black">✏️ Cartographer's Pencil</p><p className="text-lg font-black text-slate-700">{pencilTier ? pencilTier.name : "Next: Graphite Pencil at 10 states."}</p></HandCard>`);

      const passportCardStart = '<HandCard className="p-6 space-y-3">\n<div className="flex items-center gap-3 flex-wrap">';
      if (!next.includes(passportCardStart)) throw new Error("F.A.R.T. V1 bridge could not find the Passport card selector area.");
      next = next.replace(passportCardStart, `<HandCard className="p-6 space-y-3">\n<select value={stateIndex} onChange={(e) => setStateIndex(Number(e.target.value))} className="w-full rounded-xl border-2 border-slate-950 bg-yellow-100 px-4 py-2 text-xl font-black">{STATES.map((item, index) => <option key={item.id} value={index}>{item.name}</option>)}</select>\n<div className="flex items-center gap-3 flex-wrap">`);

      next = next.replace('<MarkerTitle>Coming Later</MarkerTitle></h2><p className="text-xl font-bold text-slate-700 mt-2">States visited, Road Trip Passport, and Interstate Explorer will live here when we build Version 1.5.</p>', '<MarkerTitle>Passport Progress</MarkerTitle></h2><p className="text-xl font-bold text-slate-700 mt-2">State stamps, XP, Road Tokens, and road-trip milestones are now tracked in Version 1.</p>');

      const coverStart = next.indexOf("function CoverPage(");
      const ownerStart = next.indexOf("function OwnerPage(");
      if (coverStart === -1 || ownerStart === -1 || ownerStart <= coverStart) throw new Error("F.A.R.T. V1 bridge could not isolate the CoverPage component.");
      let cover = next.slice(coverStart, ownerStart);
      cover = cover.replaceAll("<MarkerTitle>", "<HomeMarkerText>").replaceAll("</MarkerTitle>", "</HomeMarkerText>");
      cover = cover.replace('<p className="text-2xl text-slate-800 rotate-[-2deg]"><CrayonText>games for the road</CrayonText></p>', '<p className="text-2xl text-slate-900 rotate-[-2deg] font-semibold italic tracking-wide [font-family:Trebuchet_MS,Arial,sans-serif]">games for the road</p>');
      next = next.slice(0, coverStart) + cover + next.slice(ownerStart);

      const homeStart = next.indexOf("function Home(");
      const settingsStart = next.indexOf("function SettingsPage(");
      if (homeStart === -1 || settingsStart === -1 || settingsStart <= homeStart) throw new Error("F.A.R.T. V1 bridge could not isolate the Home component.");
      let home = next.slice(homeStart, settingsStart);
      home = home.replaceAll("<MarkerTitle>", "<HomeMarkerText>").replaceAll("</MarkerTitle>", "</HomeMarkerText>");
      home = home.replace('<p className="text-slate-700 mt-1 text-lg"><CrayonText>Pick a game and have fun!</CrayonText></p>', '<p className="text-slate-800 mt-2 text-lg font-semibold italic tracking-wide rotate-[-1deg] [font-family:Trebuchet_MS,Arial,sans-serif]">Pick a game and have fun!</p>');
      home = home.replace('<span className="text-slate-800"><CrayonText>🚗 road trip games • {unlockedCount}/{STICKERS.length} stickers</CrayonText></span>', '<span className="text-slate-800 font-semibold italic tracking-wide [font-family:Trebuchet_MS,Arial,sans-serif]">🚗 road trip games • {unlockedCount}/{STICKERS.length} stickers</span>');
      home = home.replace('<h2 className="text-2xl underline decoration-blue-500 decoration-2 underline-offset-4"><CrayonText>{game.title}</CrayonText></h2>', '<h2 className="text-2xl underline decoration-blue-500 decoration-2 underline-offset-4"><HomeMarkerText>{game.title}</HomeMarkerText></h2>');
      home = home.replace('<p className="text-slate-700 mt-3 text-lg"><CrayonText>{game.desc}</CrayonText></p><p className="mt-5 text-slate-950"><CrayonText>Play →</CrayonText></p>', '<p className="text-slate-700 mt-3 text-lg font-medium italic tracking-wide [font-family:Trebuchet_MS,Arial,sans-serif]">{game.desc}</p><p className="mt-5 text-slate-950 font-bold italic tracking-wide [font-family:Trebuchet_MS,Arial,sans-serif]">Play →</p>');
      next = next.slice(0, homeStart) + home + next.slice(settingsStart);

      return { code: next, map: null };
    },
  };
}

export default fartV1Bridge;
