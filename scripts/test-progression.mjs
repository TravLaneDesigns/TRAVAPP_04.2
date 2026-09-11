import {
  STATE_MILESTONES,
  getNextStateMilestone,
  getCompletedStateMilestones,
  getCartographerPencilTier,
} from "../src/data/stateMilestones.js";
import {
  LOWER_48_STATES,
  hasCoastToCoast,
} from "../src/data/passportRegions.js";

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

expect(getNextStateMilestone(0)?.states === 5, "0 stamps should point to State Hopper at 5.");
expect(getNextStateMilestone(5)?.states === 10, "5 stamps should point to Street Sweeper at 10.");
expect(getNextStateMilestone(25)?.states === 30, "25 stamps should point to Highway Man at 30.");
expect(getNextStateMilestone(50) === null, "50 stamps should have no next state milestone.");
expect(getCompletedStateMilestones(25).map((m) => m.states).join(",") === "5,10,20,25", "25 stamps should complete the first four milestones.");

expect(getCartographerPencilTier([]) === null, "No states should not award a Cartographer Pencil.");
expect(getCartographerPencilTier(Array.from({ length: 10 }, (_, i) => `X${i}`))?.id === "cartographerGraphite", "10 unique stamps should award Graphite Pencil.");
expect(getCartographerPencilTier(Array.from({ length: 25 }, (_, i) => `X${i}`))?.id === "cartographerColored", "25 unique stamps should award Colored Pencil.");
expect(getCartographerPencilTier(LOWER_48_STATES)?.id === "cartographerSilver", "Lower 48 should award Silver Pencil.");
expect(getCartographerPencilTier([...LOWER_48_STATES, "AK"])?.id === "cartographerGold", "Lower 48 plus Alaska should award Gold Pencil.");
expect(getCartographerPencilTier([...LOWER_48_STATES, "HI"])?.id === "cartographerGold", "Lower 48 plus Hawaii should award Gold Pencil.");
expect(getCartographerPencilTier([...LOWER_48_STATES, "AK", "HI"])?.id === "cartographerSparkling", "All 50 should award Sparkling Pencil.");

expect(hasCoastToCoast(["PA", "CA"]), "Atlantic plus Pacific should trigger Coast To Coast.");
expect(!hasCoastToCoast(["PA", "OH"]), "No Pacific state should not trigger Coast To Coast.");

expect(STATE_MILESTONES.length === 7, "There should be seven state milestones.");

if (failures.length) {
  console.error("F.A.R.T. progression tests failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("F.A.R.T. progression tests passed.");
