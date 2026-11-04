/* ===========================================================================
   OTTR — Otter Society | Shared behaviour for both pages
   =========================================================================== */
(function () {
  "use strict";

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const esc = (s) => String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  const pad   = (n) => String(n).padStart(2, "0");
  const art   = (p) => `assets/img/otters/${pad(p.id)}.webp`;
  const isNil = (v) => v === "—" || v === "None" || v === "";

  /* ---------- OpenSea links ---------- */
  ["mast-os", "open-os", "foot-os"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = COLLECTION.opensea;
  });

  /* ---------- plate markup, shared by both pages ---------- */
  function plate(p, eager) {
    return `
      <button class="plate reveal" data-id="${p.id}" aria-label="${esc(p.name)} — open details">
        <div class="plate-art">
          <img src="${art(p)}" width="1200" height="1200"
               alt="Otter Society #${pad(p.id)} — ${esc(p.name)}"
               loading="${eager ? "eager" : "lazy"}" decoding="async">
        </div>
        <div class="plate-cap">
          <span class="plate-no">No. ${pad(p.id)}</span>
          <h3 class="plate-name">${esc(p.name)}</h3>
          <span class="plate-tier">${esc(TIERS[p.tier].label)}</span>
        </div>
      </button>`;
  }

  /* ---------- social marks, shared ----------
     Inline SVG because the page CSP blocks remote images. A null url renders
     an inert symbol, never an <a> pointing nowhere. */
  const GLYPH = {
    X: '<path d="M13.1 1.5h2.4l-5.2 6 6.2 8.2h-4.9l-3.8-5-4.4 5H1l5.6-6.4L.7 1.5h5l3.5 4.6 3.9-4.6Zm-.9 13.1h1.4L4.9 2.9H3.4l8.8 11.7Z"/>',
    Discord: '<path d="M13.6 3.2A11 11 0 0 0 11 2.3l-.2.4a9 9 0 0 0-3.6 0L7 2.3a11 11 0 0 0-2.7.9C2.6 5.7 2.1 8.2 2.3 10.6a11 11 0 0 0 3.3 1.7l.7-1.1-1.2-.6.3-.2a7.8 7.8 0 0 0 6.7 0l.3.2-1.2.6.7 1.1a11 11 0 0 0 3.3-1.7c.3-2.8-.5-5.3-1.6-7.4ZM6.4 9.2c-.6 0-1.2-.6-1.2-1.4s.5-1.4 1.2-1.4 1.2.6 1.2 1.4-.5 1.4-1.2 1.4Zm3.2 0c-.6 0-1.2-.6-1.2-1.4s.5-1.4 1.2-1.4 1.2.6 1.2 1.4-.5 1.4-1.2 1.4Z"/>',
  };

  function socialMarkup() {
    return SOCIAL.map((s) => {
      const svg = `<svg viewBox="0 0 18 18" aria-hidden="true">${GLYPH[s.name] || ""}</svg>`;
      return s.url
        ? `<a class="social-mark" href="${esc(s.url)}" target="_blank"
              rel="noopener noreferrer" aria-label="${esc(s.name)}">${svg}</a>`
        : `<span class="social-mark is-soon" role="img"
                 aria-label="${esc(s.name)} — coming soon"
                 title="${esc(s.name)} — coming soon">${svg}</span>`;
    }).join("");
  }

  ["mast-social", "foot-social"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = socialMarkup();
  });

  /* ---------- footer, shared ---------- */
  const footTag = $("#foot-tagline");
  if (footTag) footTag.textContent = COLLECTION.standfirst;

  const footMeta = $("#foot-meta");
  if (footMeta) {
    footMeta.innerHTML = [
      ["Chain", esc(COLLECTION.chain)],
      ["Standard", esc(`${COLLECTION.standard} — ${COLLECTION.standardNote}`)],
      ["Supply", esc(`${COLLECTION.supply} pieces · ${COLLECTION.edition} each`)],
      ["Creator fee", esc(COLLECTION.creatorFee)],
      ["Contract", `<span class="foot-contract">${esc(COLLECTION.contract)}</span>`],
    ].map(([k, v]) => `<div><b>${esc(k)}</b><span>${v}</span></div>`).join("");
  }

  const credit = $("#foot-credit");
  if (credit) {
    credit.textContent =
      `${COLLECTION.name} — ${COLLECTION.creator} · ${new Date().getFullYear()}`;
  }

  /* ======================= LANDING PAGE ======================= */
  const tagline = $("#tagline");
  if (tagline) {
    tagline.textContent = COLLECTION.tagline;
    $("#standfirst").textContent = COLLECTION.standfirst;

    const short = COLLECTION.contract.slice(0, 6) + "…" + COLLECTION.contract.slice(-4);
    $("#facts").innerHTML = [
      ["Chain", COLLECTION.chain, ""],
      ["Standard", COLLECTION.standard, ""],
      ["Supply", COLLECTION.supply, ""],
      ["Edition", COLLECTION.edition, ""],
      ["Contract", short, "mono"],
    ].map(([k, v, cls]) =>
      `<div><dt>${esc(k)}</dt><dd class="${cls}"${
        cls ? ` title="${esc(COLLECTION.contract)}"` : ""
      }>${esc(v)}</dd></div>`).join("");

    // The three pieces furthest from plain knitwear
    const featured = [10, 9, 8].map((id) => PIECES.find((p) => p.id === id));
    $("#featured").innerHTML = featured.map((p) => plate(p, true)).join("");

    $("#rules").innerHTML = RULES.map((r, i) => `
      <article class="rule-item reveal">
        <span class="rule-num">${pad(i + 1)}</span>
        <h3>${esc(r.title)}</h3>
        <p>${esc(r.body)}</p>
      </article>`).join("");
  }

  /* ======================= COLLECTION PAGE ======================= */
  const grid = $("#piece-grid");
  if (grid) {
    grid.innerHTML = PIECES.map((p, i) => plate(p, i < 2)).join("");

    $("#dist").innerHTML = DISTRIBUTION.map((g) => `
      <div class="dist-group reveal">
        <h3>${esc(g.slot)}</h3>
        ${g.values.map(([v, n]) => `
          <div class="dist-row">
            <span class="dv">${esc(v)}</span>
            <span class="dc">${n} · ${n * 10}%</span>
          </div>`).join("")}
      </div>`).join("");

    $("#slots").innerHTML = OPEN_SLOTS.map((s) => `
      <div class="slot-row">
        <dt>${esc(s.slot)}</dt>
        <dd>${esc(s.values)}</dd>
      </div>`).join("");
  }

  /* ======================= OVERLAY ======================= */
  const ov = $("#ov");
  const ovBody = $("#ov-body");
  let lastFocused = null;

  function openPiece(id) {
    const p = PIECES.find((x) => x.id === Number(id));
    if (!p || !ov) return;

    const traits = Object.entries(p.traits).map(([k, v]) => `
      <div class="${isNil(v) ? "is-none" : ""}">
        <dt>${esc(k)}</dt>
        <dd>${isNil(v) ? "None" : esc(v)}</dd>
      </div>`).join("");

    ovBody.innerHTML = `
      <div class="detail">
        <div class="detail-art">
          <img src="assets/img/otters/master/${pad(p.id)}.webp"
               width="2000" height="2000"
               alt="Otter Society #${pad(p.id)} — ${esc(p.name)}" decoding="async">
        </div>
        <div class="detail-body">
          <div class="detail-head">
            <span class="plate-no">No. ${pad(p.id)}</span>
            <span class="plate-tier">${esc(TIERS[p.tier].label)}</span>
          </div>
          <h2 id="ov-title">${esc(p.name)}</h2>
          <p class="detail-note">${esc(p.note)}</p>
          <dl class="traits">${traits}</dl>
          <a class="tlink" href="${esc(COLLECTION.opensea)}" target="_blank" rel="noopener noreferrer">
            View on OpenSea <span class="arrow" aria-hidden="true">&#8599;</span>
          </a>
        </div>
      </div>`;

    lastFocused = document.activeElement;
    ov.hidden = false;
    document.body.style.overflow = "hidden";
    $(".ov-close", ov).focus();
  }

  function closeOverlay() {
    if (!ov || ov.hidden) return;
    ov.hidden = true;
    ovBody.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  // Plates exist on both pages; the overlay only on the collection page.
  document.addEventListener("click", (e) => {
    const p = e.target.closest(".plate");
    if (!p) return;
    if (ov) openPiece(p.dataset.id);
    else window.location.href = "collection.html";
  });

  if (ov) {
    ov.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-close")) closeOverlay();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeOverlay();
    });
    ov.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const f = $$('a[href], button, [tabindex]:not([tabindex="-1"])', ov)
        .filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ======================= REVEAL ======================= */
  const reveals = $$(".reveal");
  reveals.forEach((el, i) => { el.style.transitionDelay = (i % 4) * 60 + "ms"; });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0.02 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }
})();
