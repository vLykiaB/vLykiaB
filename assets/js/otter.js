/* ===========================================================================
   Prosedürel su samuru çizimi (SVG)
   ---------------------------------------------------------------------------
   Gerçek koleksiyon görselleri gelene kadar kullanılan yer tutucu.
   data.js içindeki bir parçaya `img` yolu verildiği anda site onu kullanır
   ve bu çizim devreden çıkar.
   =========================================================================== */

const INK = "#3A2318";

function otterSVG(otter) {
  const p = otter.palette || {};
  const bg = p.bg || "#7FD0F5";
  const fur = p.fur || "#A85A2E";
  const furDark = shade(fur, -18);
  const belly = "#F3E4CA";
  const lens = p.lens || "#DCEEF7";
  const outfit = p.outfit || "";
  const hasOutfit = Boolean(outfit);
  const hasChain = otter.register === "chain";
  const goldChain = otter.id === 9;

  return `
<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="${escapeAttr(otter.name)} — yer tutucu çizim">
  <defs>
    <clipPath id="clip-${otter.id}"><rect width="400" height="400" rx="0"/></clipPath>
  </defs>
  <g clip-path="url(#clip-${otter.id})">
    <rect width="400" height="400" fill="${bg}"/>

    <!-- su halkaları -->
    <g stroke="${shade(bg, -16)}" stroke-width="4" fill="none" opacity=".55" stroke-linecap="round">
      <path d="M44 322q58 -20 116 0"/>
      <path d="M240 322q58 -20 116 0"/>
      <path d="M86 352q114 -24 228 0"/>
    </g>

    <!-- gövde -->
    <path d="M200 168c58 0 92 40 92 92 0 46-40 74-92 74s-92-28-92-74c0-52 34-92 92-92z"
          fill="${fur}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M200 206c34 0 54 26 54 58 0 30-24 48-54 48s-54-18-54-48c0-32 20-58 54-58z"
          fill="${belly}" stroke="none"/>

    ${hasOutfit ? `
    <!-- kıyafet -->
    <path d="M200 206c36 0 57 26 57 58 0 32-25 50-57 50s-57-18-57-50c0-32 21-58 57-58z"
          fill="${outfit}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M168 232h64M164 258h72M168 284h64"
          stroke="${shade(outfit, outfit === "#1E1E22" ? 22 : -14)}"
          stroke-width="5" stroke-linecap="round" opacity=".7"/>` : ``}

    ${hasChain ? `
    <!-- zincir -->
    <path d="M160 214q40 44 80 0" fill="none"
          stroke="${goldChain ? "#E8B23C" : "#CFE2EE"}" stroke-width="11" stroke-linecap="round"/>
    <path d="M160 214q40 44 80 0" fill="none"
          stroke="${INK}" stroke-width="3" stroke-linecap="round" opacity=".45"/>
    <path d="M200 248l17 15-17 16-17-16z"
          fill="${goldChain ? "#F3D06A" : "#EAF6FD"}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>` : ``}

    <!-- kulaklar -->
    <circle cx="131" cy="118" r="26" fill="${furDark}" stroke="${INK}" stroke-width="9"/>
    <circle cx="269" cy="118" r="26" fill="${furDark}" stroke="${INK}" stroke-width="9"/>

    <!-- kafa -->
    <path d="M200 58c52 0 84 36 84 82s-38 72-84 72-84-26-84-72 32-82 84-82z"
          fill="${fur}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>

    <!-- burun bölgesi -->
    <path d="M200 142c30 0 48 16 48 36s-21 32-48 32-48-12-48-32 18-36 48-36z"
          fill="${belly}" stroke="none"/>

    <!-- gözlük -->
    <g stroke="${INK}" stroke-width="9">
      <circle cx="166" cy="130" r="30" fill="${lens}"/>
      <circle cx="234" cy="130" r="30" fill="${lens}"/>
      <path d="M196 130h8" stroke-linecap="round"/>
      <path d="M136 126l-18-8M264 126l18-8" stroke-linecap="round"/>
    </g>
    <path d="M152 118q12 -12 26 -6" stroke="#FFFFFF" stroke-width="7"
          fill="none" stroke-linecap="round" opacity=".75"/>
    <path d="M220 118q12 -12 26 -6" stroke="#FFFFFF" stroke-width="7"
          fill="none" stroke-linecap="round" opacity=".75"/>

    <!-- burun + ağız -->
    <path d="M200 158c9 0 15 5 15 11s-7 10-15 10-15-4-15-10 6-11 15-11z"
          fill="${INK}"/>
    <path d="M200 179v8M200 187q-13 12 -24 2M200 187q13 12 24 2"
          stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>

    <!-- bıyıklar -->
    <g stroke="${INK}" stroke-width="4" stroke-linecap="round" opacity=".85">
      <path d="M150 168l-34 -8M150 180l-32 6"/>
      <path d="M250 168l34 -8M250 180l32 6"/>
    </g>

    <!-- patiler -->
    <ellipse cx="166" cy="320" rx="22" ry="17" fill="${furDark}" stroke="${INK}" stroke-width="8"/>
    <ellipse cx="234" cy="320" rx="22" ry="17" fill="${furDark}" stroke="${INK}" stroke-width="8"/>
  </g>
</svg>`.trim();
}

function shade(hex, amt) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
  if (!m) return hex;
  const ch = (v) => {
    const n = Math.max(0, Math.min(255, parseInt(v, 16) + Math.round(255 * (amt / 100))));
    return n.toString(16).padStart(2, "0");
  };
  return `#${ch(m[1])}${ch(m[2])}${ch(m[3])}`;
}

function escapeAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
