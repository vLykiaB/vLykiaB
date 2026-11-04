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

Quiet luxury: bone paper, hairline rules, Cormorant Garamond for display, Inter
for everything small. The artwork supplies the only colour on the page.

Tokens live in `:root` at the top of `style.css`. House rules:

- Borders are `1px` and nothing else. No shadows, no border radius.
- `--brass` is for hairlines and small marks only — never a fill.
- Hover is an opacity shift or a hairline darkening. Nothing moves.
- Both pages are `lang="en"`. Keep it that way — CSS `text-transform:
  uppercase` under `lang="tr"` turns "REGISTER" into "REGİSTER".

## Deploying

- **GitHub Pages** — Settings › Pages › this branch, root directory.
  `.nojekyll` is already present so `assets/` is served untouched.
- **Vercel / Netlify** — framework "Other", no build command, output is the
  root directory.

## Note on `README.md`

The repository root `README.md` is the GitHub **profile** README and has
nothing to do with this site. Leave it alone.
