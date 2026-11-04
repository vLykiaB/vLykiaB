/* ===========================================================================
   OTTR — Otter Society | Collection data
   ---------------------------------------------------------------------------
   Single source of truth for both pages. Values transcribed from traits.md.
   =========================================================================== */

const COLLECTION = {
  name: "Otter Society",
  symbol: "OTTR",
  creator: "LYKIAB",
  chain: "Base",
  standard: "ERC-1155",
  standardNote: "Open Collection",
  contract: "0x0429efc27dae8fef6b25e772d950b42cee20cef3",
  supply: 10,
  edition: "1 of 1",
  creatorFee: "5%",
  opensea: "https://opensea.io/collection/otter-society-814434086",
  tagline: "Ten otters. One society.",
  standfirst:
    "A closed set of ten pieces on Base. One character, one framing, one " +
    "art direction — and a fixed wardrobe that decides how far each piece " +
    "is allowed to travel from the others.",
};

/* Rarity tiers, floor to ceiling ------------------------------------------ */
const TIERS = {
  common:    { label: "Common",    rank: 1 },
  uncommon:  { label: "Uncommon",  rank: 2 },
  rare:      { label: "Rare",      rank: 3 },
  epic:      { label: "Epic",      rank: 4 },
  legendary: { label: "Legendary", rank: 5 },
};

/* The ten pieces. Token ID matches the piece number.
   `price` is the listed figure from traits.md. It is intentionally NOT
   rendered anywhere — OpenSea is the source of truth for price. Kept here so
   it can be switched on with a single change if that decision reverses. */
const PIECES = [
  {
    id: 1, name: "White Knit", tier: "common", price: 0.0129,
    note: "The reference point. Plain knit, nothing added — every other piece is measured by how far it departs from this one.",
    traits: { Outfit: "White Knit", Lens: "Pale Blue", "Held Item": "Vape Pen", Headwear: "—", Jewellery: "—", Background: "Teal" },
  },
  {
    id: 2, name: "Navy Knit", tier: "common", price: 0.0138,
    note: "The same cable knit in a deeper register, with an orange lens pulling against the cool background.",
    traits: { Outfit: "Navy Knit", Lens: "Orange", "Held Item": "Espresso", Headwear: "—", Jewellery: "—", Background: "Teal" },
  },
  {
    id: 3, name: "Cream Knit", tier: "common", price: 0.0134,
    note: "The tone the brand stands in. Cream knit, yellow lens, a phone held like an afterthought.",
    traits: { Outfit: "Cream Knit", Lens: "Yellow", "Held Item": "Phone", Headwear: "—", Jewellery: "—", Background: "Teal" },
  },
  {
    id: 4, name: "Printed Polo", tier: "common", price: 0.0142,
    note: "Where knitwear ends and pattern begins. The only piece on a sage ground, and the only printed fabric in the set.",
    traits: { Outfit: "Printed Polo", Lens: "Pale Blue", "Held Item": "—", Headwear: "—", Jewellery: "—", Background: "Sage" },
  },
  {
    id: 5, name: "Burgundy Jersey", tier: "uncommon", price: 0.0160,
    note: "Cap, chain and jersey arriving together. The first piece that reads as a different register rather than a different colour.",
    traits: { Outfit: "Burgundy Jersey", Lens: "Pink", "Held Item": "—", Headwear: "Backwards Cap", Jewellery: "Gold Chain", Background: "Sand" },
  },
  {
    id: 6, name: "Green Jersey", tier: "uncommon", price: 0.0151,
    note: "The second jersey and the second cap — the only shape in the collection that repeats at all.",
    traits: { Outfit: "Green Jersey", Lens: "Smoke Blue", "Held Item": "—", Headwear: "Backwards Cap", Jewellery: "—", Background: "Mint" },
  },
  {
    id: 7, name: "Black Shell", tier: "rare", price: 0.0173,
    note: "Technical outerwear, and the only piece holding two things at once. Both hands occupied, both screens green.",
    traits: { Outfit: "Black Shell", Lens: "Green", "Held Item": "Phone + Vape", Headwear: "—", Jewellery: "—", Background: "Teal" },
  },
  {
    id: 8, name: "Diamond Chain", tier: "rare", price: 0.0194,
    note: "The only piece without eyewear. Taking the glasses off breaks the collection's one constant, which is exactly why it reads as rare.",
    traits: { Outfit: "Black Tank", Lens: "—", "Held Item": "Joint", Headwear: "—", Jewellery: "Gold Chain", Background: "Charcoal" },
  },
  {
    id: 9, name: "Always Win", tier: "epic", price: 0.0207,
    note: "The signature plate. Amber lens over a gold chain — a pairing that appears once and nowhere else.",
    traits: { Outfit: "Black Tank", Lens: "Amber", "Held Item": "—", Headwear: "—", Jewellery: "Gold Chain", Background: "Burgundy" },
  },
  {
    id: 10, name: "The Desk", tier: "legendary", price: 0.0186,
    note: "The only scene in the set. Every other background is a flat colour; this one is a room, with the character placed inside it.",
    traits: { Outfit: "White Knit", Lens: "Pale Blue", "Held Item": "Espresso", Headwear: "—", Jewellery: "—", Background: "Trading Desk" },
  },
];

