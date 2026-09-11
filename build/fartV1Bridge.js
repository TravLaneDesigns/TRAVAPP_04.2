export function fartV1Bridge() {
  return {
    name: "fart-v1-data-bridge",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/App.jsx") && !id.endsWith("\\src\\App.jsx")) return null;

      let next = code;

      if (!next.includes('import { STATES } from "./data/states.js";')) {
        next = `import { STATES } from "./data/states.js";\n${next}`;
      }

      const localStatesPattern = /const STATES = \[[\s\S]*?\n\];\nfunction Button/;
      if (!localStatesPattern.test(next)) {
        throw new Error("F.A.R.T. V1 bridge could not find the temporary local STATES array in App.jsx.");
      }
      next = next.replace(localStatesPattern, "function Button");

      const milestone25 = '  <p className="text-lg font-black">{stateStampCount >= 25 ? "✅" : "⬜"} Cross-Country Cruiser - 25 states</p>';
      if (!next.includes(milestone25)) {
        throw new Error("F.A.R.T. V1 bridge could not find the 25-state milestone row.");
      }
      next = next.replace(
        milestone25,
        `${milestone25}\n  <p className="text-lg font-black">{stateStampCount >= 30 ? "✅" : "⬜"} Highway Man - 30 states</p>\n  <p className="text-lg font-black">{stateStampCount >= 40 ? "✅" : "⬜"} Interstate Master - 40 states</p>\n  <p className="text-lg font-black">{stateStampCount >= 50 ? "✅" : "⬜"} Great American Road Trip - 50 states</p>`
      );

      next = next.replace(
        '<MarkerTitle>Coming Later</MarkerTitle></h2><p className="text-xl font-bold text-slate-700 mt-2">States visited, Road Trip Passport, and Interstate Explorer will live here when we build Version 1.5.</p>',
        '<MarkerTitle>Passport Progress</MarkerTitle></h2><p className="text-xl font-bold text-slate-700 mt-2">State stamps, XP, Road Tokens, and road-trip milestones are now tracked in Version 1.</p>'
      );

      return { code: next, map: null };
    },
  };
}

export default fartV1Bridge;
