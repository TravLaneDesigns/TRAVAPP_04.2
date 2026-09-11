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
  silver: {
    name: "Silver Cartographer's Pencil",
    description: "Collect all lower 48 states.",
  },
  gold: {
    name: "Gold Cartographer's Pencil",
    description: "Collect the lower 48 plus Alaska or Hawaii.",
  },
  sparkling: {
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

export default STATE_MILESTONES;
