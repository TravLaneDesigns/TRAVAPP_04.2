export const PASSPORT_REGIONS = [
  { id: "new-england", name: "New England", states: ["ME", "NH", "VT", "MA", "RI", "CT"] },
  { id: "mid-atlantic", name: "Mid-Atlantic", states: ["NY", "NJ", "PA", "DE", "MD"] },
  { id: "southeast", name: "Southeast", states: ["VA", "WV", "NC", "SC", "GA", "FL", "AL", "MS", "TN", "KY", "AR", "LA"] },
  { id: "midwest", name: "Midwest", states: ["OH", "MI", "IN", "IL", "WI", "MN", "IA", "MO", "ND", "SD", "NE", "KS"] },
  { id: "southwest", name: "Southwest", states: ["TX", "OK", "NM", "AZ"] },
  { id: "mountain-west", name: "Mountain West", states: ["CO", "UT", "WY", "MT", "ID", "NV"] },
  { id: "pacific", name: "Pacific", states: ["CA", "OR", "WA"] },
  { id: "non-contiguous", name: "Non-Contiguous", states: ["AK", "HI"] },
];

export const ATLANTIC_COAST_STATES = [
  "ME", "NH", "MA", "RI", "CT", "NY", "NJ", "DE", "MD", "VA", "NC", "SC", "GA", "FL"
];

export const PACIFIC_COAST_STATES = ["CA", "OR", "WA", "AK", "HI"];

export const LOWER_48_STATES = [
  "AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export function isRegionComplete(region, collectedStates = []) {
  return region.states.every((stateId) => collectedStates.includes(stateId));
}

export function hasCoastToCoast(collectedStates = []) {
  const hasAtlantic = ATLANTIC_COAST_STATES.some((stateId) => collectedStates.includes(stateId));
  const hasPacific = PACIFIC_COAST_STATES.some((stateId) => collectedStates.includes(stateId));
  return hasAtlantic && hasPacific;
}

export default PASSPORT_REGIONS;
