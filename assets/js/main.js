/* ===========================================================================
   OTTR — Otter Society | Arayüz
   =========================================================================== */
(function () {
  "use strict";

  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const esc = (s) => String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  /* ---- parça görseli: gerçek dosya varsa onu, yoksa prosedürel çizim ---- */
  function artFor(otter, eager) {
    if (otter.img) {
      return `<img src="${esc(otter.img)}" alt="${esc(COLLECTION.name)} #${otter.id} — ${esc(otter.name)}"
                   loading="${eager ? "eager" : "lazy"}" decoding="async" width="600" height="600">`;
    }
    return otterSVG(otter);
  }

  /* ================= OpenSea bağlantıları ================= */
  ["nav-opensea", "nav-opensea-m", "hero-opensea", "footer-opensea"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = COLLECTION.opensea;
  });

  /* ================= Hero ================= */
  $("#hero-name").textContent = COLLECTION.name;
  $("#hero-tagline").textContent = COLLECTION.tagline;

  $("#hero-stats").innerHTML = [
    ["Parça", COLLECTION.supply],
    ["Edisyon", "1 / 1"],
    ["Zincir", COLLECTION.chain],
    ["Standart", COLLECTION.standard],
  ].map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");

  // Hero'da yüzen dört parça
  $("#hero-otters").innerHTML = [OTTERS[0], OTTERS[8], OTTERS[9], OTTERS[7]]
    .map((o) => `<div class="float">${otterSVG(o)}</div>`).join("");

  /* ================= Ticker ================= */
  const tickerWords = [
    "Ten Otters", "One Society", "Every Piece A One Of One",
    `${COLLECTION.chain} Chain`, COLLECTION.standard,
    "Calm Knit", "Street Chain", `By ${COLLECTION.creator}`,
  ];
  const line = tickerWords.map((w) => `<span lang="en">${esc(w)}</span>`).join("");
  $("#ticker-track").innerHTML = line + line; // -50% kaydırma için iki kopya

  /* ================= Giriş ================= */
  $("#intro-text").textContent = COLLECTION.intro;
  $("#intro-facts").innerHTML = [
    ["Yaratıcı", COLLECTION.creator],
    ["Zincir", COLLECTION.chain],
    ["Standart", `${COLLECTION.standard} — açık koleksiyon`],
    ["Arz", `${COLLECTION.supply} parça · ${COLLECTION.editionNote}`],
    ["Creator fee", COLLECTION.creatorFee],
    ["Listing süresi", COLLECTION.listingDuration],
  ].map(([k, v]) => `<li><b>${esc(k)}</b><span>${esc(v)}</span></li>`).join("");

  /* ================= Koleksiyon ızgarası ================= */
  const grid = $("#otter-grid");
  grid.innerHTML = OTTERS.map((o, i) => `
    <button class="card" data-id="${o.id}" data-tier="${esc(o.tier)}"
            aria-label="${esc(o.name)} detaylarını aç">
      <div class="card-art">
        <span class="card-id">#${String(o.id).padStart(2, "0")}</span>
        ${artFor(o, i < 4)}
      </div>
      <div class="card-body">
        <h3 class="card-name">${esc(o.name)}</h3>
        <div class="card-meta">
          <span class="tier tier-${esc(o.tier)}" lang="en">${esc(TIERS[o.tier].label)}</span>
          <span class="card-rank">#${o.rank} / ${COLLECTION.supply}</span>
        </div>
      </div>
    </button>`).join("");

  /* ---- filtreler ---- */
  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      $$(".chip").forEach((c) => c.classList.toggle("is-active", c === chip));
      const f = chip.dataset.filter;
      $$(".card", grid).forEach((card) => {
        card.hidden = f !== "all" && card.dataset.tier !== f;
      });
    });
  });

  /* ================= Gardırop ================= */
  $("#slot-grid").innerHTML = WARDROBE.map((s) => `
    <article class="slot ${s.filled ? "" : "is-empty"}">
      <div class="slot-head">
        <h3>${esc(s.slot)}</h3>
        <span class="slot-flag ${s.filled ? "on" : "off"}">${s.filled ? "Dolu" : "Boş"}</span>
      </div>
      <p>${esc(s.desc)}</p>
    </article>`).join("");

  /* ================= Nadirlik ================= */
  const byRegister = (r) => OTTERS.filter((o) => o.register === r);
  const countText = (r) => {
    const list = byRegister(r);
    return `${list.length} parça — ${list.map((o) => "#" + o.id).join(", ")}`;
  };
  $("#count-knit").textContent  = countText("knit");
  $("#count-chain").textContent = countText("chain");
  $("#count-scene").textContent = countText("scene");

  const maxRank = Math.max.apply(null, OTTERS.map((o) => o.rank));
  $("#ladder-list").innerHTML = OTTERS.slice().sort((a, b) => a.rank - b.rank).map((o) => `
    <li>
      <span class="lad-rank">#${String(o.id).padStart(2, "0")}</span>
      <span class="lad-name">${esc(o.name)}</span>
      <span class="tier tier-${esc(o.tier)}" lang="en">${esc(TIERS[o.tier].label)}</span>
      <span class="lad-bar" style="width:${Math.round((o.rank / maxRank) * 55) + 6}%"></span>
    </li>`).join("");

  /* ================= Yol haritası ================= */
  const statusLabel = { done: "Tamam", active: "Devam ediyor", next: "Sırada" };
  $("#timeline").innerHTML = ROADMAP.map((r) => `
    <article class="tl is-${esc(r.status)}">
      <span class="tl-status">${esc(statusLabel[r.status] || r.status)}</span>
      <p class="tl-phase">${esc(r.phase)}</p>
      <h3>${esc(r.title)}</h3>
      <p>${esc(r.body)}</p>
    </article>`).join("");

  /* ================= SSS ================= */
  $("#faq-list").innerHTML = FAQ.map((f) => `
    <details>
      <summary>${esc(f.q)}</summary>
      <p class="faq-a">${esc(f.a)}</p>
    </details>`).join("");

  /* ================= Footer ================= */
  $("#footer-tagline").textContent = COLLECTION.tagline;
  $("#footer-meta").innerHTML = [
    ["Zincir", COLLECTION.chain],
    ["Standart", COLLECTION.standard],
    ["Arz", `${COLLECTION.supply} · ${COLLECTION.editionNote}`],
    ["Creator fee", COLLECTION.creatorFee],
  ].map(([k, v]) => `<div><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join("");
  $("#footer-credit").textContent =
    `${COLLECTION.name} — ${COLLECTION.creator} · ${new Date().getFullYear()}`;

  /* ================= Modal ================= */
  const modal = $("#modal");
  const modalBody = $("#modal-body");
  let lastFocused = null;

  function openOtter(id) {
    const o = OTTERS.find((x) => x.id === Number(id));
    if (!o) return;

    const traits = Object.entries(o.traits).map(([k, v]) => `
      <li class="${v === "None" ? "is-none" : ""}">
        <span class="t-key" lang="en">${esc(k)}</span>
        <span class="t-val">${esc(v)}</span>
      </li>`).join("");

    modalBody.innerHTML = `
      <div class="detail">
        <div class="detail-art" style="background:${esc((o.palette && o.palette.bg) || "#8ED4F5")}">${artFor(o, true)}</div>
        <div class="detail-body">
          <p class="detail-tier">
            <span class="tier tier-${esc(o.tier)}" lang="en">${esc(TIERS[o.tier].label)}</span>
            <span class="detail-tier-note">${esc(TIERS[o.tier].note)}</span>
          </p>
          <h2 id="modal-title">#${String(o.id).padStart(2, "0")} ${esc(o.name)}</h2>
          <p class="detail-blurb">${esc(o.blurb)}</p>
          <ul class="trait-list">${traits}</ul>
          <p style="margin-top:1.4rem">
            <a class="btn btn-primary" href="${esc(COLLECTION.opensea)}"
               target="_blank" rel="noopener noreferrer">OpenSea'de gör ↗</a>
          </p>
        </div>
      </div>`;

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal-close", modal).focus();
  }

  function closeModal() {
    modal.hidden = true;
    modalBody.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) openOtter(card.dataset.id);
  });
  modal.addEventListener("click", (e) => { if (e.target.hasAttribute("data-close")) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  // Modal açıkken odağı içeride tut
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const f = $$('a[href], button, [tabindex]:not([tabindex="-1"])', modal)
      .filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ================= Mobil menü ================= */
  const toggle = $("#nav-toggle");
  const mobile = $("#nav-mobile");
  toggle.addEventListener("click", () => {
    const open = mobile.hidden;
    mobile.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("a", mobile).forEach((a) => a.addEventListener("click", () => {
    mobile.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }));

  /* ================= Scroll reveal ================= */
  // Kartları ve slotları da listeye kat
  $$(".card, .slot, .tl, .faq details").forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 6) * 55 + "ms";
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $$(".reveal").forEach((el) => io.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("is-in"));
  }

  /* ================= Aktif menü bağlantısı ================= */
  const sections = ["about", "collection", "wardrobe", "rarity", "roadmap", "faq"]
    .map((id) => document.getElementById(id)).filter(Boolean);
  const navLinks = $$(".nav-links a");

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) =>
          a.classList.toggle("is-current", a.getAttribute("href") === "#" + entry.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
  }
})();
