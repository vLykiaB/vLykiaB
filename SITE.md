# OTTR — Otter Society | Web sitesi

Statik site. Build adımı yok, bağımlılık yok. `index.html`'i açmak yeterli.

## Dosyalar

```
index.html              sayfa iskeleti (bölümler, modal, nav)
assets/css/style.css    tüm stiller — palet en üstte :root içinde
assets/js/data.js       ← İÇERİK BURADA. Tek düzenleme noktası.
assets/js/otter.js      gerçek görsel yokken çizilen prosedürel SVG yer tutucu
assets/js/main.js       arayüz: ızgara, filtre, modal, menü, scroll reveal
assets/img/otters/      koleksiyon görselleri (bkz. içindeki README)
```

## İçerik nasıl değiştirilir

Neredeyse her şey `assets/js/data.js` içinde:

| Değişken | Ne tutuyor |
|---|---|
| `COLLECTION` | isim, zincir, standart, arz, creator fee, OpenSea linki, tagline |
| `WARDROBE` | altı slot ve açıklamaları (`filled: false` → boş slot görünümü) |
| `TIERS` | nadirlik katmanları |
| `OTTERS` | on parça — isim, tier, register, sıra, trait'ler, görsel yolu |
| `ROADMAP` | yol haritası adımları (`status`: `done` / `active` / `next`) |
| `FAQ` | soru-cevaplar |

HTML'e dokunmadan parça ekleyip çıkarabilirsiniz; ızgara, price ladder,
register sayaçları ve filtreler listeden otomatik üretiliyor.

## Gerçek görselleri bağlama

1. Görselleri `assets/img/otters/` içine koyun (kare, en az 1200×1200).
2. `data.js` içinde ilgili parçanın `img` alanını doldurun:
   ```js
   { id: 1, name: "White Knit", ..., img: "assets/img/otters/01.png" }
   ```

`img` boş kaldığı sürece prosedürel SVG çizim gösterilir, yani site hiçbir
aşamada kırık görünmez.

## Yayına alma

- **GitHub Pages** — Settings › Pages › bu branch, kök dizin.
  (`.nojekyll` zaten ekli, `assets/` klasörünün işlenmesini engelliyor.)
- **Vercel / Netlify** — framework "Other", build komutu yok, output kök dizin.

## Palet

Logodan alındı: gök mavisi su (`--sky-*`), krem kabarık harf (`--cream-*`),
sıcak kahve kürk (`--fur`), koyu kahve kontur (`--ink`). Gözlük camlarından
gelen üç vurgu: `--amber`, `--pink`, `--green`. Hepsi `style.css` başındaki
`:root` bloğunda.

## Not

Graph dosyasından gelen veriler (zincir, standart, arz, creator fee, slot
sistemi, register ayrımı, price ladder sırası) birebir kullanıldı. Parçaların
**tek tek trait değerleri** (örn. "Still Water", "Clear Round") ve
blurb metinleri graph'ta yoktu — bunlar doldurulmuş yer tutuculardır ve
gerçek metadata ile değiştirilmelidir.
