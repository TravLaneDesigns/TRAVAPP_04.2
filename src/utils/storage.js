const STORAGE_KEY = "fun_always_road_trip_save";

export const defaultSaveData = {
  ownerName: "",

  settings: {
    muted: false,
    musicVolume: 50,
    sfxVolume: 50,
    contentRating: "PG-13",
  },

  stats: {
    gamesPlayed: 0,
    totalWins: 0,
    aiVictories: 0,
    longestWinStreak: 0,
  },

  stickers: [],
  achievements: [],
  journal: [],
};

export function loadSaveData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultSaveData;
    }

    return {
      ...defaultSaveData,
      ...JSON.parse(saved),
    };
  } catch {
    return defaultSaveData;
  }
}

export function saveData(data) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}
