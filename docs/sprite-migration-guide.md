# RITUAL — Sprite Sheet Migration Guide
*Replacing base64 / individual art/ PNGs with sprite sheets*

---

## Repository Structure

```
ritual-game/
├── assets/
│   ├── card_art_sprite_sheet.webp    ← 56 card arts, 8×7 grid, 126×172px cells
│   ├── faction_sprite_sheet.webp     ← 6 faction icons, 3×2 grid, 448×448px cells
│   ├── card-art-sprite-manifest.json ← human-readable position reference
│   └── faction-sprite-manifest.json  ← human-readable position reference
├── scripts/
│   └── sprites.js                    ← the helper (include in every prototype)
└── prototypes/
    ├── ritual-winston-draft-v1.html
    └── ritual-duel-v2.html
```

---

## What Changes in the HTML Files

### 1. Add the script tag (in `<head>`)

```html
<script src="../scripts/sprites.js"></script>
```

Or inline the entire sprites.js content in a `<script>` block if you want a
single-file prototype with no external dependencies (other than the webp files).

---

### 2. Replace the ART lookup object

**Remove** the entire `const ART = { ... }` block (~60 lines):
```js
// DELETE THIS
const ART = {
  bone_wizard: 'art/boneWizard.png',
  burial: 'art/burial.png',
  // ... 54 more lines
};
```

**Remove** the FACTION_ICONS / ICONS object too:
```js
// DELETE THIS
const FACTION_ICONS = {
  gilded:   'art/GildedYellowcirclecolor.png',
  // ...
};
```

No replacement needed — `sprites.js` handles all lookups.

---

### 3. Update `buildRitualCard()` — Art element

**Old** (uses `<img>` with a file path):
```js
if (artSrc) {
  var img = document.createElement('img');
  img.className = 'rc-art';
  img.src = artSrc;
  img.alt = '';
  card.appendChild(img);
} else {
  var ph = document.createElement('div');
  ph.className = 'rc-art-ph';
  // ...
}
```

**New** (uses `<div>` with background sprite):
```js
var artKey = SPRITES.cardIdToArtKey(c.id);
var artEl = document.createElement('div');
artEl.className = 'rc-art';
if (artKey) {
  SPRITES.cardArt.applyToElement(artEl, artKey);
} else {
  artEl.className = 'rc-art rc-art-ph';  // fallback placeholder style
}
card.appendChild(artEl);
```

---

### 4. Update `buildRitualCard()` — Faction icon element

**Old** (uses `<img>` inside the faction icon container):
```js
if (iconSrc) {
  var fi = document.createElement('div');
  fi.className = 'rc-faction-icon';
  var fii = document.createElement('img');
  fii.src = iconSrc;
  fii.alt = '';
  fi.appendChild(fii);
  card.appendChild(fi);
}
```

**New** (the container div IS the sprite — no inner img):
```js
var fi = document.createElement('div');
fi.className = 'rc-faction-icon';
SPRITES.faction.applyToElement(fi, c.faction, /* size handled by CSS */);
card.appendChild(fi);
```

> **Note:** The faction icon container already has `width/height: calc(var(--u) * 17)`
> set by CSS. You need to pass those computed pixel values to `applyToElement`, OR
> use the CSS-only approach below.

---

### 5. CSS adjustment for faction icon (preferred approach)

Instead of computing pixel sizes in JS, let CSS handle it by setting the
background directly via a CSS variable trick, OR simply make the faction icon
container use `background-*` properties and size itself:

```css
.rc-faction-icon {
  /* existing styles stay the same */
  position: absolute;
  top: calc(var(--u) * 25); left: calc(var(--u) * 2.5);
  width:  calc(var(--u) * 17);
  height: calc(var(--u) * 17);
  border: calc(var(--u) * 0.8) solid #5E5C5D;
  border-radius: calc(var(--u) * 1.5);
  overflow: hidden;
  z-index: 20;
  /* sprite background properties are set by JS at render time */
  background-repeat: no-repeat;
  background-size: cover;    /* ← simpler than computing exact px for icons */
}
```

Then in JS, just set the faction icon background-image + position using
`background-size: cover` instead of exact pixel math:

```js
var fi = document.createElement('div');
fi.className = 'rc-faction-icon';
var fs = SPRITES.faction.get(c.faction);
if (fs) {
  fi.style.backgroundImage    = "url('assets/faction_sprite_sheet.webp')";
  fi.style.backgroundPosition = (-fs.col * 100) + '% ' + (-fs.row * 100) + '%';
  fi.style.backgroundSize     = '300% 200%';  // 3 cols × 2 rows
}
card.appendChild(fi);
```

This avoids needing to know the rendered pixel size of the icon at build time.

---

### 6. CSS: Change `.rc-art` from `<img>` to `<div>`

The existing `rc-art` CSS targets `img` behavior. Add `div` compatibility:

```css
/* OLD */
.rc-art {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
}

/* NEW — works for both img (if any remain) and div */
.rc-art {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;   /* still works for img */
  background-size: cover;                        /* for div sprite */
  background-position: center;                   /* overridden by sprite JS */
  background-repeat: no-repeat;
}
```

> The JS `applyToElement` will override `background-position` and `background-size`
> with exact sprite values, so the CSS defaults here are just fallbacks.

---

## Quick Reference: Key API Calls

```js
// Card art from snake_case ID (most common — matches your CARDS[] ids)
SPRITES.cardArtCss('gilded_pact_cultist', 160, 224)
// → { backgroundImage, backgroundPosition, backgroundSize, backgroundRepeat }

// Card art from camelCase key
SPRITES.cardArt.cssPosition('gildedPactCultist', 160, 224)

// Apply card art directly to element
SPRITES.cardArt.applyToElement(divEl, 'gildedPactCultist')

// Faction icon CSS (300%/200% background-size trick)
// or use applyToElement with exact pixel sizes
SPRITES.faction.applyToElement(divEl, 'gilded', 48, 48)

// Faction brand color
SPRITES.factionColor('gilded')  // → '#c8922a'

// snake → camelCase conversion only
SPRITES.cardIdToArtKey('gilded_pact_cultist')  // → 'gildedPactCultist'
```

---

## Files to Delete from the Repository

Once migration is complete, the following are no longer needed:

- `art/` folder (all individual `.png` files — 56 card arts + 6 faction icons)
- Any base64-encoded image data blocks inside the HTML files
- The `const ART = {}` and `const FACTION_ICONS = {}` / `const ICONS = {}` blocks

---

## Known Art ID Quirks (preserved from source)

| Card ID | Art key | Issue |
|---|---|---|
| `darkflame_demon` | `darklameDemon` | Typo in original PNG filename |
| `unwilling_sacrifice` | `unwllingSacrifice` | Typo in original PNG filename |

Both are correctly mapped in `sprites.js` — no action needed.
