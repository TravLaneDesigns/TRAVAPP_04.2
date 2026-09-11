import { LOWER_48_STATES } from "./passportRegions.js";

export const STATE_MILESTONES = [
  { id: "stateHopper", states: 5, name: "State Hopper", icon: "🗺️" },
  { id: "streetSweeper", states: 10, name: "Street Sweeper", icon: "🧹" },
  { id: "roadHog", states: 20, name: "Road Hog", icon: "🐷" },
  { id: "crossCountryCruiser", states: 25, name: "Cross-Country Cruiser", icon: "🚗" },
  { id: "highwayMan", states: 30, name: "Highway Man", icon: "🛣️" },
  { id: "interstateMaster", states: 40, name: "Interstate Master", icon: "👑" },
  { id: "greatAmericanRoadTrip", states: 50, name: "Great American Road Trip", icon: "🇺🇸" },
];

export const CARTOGRAPHER_PENCIL = {
  graphite: {
    id: "cartographerGraphite",
    name: "Graphite Cartographer's Pencil",
    description: "Collect 10 state stamps.",
  },
  colored: {
    id: "cartographerColored",
    name: "Colored Cartographer's Pencil",
    description: "Collect 25 state stamps.",
  },
  silver: {
    id: "cartographerSilver",
    name: "Silver Cartographer's Pencil",
    description: "Collect all lower 48 states.",
  },
  gold: {
    id: "cartographerGold",
    name: "Gold Cartographer's Pencil",
    description: "Collect the lower 48 plus Alaska or Hawaii.",
  },
  sparkling: {
    id: "cartographerSparkling",
    name: "Sparkling Cartographer's Pencil",
    description: "Collect all 50 states.",
  },
};

export const STATE_STAMP_REWARD = {
  xp: 10,
  roadTokens: 1,
};

export function getNextStateMilestone(count) {
  return STATE_MILESTONES.find((milestone) => count < milestone.states) || null;
}

export function getCompletedStateMilestones(count) {
  return STATE_MILESTONES.filter((milestone) => count >= milestone.states);
}

export function getCartographerPencilTier(collectedStates = []) {
  const unique = new Set(collectedStates);
  const hasLower48 = LOWER_48_STATES.every((stateId) => unique.has(stateId));
  const hasAlaska = unique.has("AK");
  const hasHawaii = unique.has("HI");

  if (hasLower48 && hasAlaska && hasHawaii) return CARTOGRAPHER_PENCIL.sparkling;
  if (hasLower48 && (hasAlaska || hasHawaii)) return CARTOGRAPHER_PENCIL.gold;
  if (hasLower48) return CARTOGRAPHER_PENCIL.silver;
  if (unique.size >= 25) return CARTOGRAPHER_PENCIL.colored;
  if (unique.size >= 10) return CARTOGRAPHER_PENCIL.graphite;
  return null;
}

export default STATE_MILESTONES;
