# OTTR — Otter Society | Website

Static two-page site. No build step, no dependencies, no framework.
Open `index.html` and it runs.

## Files

```
index.html              Landing page — banner, statement, facts, three pieces, rules
collection.html         The gallery — all ten pieces, trait distribution, open slots
assets/css/style.css    All styling. Design tokens at the top, in :root
assets/js/data.js       ← ALL CONTENT LIVES HERE. Single edit point
assets/js/main.js       Shared behaviour: footer, grids, overlay, scroll reveal
assets/img/otters/      01–10.webp display art, master/ holds the 2000px originals
assets/img/banner.webp  Horizontal logo, used on the landing page
assets/img/logo.webp    Square logo, used in the footer
```

## Editing content

Everything the pages display comes from `assets/js/data.js`, transcribed from
`traits.md`:

| Export | Holds |
|---|---|
| `COLLECTION` | Name, chain, standard, contract, supply, creator fee, OpenSea URL, the headline and standfirst |
| `TIERS` | The five rarity tiers |
| `PIECES` | The ten pieces — name, tier, note, six traits each |
| `DISTRIBUTION` | Trait counts across the set, shown on the collection page |
| `RULES` | The four design rules, shown on the landing page |
| `OPEN_SLOTS` | Values not yet in the set |

Both pages read from these, so adding or removing a piece needs no HTML
changes — the grid, the featured row and the overlay all follow the list.

### Prices

`PIECES[n].price` carries the listed figure from `traits.md`, but **nothing on
the site renders it**. OpenSea is the source of truth for price and
availability, so the site never shows a number that can go stale. To change
that, render `p.price` in the overlay in `assets/js/main.js`.

### Replacing artwork

Drop a new file into `assets/img/otters/` as `NN.webp` (1200 × 1200) and the
same into `master/` (2000 × 2000). Filenames map to piece numbers, which map to
token IDs. Nothing else needs editing.

## Design

Quiet luxury in the collection's own blue: pale blue paper, deep teal bars,
hairline rules, Cormorant Garamond for display, Inter for everything small.

Tokens live in `:root` at the top of `style.css`. They were sampled from the
artwork, not invented — logo `#75CFFC`, banner `#5EACC2`, the four teal pieces
`#55A8AE`.

**The bar is `#1C6B82`, not the logo blue, and that is deliberate.** White text
on the logo's `#75CFFC` is 1.7:1 — unreadable. Deepening the same hue gets white
to 6:1. If you change `--night`, re-check it; the verification script asserts it.

Every text/background pair clears WCAG AA (4.5:1):

| Pair | Ratio |
|---|---|
| white on `--night` | 6.04:1 |
| `--ink` on `--paper` | 14.79:1 |
| `--ink-2` on `--paper` | 5.94:1 |
| `--ink-3` on `--paper` | 4.85:1 |
| `--brass` on `--paper` | 4.76:1 |

House rules:

- Borders are `1px` and nothing else. No shadows, no border radius.
- `--brass` is for hairlines and small marks only — never a fill.
- Hover is an opacity shift or a hairline darkening. Nothing moves.
- Both pages are `lang="en"`. Keep it that way — CSS `text-transform:
  uppercase` under `lang="tr"` turns "REGISTER" into "REGİSTER".

## Social links

`SOCIAL` in `data.js` drives the X and Discord marks in the masthead and footer:

```js
const SOCIAL = [
  { name: "X",       url: null },
  { name: "Discord", url: null },
];
```

`url: null` renders an inert symbol — present, dimmed, navigating nowhere,
because the accounts are not open yet. **To switch one on, set its `url`.** It
becomes a real link with no markup change. Never substitute `url: "#"`; that
produces a link that reloads the page.

## Deploying

- **GitHub Pages** — Settings › Pages › this branch, root directory.
  `.nojekyll` is already present so `assets/` is served untouched.
- **Vercel / Netlify** — framework "Other", no build command, output is the
  root directory.

## Note on `README.md`

The repository root `README.md` is the GitHub **profile** README and has
nothing to do with this site. Leave it alone.
