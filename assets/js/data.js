/* ===========================================================================
   OTTR — Otter Society | Collection data
   ---------------------------------------------------------------------------
   Tek düzenleme noktası. Site tamamen bu dosyadan beslenir.
   Gerçek görselleri assets/img/otters/ içine koyup `img` alanını doldurun;
   `img` boşsa site prosedürel SVG yer tutucu çizer.
   =========================================================================== */

const COLLECTION = {
  name: "Otter Society",
  symbol: "OTTR",
  creator: "LYKIAB",
  chain: "Base",
  standard: "ERC-1155",
  supply: 10,
  editionNote: "Her parça 1/1",
  creatorFee: "5%",
  listingDuration: "6 ay",
  opensea: "https://opensea.io/collection/otter-society-814434086",
  tagline: "Ten otters. One society. Every piece a one of one.",
  intro:
    "Otter Society, Base üzerinde açık bir ERC-1155 koleksiyonu. On parça, her biri tek. " +
    "Sabit bir gardırop sistemiyle kuruldu: her su samuru aynı altı slotu paylaşır, " +
    "farklılığı yarattığı şey o slotları nasıl doldurduğu.",
};

/* Gardırop — sabit slot sistemi -------------------------------------------- */
const WARDROBE = [
  {
    slot: "Background",
    desc: "Sahnenin tonunu kuran katman. Düz suyla başlar; dolu sahneler en nadir uçta durur.",
    filled: true,
  },
  {
    slot: "Outfit",
    desc: "Koleksiyonun omurgası. Sade örgüden baskılı ve teknik parçalara uzanan bir yelpaze.",
    filled: true,
  },
  {
    slot: "Eyewear",
    desc: "Yuvarlak çerçeve her parçada sabit. Değişen tek şey cam rengi — ve o renk bir ruh hâli sinyali.",
    filled: true,
  },
  {
    slot: "Headwear",
    desc: "Bu partide boş bırakıldı. İkinci batch'in açılacağı ilk yer.",
    filled: false,
  },
  {
    slot: "Jewellery",
    desc: "Street register'ın taşıyıcısı. Zincir takıldığı anda örgü masadan kalkar.",
    filled: true,
  },
  {
    slot: "Held Item",
    desc: "Yalnızca en üst uçta görünür. Elde bir şey varsa o parça bir sahne anlatıyordur.",
    filled: true,
  },
];

/* Nadirlik katmanları ------------------------------------------------------ */
const TIERS = {
  base:   { key: "base",   label: "Base",   note: "Sade örgü — merdivenin tabanı" },
  mid:    { key: "mid",    label: "Mid",    note: "Örgüden ayrışma başlıyor" },
  upper:  { key: "upper",  label: "Upper",  note: "Street register'a geçiş" },
  grail:  { key: "grail",  label: "Grail",  note: "Sahne kuran tek parçalar" },
};

