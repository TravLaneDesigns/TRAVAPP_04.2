import fs from "node:fs";

const app = fs.readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const bridge = fs.readFileSync(new URL("../build/fartV1Bridge.js", import.meta.url), "utf8");

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

expect(app.includes("collected.includes(stateId)"), "Duplicate state stamps must be prevented.");
expect(app.includes("xp: (current.xp || 0) + 10"), "A first state stamp should award +10 XP.");
expect(app.includes("roadTokens: (current.roadTokens || 0) + 1"), "A first state stamp should award +1 Road Token.");
expect(app.includes('page === "passport"'), "Passport route must exist.");
expect(app.includes('page === "game"'), "G.A.M.E. route must exist.");
expect(app.includes('page === "stickers"'), "Sticker Book route must exist.");

for (const game of ["tictactoe", "hangman", "dots", "questions", "rps"]) {
  expect(app.includes(`page === "${game}"`), `Game route missing: ${game}`);
}

expect(bridge.includes('import { STATES } from "./data/states.js";'), "Production bridge must use the full state database.");
expect(bridge.includes("Highway Man - 30 states"), "30-state milestone must be in production bridge.");
expect(bridge.includes("Interstate Master - 40 states"), "40-state milestone must be in production bridge.");
expect(bridge.includes("Great American Road Trip - 50 states"), "50-state milestone must be in production bridge.");
expect(bridge.includes("Cartographer's Pencil"), "Cartographer Pencil status must be in production bridge.");
expect(bridge.includes("<select value={stateIndex}"), "Fast 50-state Passport selector must be in production bridge.");

if (failures.length) {
  console.error("F.A.R.T. app integration tests failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("F.A.R.T. app integration tests passed.");
