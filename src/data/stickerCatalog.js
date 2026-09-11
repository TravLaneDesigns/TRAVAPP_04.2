export const STICKER_RARITIES = ["Common", "Rare", "Epic", "Legendary", "Mythic"];

export const VEHICLE_STICKERS = [
  { id: "family-sedan", name: "Family Sedan", rarity: "Common" },
  { id: "compact-suv", name: "Compact SUV", rarity: "Common" },
  { id: "pickup-truck", name: "Pickup Truck", rarity: "Common" },
  { id: "minivan", name: "Minivan", rarity: "Common" },
  { id: "taxi", name: "Taxi", rarity: "Common" },
  { id: "hatchback", name: "Hatchback", rarity: "Common" },
  { id: "coupe", name: "Coupe", rarity: "Common" },
  { id: "rideshare", name: "Ride Share Car", rarity: "Common" },
  { id: "lifted-pickup", name: "Lifted Pickup", rarity: "Rare" },
  { id: "police-cruiser", name: "Police Cruiser", rarity: "Rare" },
  { id: "fire-engine", name: "Fire Engine", rarity: "Rare" },
  { id: "ambulance", name: "Ambulance", rarity: "Rare" },
  { id: "mail-truck", name: "Mail Truck", rarity: "Rare" },
  { id: "semi-truck", name: "Semi Truck", rarity: "Rare" },
  { id: "garbage-truck", name: "Garbage Truck", rarity: "Rare" },
  { id: "farm-tractor", name: "Farm Tractor", rarity: "Rare" },
  { id: "rv", name: "RV", rarity: "Epic" },
  { id: "camper-van", name: "Camper Van", rarity: "Epic" },
  { id: "off-road-buggy", name: "Off-Road Buggy", rarity: "Epic" },
  { id: "beach-cruiser", name: "Beach Cruiser", rarity: "Epic" },
  { id: "1957-bel-air", name: "1957 Bel Air", rarity: "Rare", collection: "Classic Cars" },
  { id: "1965-mustang", name: "1965 Mustang", rarity: "Rare", collection: "Classic Cars" },
  { id: "1969-charger", name: "1969 Charger", rarity: "Rare", collection: "Classic Cars" },
  { id: "pontiac-gto", name: "Pontiac GTO", rarity: "Rare", collection: "Classic Cars" },
  { id: "shelby-cobra", name: "Shelby Cobra", rarity: "Epic", collection: "Classic Cars" },
  { id: "1953-corvette", name: "1953 Corvette", rarity: "Epic", collection: "Classic Cars" },
  { id: "split-window-corvette", name: "Split-Window Corvette", rarity: "Epic", collection: "Classic Cars" },
  { id: "1932-hot-rod", name: "1932 Hot Rod", rarity: "Epic", collection: "Classic Cars" },
  { id: "model-t", name: "Model T", rarity: "Legendary", collection: "Classic Cars" },
  { id: "shelby-gt500", name: "Shelby GT500", rarity: "Legendary", collection: "Classic Cars" },
];

export const ANIMAL_STICKERS = [
  { id: "dog", name: "Dog", rarity: "Common" },
  { id: "cat", name: "Cat", rarity: "Common" },
  { id: "rabbit", name: "Rabbit", rarity: "Common" },
  { id: "squirrel", name: "Squirrel", rarity: "Common" },
  { id: "duck", name: "Duck", rarity: "Common" },
  { id: "frog", name: "Frog", rarity: "Common" },
  { id: "fish", name: "Fish", rarity: "Common" },
  { id: "turtle", name: "Turtle", rarity: "Common" },
  { id: "fox", name: "Fox", rarity: "Rare" },
  { id: "raccoon", name: "Raccoon", rarity: "Rare" },
  { id: "beaver", name: "Beaver", rarity: "Rare" },
  { id: "deer", name: "Deer", rarity: "Rare" },
  { id: "otter", name: "Otter", rarity: "Rare" },
  { id: "skunk", name: "Skunk", rarity: "Rare" },
  { id: "goat", name: "Goat", rarity: "Rare" },
  { id: "bear", name: "Bear", rarity: "Epic" },
  { id: "wolf", name: "Wolf", rarity: "Epic" },
  { id: "bison", name: "Buffalo/Bison", rarity: "Epic" },
  { id: "moose", name: "Moose", rarity: "Epic" },
  { id: "wild-horse", name: "Wild Horse", rarity: "Epic" },
  { id: "bald-eagle", name: "Bald Eagle", rarity: "Legendary" },
  { id: "alligator", name: "Alligator", rarity: "Legendary" },
  { id: "mountain-lion", name: "Mountain Lion", rarity: "Legendary" },
  { id: "bigfoot", name: "Bigfoot", rarity: "Mythic" },
  { id: "jackalope", name: "Jackalope", rarity: "Mythic" },
  { id: "mothman", name: "Mothman", rarity: "Mythic" },
];

