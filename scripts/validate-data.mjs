import { STATES } from "../src/data/states.js";
import { STATE_MILESTONES } from "../src/data/stateMilestones.js";
import { LANDMARKS } from "../src/data/landmarks.js";
import { STICKER_CATALOG } from "../src/data/stickerCatalog.js";
import { SECRET_ACHIEVEMENTS } from "../src/data/secretAchievements.js";

const errors = [];
const requiredStateFields = ["id", "name", "nickname", "capital", "statehood", "bird", "flower", "funFact"];

if (STATES.length !== 50) errors.push(`Expected 50 states, found ${STATES.length}.`);

const stateIds = new Set();
for (const state of STATES) {
  for (const field of requiredStateFields) {
    if (!state[field]) errors.push(`State ${state.name || state.id || "UNKNOWN"} is missing ${field}.`);
  }
  if (stateIds.has(state.id)) errors.push(`Duplicate state id: ${state.id}`);
  stateIds.add(state.id);
}

const expectedMilestones = [5, 10, 20, 25, 30, 40, 50];
const actualMilestones = STATE_MILESTONES.map((m) => m.states);
if (JSON.stringify(actualMilestones) !== JSON.stringify(expectedMilestones)) {
  errors.push(`State milestones should be ${expectedMilestones.join(", ")}; found ${actualMilestones.join(", ")}.`);
}

const uniqueById = (items, label) => {
  const seen = new Set();
  for (const item of items) {
    if (!item.id) errors.push(`${label} item is missing an id.`);
    if (seen.has(item.id)) errors.push(`Duplicate ${label} id: ${item.id}`);
    seen.add(item.id);
  }
};

uniqueById(LANDMARKS, "landmark");
uniqueById(STICKER_CATALOG, "sticker");
uniqueById(SECRET_ACHIEVEMENTS, "secret achievement");

if (errors.length) {
  console.error("F.A.R.T. data validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("F.A.R.T. data validation passed.");
console.log(`States: ${STATES.length}`);
console.log(`State milestones: ${STATE_MILESTONES.length}`);
console.log(`Landmarks: ${LANDMARKS.length}`);
console.log(`Stickers: ${STICKER_CATALOG.length}`);
console.log(`Secret achievements: ${SECRET_ACHIEVEMENTS.length}`);