/* Trait distribution across the set --------------------------------------- */
const DISTRIBUTION = [
  { slot: "Outfit", values: [
    ["White Knit", 2], ["Black Tank", 2], ["Navy Knit", 1], ["Cream Knit", 1],
    ["Printed Polo", 1], ["Burgundy Jersey", 1], ["Green Jersey", 1], ["Black Shell", 1],
  ]},
  { slot: "Lens", values: [
    ["Pale Blue", 3], ["Orange", 1], ["Yellow", 1], ["Pink", 1],
    ["Smoke Blue", 1], ["Green", 1], ["Amber", 1], ["None", 1],
  ]},
  { slot: "Held Item", values: [
    ["None", 4], ["Espresso", 2], ["Vape Pen", 1], ["Phone", 1], ["Phone + Vape", 1], ["Joint", 1],
  ]},
  { slot: "Headwear", values: [["None", 8], ["Backwards Cap", 2]] },
  { slot: "Jewellery", values: [["None", 7], ["Gold Chain", 3]] },
  { slot: "Background", values: [
    ["Teal", 4], ["Sage", 1], ["Sand", 1], ["Mint", 1],
    ["Charcoal", 1], ["Burgundy", 1], ["Trading Desk", 1],
  ]},
  { slot: "Rarity", values: [
    ["Common", 4], ["Uncommon", 2], ["Rare", 2], ["Epic", 1], ["Legendary", 1],
  ]},
];

/* The rules the set is built on ------------------------------------------- */
const RULES = [
  {
    title: "Knitwear and gold chain never appear together",
    body: "Knit is the calm register, the chain is the street register. The split gives the collection its two faces, and every piece added later has to respect it.",
  },
  {
    title: "Eyewear is the constant",
    body: "Round frames on every piece but one. Otter #8 goes without, and that single exception is a large part of why it reads as rare.",
  },
  {
    title: "Lens colour carries the mood",
    body: "The frame never changes, so the colour of the glass does the work. No lens colour repeats within the same outfit and background pairing.",
  },
  {
    title: "Rarity rises with distance from plain knit",
    body: "Plain knitwear sits at the floor. Chain and scene pieces sit at the top. The price ladder follows the same curve.",
  },
];

/* What the set does not contain yet --------------------------------------- */
const OPEN_SLOTS = [
  { slot: "Headwear",   values: "Beanie · Flat Cap · Bucket Hat" },
  { slot: "Lens",       values: "Clear · Violet · Red" },
  { slot: "Jewellery",  values: "Medallion · Wristband" },
  { slot: "Outfit",     values: "Varsity Jacket · Hoodie · Overshirt" },
  { slot: "Held Item",  values: "Newspaper · Sketchbook · Camera" },
  { slot: "Background", values: "Night · Harbour · Rain" },
];
