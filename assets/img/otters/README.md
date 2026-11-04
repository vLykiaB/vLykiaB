# Koleksiyon görselleri

Gerçek görselleri bu klasöre koyun:

```
assets/img/otters/01.png   →  Otter #1  White Knit
assets/img/otters/02.png   →  Otter #2  Navy Knit
...
assets/img/otters/10.png   →  Otter #10 The Desk
```

Sonra `assets/js/data.js` içinde ilgili parçanın `img` alanını doldurun:

```js
{ id: 1, name: "White Knit", ..., img: "assets/img/otters/01.png" }
```

`img` boş bırakıldığı sürece site, `assets/js/otter.js` içindeki prosedürel
SVG çizimini yer tutucu olarak kullanır.

**Öneri:** kare (1:1), en az 1200×1200, PNG veya WebP.

## Logolar

- `assets/img/logo-square.png` — üç su samuru + OTTR kare logo
- `assets/img/banner.png` — iki su samuru + OTTR yatay banner