/* On parça — price ladder sırasıyla --------------------------------------- */
const OTTERS = [
  {
    id: 1, name: "White Knit", tier: "base", register: "knit", rank: 1, img: "",
    blurb: "Merdivenin tabanı ve koleksiyonun referans noktası. Diğer her parça buradan ne kadar uzaklaştığıyla ölçülüyor.",
    traits: { Background: "Still Water", Outfit: "White Cable Knit", Eyewear: "Clear Round", Headwear: "None", Jewellery: "None", "Held Item": "None" },
    palette: { bg: "#7FD0F5", fur: "#A85A2E", outfit: "#F6EFE0", lens: "#DCEEF7" },
  },
  {
    id: 2, name: "Navy Knit", tier: "base", register: "knit", rank: 2, img: "",
    blurb: "Aynı örgü, daha derin bir ton. Sakin register'ın ikinci sesi.",
    traits: { Background: "Still Water", Outfit: "Navy Cable Knit", Eyewear: "Clear Round", Headwear: "None", Jewellery: "None", "Held Item": "None" },
    palette: { bg: "#6FC4EE", fur: "#A85A2E", outfit: "#2C3E63", lens: "#DCEEF7" },
  },
  {
    id: 3, name: "Cream Knit", tier: "base", register: "knit", rank: 3, img: "",
    blurb: "Logodaki su samurunun giydiği parça. Marka hangi tonda duruyorsa o.",
    traits: { Background: "Still Water", Outfit: "Cream Cable Knit", Eyewear: "Clear Round", Headwear: "None", Jewellery: "None", "Held Item": "None" },
    palette: { bg: "#7FD0F5", fur: "#9E5128", outfit: "#EFE2C6", lens: "#DCEEF7" },
  },
  {
    id: 4, name: "Printed Polo", tier: "mid", register: "knit", rank: 4, img: "",
    blurb: "Örgünün bittiği, desenin başladığı eşik. Mid tier buradan açılıyor.",
    traits: { Background: "Open Water", Outfit: "Printed Polo", Eyewear: "Amber Round", Headwear: "None", Jewellery: "None", "Held Item": "None" },
    palette: { bg: "#62BDEA", fur: "#A85A2E", outfit: "#E8E3D4", lens: "#F0A830" },
  },
  {
    id: 5, name: "Burgundy Jersey", tier: "mid", register: "knit", rank: 5, img: "",
    blurb: "İlk takım forması. Kumaş değişince duruş da değişiyor.",
    traits: { Background: "Open Water", Outfit: "Burgundy Jersey", Eyewear: "Pink Round", Headwear: "None", Jewellery: "None", "Held Item": "None" },
    palette: { bg: "#5FB9E8", fur: "#A85A2E", outfit: "#7D2436", lens: "#F08CA8" },
  },
  {
    id: 6, name: "Green Jersey", tier: "mid", register: "knit", rank: 6, img: "",
    blurb: "Formanın ikinci rengi — seride tekrar eden tek kalıp.",
    traits: { Background: "Open Water", Outfit: "Green Jersey", Eyewear: "Green Round", Headwear: "None", Jewellery: "None", "Held Item": "None" },
    palette: { bg: "#5FB9E8", fur: "#9E5128", outfit: "#3E6B3A", lens: "#8FC45A" },
  },
  {
    id: 7, name: "Black Shell", tier: "mid", register: "knit", rank: 7, img: "",
    blurb: "Teknik parça. Mid tier'ın tavanı ve street register'a açılan kapı.",
    traits: { Background: "Deep Water", Outfit: "Black Shell", Eyewear: "Smoke Round", Headwear: "None", Jewellery: "None", "Held Item": "None" },
    palette: { bg: "#3E9BCE", fur: "#8F4722", outfit: "#1E1E22", lens: "#8A8A92" },
  },
  {
    id: 8, name: "Diamond Chain", tier: "upper", register: "chain", rank: 8, img: "",
    blurb: "Zincir takıldığı anda örgü masadan kalkıyor. Koleksiyonun ikinci yüzü burada başlıyor.",
    traits: { Background: "Deep Water", Outfit: "None", Eyewear: "Ice Round", Headwear: "None", Jewellery: "Diamond Chain", "Held Item": "None" },
    palette: { bg: "#2E8FC4", fur: "#A85A2E", outfit: "", lens: "#CFE9F7" },
  },
  {
    id: 9, name: "Always Win", tier: "upper", register: "chain", rank: 9, img: "",
    blurb: "Altın zincirin imza parçası. Street register'ın en yüksek sesi.",
    traits: { Background: "Deep Water", Outfit: "None", Eyewear: "Amber Round", Headwear: "None", Jewellery: "Gold 'ALWAYS WIN' Chain", "Held Item": "None" },
    palette: { bg: "#1F7FB5", fur: "#A85A2E", outfit: "", lens: "#F0A830" },
  },
  {
    id: 10, name: "The Desk", tier: "grail", register: "scene", rank: 10, img: "",
    blurb: "Tek sahne kuran parça: arka plan sudan masaya taşınıyor, elde bir şey var. Merdivenin tepesi.",
    traits: { Background: "The Desk", Outfit: "Brown Knit", Eyewear: "Green Round", Headwear: "None", Jewellery: "None", "Held Item": "Phone" },
    palette: { bg: "#C98A4B", fur: "#9E5128", outfit: "#7A4A2A", lens: "#8FC45A" },
  },
];

/* İkinci batch — mevcut setteki boşluklar ---------------------------------- */
const ROADMAP = [
  {
    phase: "01",
    title: "İlk On",
    status: "done",
    body: "On parça, her biri 1/1, Base üzerinde açık koleksiyon olarak yayında. Sabit slot sistemi ve iki register burada kuruldu.",
  },
  {
    phase: "02",
    title: "Görünürlük",
    status: "active",
    body: "Arz değil görünürlük önce. Altı aylık listing süresi boyunca koleksiyonun kendi izleyicisini bulması bekleniyor.",
  },
  {
    phase: "03",
    title: "İkinci Batch",
    status: "next",
    body: "Boş bırakılan slotlardan açılıyor: Headwear ilk sırada, ardından Eyewear ve Jewellery varyasyonları. Görünürlük eşiğine bağlı.",
  },
  {
    phase: "04",
    title: "Gardırop Genişlemesi",
    status: "next",
    body: "Held Item ve sahne kuran arka planlar seriye yayılıyor. Kural aynı kalıyor: knit ve chain aynı parçada buluşmuyor.",
  },
];

const FAQ = [
  {
    q: "Kaç parça var?",
    a: "On parça. Her biri 1/1 — aynı görselden ikinci bir kopya basılmıyor.",
  },
  {
    q: "Hangi zincirde?",
    a: "Base üzerinde, ERC-1155 açık koleksiyon olarak yayında.",
  },
  {
    q: "Nadirlik nasıl belirleniyor?",
    a: "Tek kuralla: sade örgüden ne kadar uzaklaştığıyla. Düz knit tabanda durur, zincir ve sahne kuran parçalar tepede.",
  },
  {
    q: "Neden bazı parçalarda hem örgü hem zincir yok?",
    a: "Bilerek. Knit ve chain birbirini dışlar — koleksiyonun iki ayrı yüzü var ve bir parça aynı anda ikisi birden olamıyor.",
  },
  {
    q: "Gözlük neden her parçada aynı?",
    a: "Çerçeve sabit, değişen tek şey cam rengi. O renk parçanın ruh hâlini taşıyor; karakteri tanınır tutan şey de bu sabitlik.",
  },
  {
    q: "Headwear slotu neden boş?",
    a: "İkinci batch için ayrıldı. Mevcut setteki en belirgin boşluk orası ve genişleme oradan başlayacak.",
  },
  {
    q: "Creator fee ne kadar?",
    a: "%5. Her ikincil satışta geçerli.",
  },
];
