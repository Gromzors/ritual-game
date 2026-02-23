# RITUAL — Card Style Guide v1
*Last updated: February 2026*
*Status: Approved — use this as the reference for all card rendering*

---

## Overview

RITUAL cards are rendered in HTML/CSS using a single-variable scaling system. Every dimension, font size, border, and spacing value is derived from one CSS custom property: `--card-w`. Change that one value and the entire card scales proportionally. No other values need to be touched.

---

## Card Dimensions

| Property | Value |
|---|---|
| Aspect ratio | 2.5 : 3.5 (standard poker card) |
| Width : Height ratio | 1 : 1.4 |
| Height formula | `calc(var(--card-w) * 1.4)` |
| Border radius | `calc(var(--u) * 3.5)` |
| Card border | `0.9u solid #5E5C5D` (via box-shadow outline) |

**Reference sizes used in the prototype:**

| Context | `--card-w` | Card height | Notes |
|---|---|---|---|
| Detail view (draft panel) | 280px | 392px | Primary reading size |
| Hand / list view | 160px | 224px | Secondary, rules still visible |
| Battlefield / mini | 100px | 140px | Rules not expected to be read |

---

## The `--u` Unit System

```css
.ritual-card {
  --card-w: 280px;
  --card-h: calc(var(--card-w) * 1.4);
  --u: calc(var(--card-w) / 100);
}
```

`--u` is exactly 1% of the card width. All internal measurements use multiples of `--u` so everything scales together. Think of it like a percentage system local to the card.

**Example:** `calc(var(--u) * 7)` = 7% of card width = 19.6px at 280px card width.

---

## Colors

| Element | Hex | Opacity | Notes |
|---|---|---|---|
| Bounding box borders | `#5E5C5D` | 100% | All structural borders |
| Cost circle background | `#E9E9E9` | 100% | Essence and sanity both |
| Name bar background | `#E9E9E9` | 84% | `rgba(233,233,233,0.84)` |
| Type bar background | `#E9E9E9` | 84% | Same as name bar |
| Rules box background | `#E9E9E9` | 84% | Same as name bar |
| Essence cost text | `#5F5C5D` | 100% | |
| Sanity cost text | `#8A1CD8` | 100% | Purple, Forbidden cards only |
| Name text | `#5F5C5D` | 100% | |
| Type text | `#5F5C5D` | 100% | |
| Rules text | `#000000` | 100% | Pure black |
| Minion HP text | `#7F1D10` | 100% | Dark red |

---

## Typography

### Fonts

Google Fonts is unreliable in sandboxed/offline environments. Use system fonts only.

| Role | Font | Weight | Notes |
|---|---|---|---|
| Cost (essence) | `'Arial Black', Arial, sans-serif` | 900 | Replaces Amaranth Bold 18pt |
| Cost (sanity) | `'Arial Black', Arial, sans-serif` | 900 | Same font, different color |
| Card name | `'Arial Black', 'Arial Bold', Arial, sans-serif` | 900 | Replaces Amaranth Bold |
| Card type | `'Arial Black', Arial, sans-serif` | 900 | |
| Minion HP | `'Arial Black', Arial, sans-serif` | 900 | |
| Rules text | `'Trebuchet MS', Trebuchet, sans-serif` | 700 | Bold weight |

> **Original spec (physical cards):** Amaranth Bold for cost/name/type, Trebuchet Bold for rules, Arial Black at 20pt for sanity cost. The system font substitutions above match the weight and feel closely enough for digital prototyping.

### Font Sizes (as `--u` multiples)

| Element | `--u` multiplier | At 280px | At 160px | At 100px |
|---|---|---|---|---|
| Essence cost | `× 7.0` | 13.1pt | 7.5pt | 4.7pt |
| Sanity cost | `× 7.5` | 14.0pt | 8.0pt | 5.0pt |
| Card name | `× 6.0` | 11.2pt | 6.4pt | 4.0pt |
| Card type | `× 4.0` | 7.5pt | 4.3pt | 2.7pt |
| Minion HP | `× 7.0` | 13.1pt | 7.5pt | 4.7pt |
| Rules text | `× 5.0` | **10.5pt** | **6.0pt** | **3.8pt** |

