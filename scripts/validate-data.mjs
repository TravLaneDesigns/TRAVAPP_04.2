import { STATES } from "../src/data/states.js";
import { STATE_MILESTONES } from "../src/data/stateMilestones.js";
import { LANDMARKS } from "../src/data/landmarks.js";
import {
  STICKER_CATALOG,
  STICKER_RARITIES,
  STICKER_SETS,
} from "../src/data/stickerCatalog.js";
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
  return seen;
};

uniqueById(LANDMARKS, "landmark");
const stickerIds = uniqueById(STICKER_CATALOG, "sticker");
uniqueById(SECRET_ACHIEVEMENTS, "secret achievement");

for (const sticker of STICKER_CATALOG) {
  if (!STICKER_RARITIES.includes(sticker.rarity)) {
    errors.push(`Sticker ${sticker.id} has invalid rarity: ${sticker.rarity}`);
  }
}

for (const set of STICKER_SETS) {
  const requiredIds = set.requires || set.requiresAny?.ids || [];
  for (const id of requiredIds) {
    if (!stickerIds.has(id)) errors.push(`Sticker set ${set.id} references missing sticker: ${id}`);
  }
  if (set.requiresAny && (set.requiresAny.count < 1 || set.requiresAny.count > set.requiresAny.ids.length)) {
    errors.push(`Sticker set ${set.id} has an invalid requiresAny count.`);
  }
}

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
console.log(`Sticker sets: ${STICKER_SETS.length}`);
console.log(`Secret achievements: ${SECRET_ACHIEVEMENTS.length}`);
