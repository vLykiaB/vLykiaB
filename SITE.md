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
artwork, not invented — the bar is the logo's exact `#75CFFC`.

**The bar carries dark text, not white, and that is forced.** White on `#75CFFC`
is 1.7:1 and unreadable; one shade darker (`#2585A1`) still fails at 4.24:1.
Only a deep teal takes white, and the brand wanted the light blue — so the text
went dark instead. `--on-bar` and `--on-bar-mut` exist for exactly this; plain
`--ink-2` is only 3.71:1 on the bar and must not be used there.

Every text/background pair clears WCAG AA (4.5:1):

| Pair | Ratio |
|---|---|
| `--ink` on `--paper` | 13.18:1 |
| `--ink-2` on `--paper` | 5.29:1 |
| `--ink-3` on `--paper` | 4.86:1 |
| `--brass` on `--paper` | 4.87:1 |
| `--on-bar` on `--bar` | 9.23:1 |
| `--on-bar-mut` on `--bar` | 5.42:1 |

Paper and bar separate by only 1.43:1, so both bands carry a `--rule-bar`
hairline to stay distinct. Change either colour and re-run the check — it has
caught four real regressions so far.

## The wordmark and the cut-outs

The logo lettering is drawn art, not a typeface. `assets/img/wordmark.webp` is
the real OTTR lettering lifted out of the 2000px square logo: the cream letter
fills were isolated by region-growing (they segment cleanly — four blobs, all
~350px tall), then given a clean stroke in `#2A1410`, sampled from the logo's
own outline. The original outline could not be cut directly because the otters
sit behind the letters and share its colour.

It renders at 620px against a 1486px intrinsic width — 2.4x headroom, so it
stays sharp on a 2x screen. **Do not display it wider than ~740px**; the
verification script fails the build below 2x.

`Otter Society` has no logo artwork, so it is type: Baloo 2 at 800 with
`-webkit-text-stroke` in the same cream and outline.

`assets/img/peek/{03,05,09}.webp` are pieces 3, 5 and 9 flood-filled free of
their flat backgrounds. They are masked with a bottom gradient because the
source art is cropped flat at the chest, which otherwise reads as a sliced
sticker. The layer is `pointer-events: none` and hidden below 860px.

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