> **Approved sizes:** Rules text at 10.5pt (280px) and 6.0pt (160px) is the approved baseline as of v4. Do not reduce these values.

---

## Card Structure & Layout

The card uses **absolute positioning** for the art, cost circle, and faction icon, and a **flex column overlay** for the name bar, type bar, spacer, and rules box.

```
┌─────────────────────────────────┐
│ [cost]  NAME BAR (full width)   │  ← rgba bg, full width
│         TYPE BAR        [TYPE X]│  ← rgba bg, RIGHT THIRD only
│ [icon]                          │
│         ART (full bleed)        │  ← fills entire card behind overlay
│                                 │
│                                 │
│                                 │
├─────────────────────────────────┤
│ RULES TEXT BOX (full width)     │  ← rgba bg
└─────────────────────────────────┘
```

### Layer order (z-index)

| Layer | z-index | Element |
|---|---|---|
| Bottom | — | Full bleed art (`position: absolute, inset: 0`) |
| Middle | 10 | Overlay flex column (name bar, type bar, rules box) |
| Above | 20 | Faction icon square |
| Top | 30 | Cost circle |

---

## Element Specifications

### Cost Circle

```css
position: absolute;
top:    calc(var(--u) * 1.5);
left:   calc(var(--u) * 2);
width:  calc(var(--u) * 14);
height: calc(var(--u) * 14);
border-radius: 50%;
background: #E9E9E9;
border: calc(var(--u) * 0.9) solid #5E5C5D;
z-index: 30;
```

- Positioned in the top-left, slightly inside the card edge
- Overlaps the name bar — the name bar has left-padding to clear it
- Essence cost: text color `#5F5C5D`
- Sanity cost (Forbidden cards): text color `#8A1CD8`, same circle background

### Name Bar

```css
/* Full width of the card */
background: rgba(233,233,233,0.84);
border-bottom: calc(var(--u) * 0.7) solid #5E5C5D;
height: calc(var(--u) * 14);
padding-left:  calc(var(--u) * 17);   /* clears the cost circle */
padding-right: calc(var(--u) * 3);
```

- Left padding of `17u` creates clearance for the cost circle
- Text is single-line, `text-overflow: ellipsis` for long names

### Type Bar

```css
/* RIGHT THIRD of the card only */
align-self: flex-end;
width: calc(var(--u) * 33.33);
background: rgba(233,233,233,0.84);
border-bottom: calc(var(--u) * 0.7) solid #5E5C5D;
border-left:   calc(var(--u) * 0.7) solid #5E5C5D;
height: calc(var(--u) * 10);
padding: 0 calc(var(--u) * 3);
justify-content: flex-end;
```

- Spans only the rightmost 33.33% of the card
- Has a left border to terminate cleanly against the open art area
- For **Minions**: contains type label left + HP value right (HP in `#7F1D10`)
- For **Actions / Devices / Forbidden**: type label only, right-aligned

### Faction Icon

```css
position: absolute;
top:  calc(var(--u) * 25);    /* just below both header bars */
left: calc(var(--u) * 2.5);
width:  calc(var(--u) * 17);
height: calc(var(--u) * 17);
border: calc(var(--u) * 0.8) solid #5E5C5D;
border-radius: calc(var(--u) * 1.5);
z-index: 20;
```

- Square with slightly rounded corners
- Positioned top-left of the art area, below the header rows
- Contains the faction color icon image (see Faction Assets below)

### Art

```css
position: absolute;
inset: 0;
width: 100%;
height: 100%;
object-fit: cover;
object-position: center center;
```

- Full bleed, covers the entire card behind all overlays
- `object-fit: cover` ensures no distortion at any card size

### Rules Box

```css
/* Anchored to the bottom via the flex spacer above it */
background: rgba(233,233,233,0.84);
border-top: calc(var(--u) * 0.7) solid #5E5C5D;
padding: calc(var(--u) * 3.5) calc(var(--u) * 4);
min-height: calc(var(--u) * 31);    /* ~87px at 280px card width */
```