export const SILLY_STICKERS = [
  { id: "lost-sock", name: "Lost Sock", rarity: "Common" },
  { id: "banana-peel", name: "Banana Peel", rarity: "Common" },
  { id: "pretzel", name: "Pretzel", rarity: "Common" },
  { id: "toilet-paper", name: "Toilet Paper Roll", rarity: "Common" },
  { id: "tiny-fart-cloud", name: "Tiny Fart Cloud", rarity: "Common" },
  { id: "broken-crayon", name: "Broken Crayon", rarity: "Common" },
  { id: "chewed-pencil", name: "Chewed Pencil", rarity: "Common" },
  { id: "french-fry", name: "French Fry", rarity: "Common" },
  { id: "rubber-chicken", name: "Rubber Chicken", rarity: "Rare" },
  { id: "alien", name: "Alien", rarity: "Rare" },
  { id: "ufo", name: "UFO", rarity: "Rare" },
  { id: "flying-pig", name: "Flying Pig", rarity: "Rare" },
  { id: "unicorn", name: "Unicorn", rarity: "Rare" },
  { id: "fake-mustache", name: "Fake Mustache", rarity: "Rare" },
  { id: "big-cheese", name: "Big Cheese", rarity: "Epic" },
  { id: "roadside-dinosaur", name: "Roadside Dinosaur", rarity: "Epic" },
  { id: "potato-king", name: "Potato King", rarity: "Epic" },
  { id: "hot-dog-hero", name: "Hot Dog Hero", rarity: "Epic" },
  { id: "hitchhiking-octopus", name: "Hitchhiking Octopus", rarity: "Epic" },
  { id: "other-sock", name: "The Other Sock", rarity: "Legendary" },
  { id: "mega-fart-cloud", name: "Mega Fart Cloud", rarity: "Legendary" },
];

export const MYTHIC_STICKERS = [
  { id: "time-box", name: "The Time Box", rarity: "Mythic" },
  { id: "highway-dragon-wagon", name: "Highway Dragon Wagon", rarity: "Mythic" },
  { id: "road-trip-legend", name: "Road Trip Legend", rarity: "Mythic" },
  { id: "legendary-sock-pair", name: "The Legendary Sock Pair", rarity: "Mythic" },
  { id: "golden-chicken", name: "Golden Chicken", rarity: "Mythic" },
  { id: "cartographers-pencil", name: "Cartographer's Pencil", rarity: "Mythic" },
  { id: "roccos-treasure-map", name: "Rocco's Treasure Map", rarity: "Mythic" },
  { id: "scouts-passport", name: "Scout's Passport", rarity: "Mythic" },
  { id: "turbos-hoodie", name: "Turbo's Hoodie", rarity: "Mythic" },
  { id: "dragos-hoard", name: "Drago's Hoard", rarity: "Mythic" },
];

export const STICKER_SETS = [
  {
    id: "farm-friends",
    name: "Farm Friends",
    requires: ["cow", "chicken", "farm-dog", "barn-cat", "horse"],
    reward: "Barn Sticker",
  },
  {
    id: "woodland-friends",
    name: "Woodland Friends",
    requires: ["raccoon", "fox", "deer", "bear", "wolf"],
    reward: "Forest Sticker",
  },
];

export const STICKER_TRADE_VALUES = {
  Common: { buy: 5, sell: 2 },
  Rare: { buy: 10, sell: 5 },
  Epic: { buy: 25, sell: 12 },
  Legendary: { buy: 50, sell: 25 },
  Mythic: { buy: null, sell: null },
};

export const STICKER_CATALOG = [
  ...VEHICLE_STICKERS,
  ...ANIMAL_STICKERS,
  ...SILLY_STICKERS,
  ...MYTHIC_STICKERS,
];

export default STICKER_CATALOG;