- `min-height` of `31u` gives short rules room to breathe
- For cards with very long rules text, the box expands naturally
- Rules text line-height: `1.45`

---

## Faction Assets

Each faction has a square color icon image used in the faction icon slot.

| Faction | Color | Icon File |
|---|---|---|
| Gilded | `#c8922a` (gold) | `GildedYellowcirclecolor.png` |
| Oblique | `#7878a0` (gray-blue) | `ObliqueBluesquarecolor.png` |
| Infernal | `#b82838` (dark red) | `InfernalRedtrianglecolor.png` |
| Wretched | `#307030` (green) | `WretchedGreendiamondcolor.png` |
| Forbidden | `#7a3ae8` (purple) | `ForbiddenPurplespiralcolor.png` |
| Device | `#306878` (teal) | `Devicecogcolor.png` |

---

## Card Types & Their Differences

| Card Type | Cost Type | Cost Color | HP shown | Type Bar content |
|---|---|---|---|---|
| Minion | Essence | `#5F5C5D` | Yes | `Minion` + HP (right) |
| Action | Essence | `#5F5C5D` | No | `Action` |
| Device | Essence | `#5F5C5D` | No | `Device` |
| Forbidden Action | Sanity | `#8A1CD8` | No | `Forbidden` |

---

## Minimal Reproduction Template

This is the minimum HTML needed to render one card correctly. Drop in `--card-w` and the card data.

```html
<style>
.ritual-card {
  --card-w: 280px;
  --card-h: calc(var(--card-w) * 1.4);
  --u: calc(var(--card-w) / 100);

  width: var(--card-w);
  height: var(--card-h);
  position: relative;
  border-radius: calc(var(--u) * 3.5);
  overflow: hidden;
  background: #e8e4df;
  box-shadow: 0 0 0 calc(var(--u) * 0.9) #5E5C5D, 0 8px 28px rgba(0,0,0,0.7);
}
.rc-art {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center center;
}
.rc-cost {
  position: absolute;
  top: calc(var(--u) * 1.5); left: calc(var(--u) * 2);
  width: calc(var(--u) * 14); height: calc(var(--u) * 14);
  border-radius: 50%;
  background: #E9E9E9; border: calc(var(--u) * 0.9) solid #5E5C5D;
  display: flex; align-items: center; justify-content: center;
  z-index: 30;
}
.rc-cost-val {
  font-family: 'Arial Black', Arial, sans-serif; font-weight: 900;
  font-size: calc(var(--u) * 7); color: #5F5C5D; line-height: 1;
}
.rc-cost.is-sanity .rc-cost-val { font-size: calc(var(--u) * 7.5); color: #8A1CD8; }
.rc-faction-icon {
  position: absolute;
  top: calc(var(--u) * 25); left: calc(var(--u) * 2.5);
  width: calc(var(--u) * 17); height: calc(var(--u) * 17);
  border: calc(var(--u) * 0.8) solid #5E5C5D;
  border-radius: calc(var(--u) * 1.5); overflow: hidden; z-index: 20;
}
.rc-faction-icon img { width: 100%; height: 100%; object-fit: cover; }
.rc-overlay {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; z-index: 10;
}
.rc-spacer { flex: 1; }
.rc-name-bar {
  background: rgba(233,233,233,0.84);
  border-bottom: calc(var(--u) * 0.7) solid #5E5C5D;
  display: flex; align-items: center;
  padding-left: calc(var(--u) * 17); padding-right: calc(var(--u) * 3);
  height: calc(var(--u) * 14); flex-shrink: 0;
}
.rc-name {
  font-family: 'Arial Black', Arial, sans-serif; font-weight: 900;
  font-size: calc(var(--u) * 6); color: #5F5C5D;
  line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.rc-type-bar {
  align-self: flex-end; width: calc(var(--u) * 33.33);
  background: rgba(233,233,233,0.84);
  border-bottom: calc(var(--u) * 0.7) solid #5E5C5D;
  border-left: calc(var(--u) * 0.7) solid #5E5C5D;
  display: flex; align-items: center; justify-content: flex-end;
  gap: calc(var(--u) * 2.5); padding: 0 calc(var(--u) * 3);
  height: calc(var(--u) * 10); flex-shrink: 0;
}
.rc-type {
  font-family: 'Arial Black', Arial, sans-serif; font-weight: 900;
  font-size: calc(var(--u) * 4); color: #5F5C5D; line-height: 1;
}
.rc-hp {
  font-family: 'Arial Black', Arial, sans-serif; font-weight: 900;
  font-size: calc(var(--u) * 7); color: #7F1D10; line-height: 1;
}
.rc-rules-box {
  background: rgba(233,233,233,0.84);
  border-top: calc(var(--u) * 0.7) solid #5E5C5D;
  padding: calc(var(--u) * 3.5) calc(var(--u) * 4);
  min-height: calc(var(--u) * 31);
  display: flex; align-items: flex-start; flex-shrink: 0;
}
.rc-rules {
  font-family: 'Trebuchet MS', Trebuchet, sans-serif; font-weight: 700;
  font-size: calc(var(--u) * 5.0); color: #000; line-height: 1.45;
}
</style>

<!-- ESSENCE CARD (Minion example) -->
<div class="ritual-card" style="--card-w: 280px">
  <img class="rc-art" src="[ART_IMAGE]" alt="">
  <div class="rc-cost"><span class="rc-cost-val">3</span></div>
  <div class="rc-faction-icon"><img src="[FACTION_ICON]" alt=""></div>
  <div class="rc-overlay">
    <div class="rc-name-bar"><span class="rc-name">Card Name</span></div>
    <div class="rc-type-bar">
      <span class="rc-type">Minion</span>
      <span class="rc-hp">2</span>   <!-- remove for non-Minions -->
    </div>
    <div class="rc-spacer"></div>
    <div class="rc-rules-box"><p class="rc-rules">Rules text goes here.</p></div>
  </div>
</div>

<!-- FORBIDDEN CARD (no HP, sanity cost) -->
<div class="ritual-card" style="--card-w: 280px">
  <img class="rc-art" src="[ART_IMAGE]" alt="">
  <div class="rc-cost is-sanity"><span class="rc-cost-val">-2</span></div>
  <div class="rc-faction-icon"><img src="[FACTION_ICON]" alt=""></div>
  <div class="rc-overlay">
    <div class="rc-name-bar"><span class="rc-name">Card Name</span></div>
    <div class="rc-type-bar"><span class="rc-type">Forbidden</span></div>
    <div class="rc-spacer"></div>
    <div class="rc-rules-box"><p class="rc-rules">Rules text goes here.</p></div>
  </div>
</div>
```

---

## Art File Naming Convention

Card art files use camelCase matching the card ID:

| Card ID (snake_case) | Art filename (camelCase) |
|---|---|
| `gilded_pact_cultist` | `gildedPactCultist.png` |
| `dark_omen` | `darkOmen.png` |
| `cast_into_the_pit` | `castIntoPit.png` |
| `eater_of_souls` | `eaterSouls.png` |

> **Known exceptions:** `darklameDemon.png` (should be `darkflameDemon.png`) and `unwllingSacrifice.png` (should be `unwillingSacrifice.png`) — filenames have typos but art is correctly mapped in code.

---

## Key Design Decisions & Rationale

**Why `--u` units instead of `rem` or `%`?**
Card sizing needs to be self-contained — a card at 100px wide on the battlefield and 280px in the detail panel must both look correct without any external context. `--u` units give each card instance its own internal coordinate system.

**Why system fonts instead of Amaranth?**
Google Fonts is blocked in sandboxed rendering environments (Claude artifacts, offline use). Arial Black is a close match for Amaranth Bold's heavy weight and is universally available.

**Why `min-height` on the rules box instead of a fixed height?**
Cards with short rules text (e.g. "Draw 1.") need the box to not look cavernous. Cards with long rules text (118 chars, Infernal Sign) need it to expand. `min-height: 31u` handles both.

**Why is the type bar only the right third?**
This matches the physical card design from the reference images (BC1_2.png, FR1.png) and leaves the left two-thirds of that row open so the faction icon and art can breathe without being obscured.

---

*End of style guide*
