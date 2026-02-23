/**
 * RITUAL — Sprite Sheet Helper  v2.0
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles both sprite sheets:
 *
 *   card_art_sprite_sheet.webp   — 1008 × 1204 px, 8 cols × 7 rows, 56 cards
 *                                    cell: 126 × 172 px
 *
 *   faction_sprite_sheet.webp    — 1344 × 896 px, 3 cols × 2 rows, 6 factions
 *                                    cell: 448 × 448 px
 *
 * USAGE — Card Art (CSS, scales to any display size):
 *   const css = SPRITES.cardArt.cssPosition('gildedKnight', 160, 224);
 *   Object.assign(el.style, css);
 *
 * USAGE — Faction Icon (CSS):
 *   const css = SPRITES.faction.cssPosition('gilded', 48, 48);
 *   Object.assign(el.style, css);
 *
 * USAGE — Convenience (snake_case card ID straight to card art CSS):
 *   const css = SPRITES.cardArtCss('gilded_pact_cultist', 160, 224);
 *
 * USAGE — Canvas:
 *   SPRITES.cardArt.drawToCanvas(ctx, cardSheet, 'gildedKnight', x, y, w, h);
 *   SPRITES.faction.drawToCanvas(ctx, factionSheet, 'gilded', x, y, w, h);
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * MIGRATION from individual art/ PNG files
 *
 *   OLD (img tag):
 *     <img class="rc-art" src="art/gildedKnight.png">
 *
 *   NEW (div + sprite):
 *     const artEl = document.createElement('div');
 *     artEl.className = 'rc-art';
 *     SPRITES.cardArt.applyToElement(artEl, 'gildedKnight');
 *     card.appendChild(artEl);
 *
 *   OLD (faction img tag):
 *     <img src="art/GildedYellowcirclecolor.png">
 *
 *   NEW (div + sprite):
 *     const iconEl = document.createElement('div');
 *     iconEl.className = 'rc-faction-icon-bg';
 *     SPRITES.faction.applyToElement(iconEl, 'gilded', 48, 48);
 *     factionIconContainer.appendChild(iconEl);
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── CARD ART SHEET ───────────────────────────────────────────────────────────

var _CARD_SHEET = {
  file: 'assets/card_art_sprite_sheet.webp',
  sheetWidth: 1008,
  sheetHeight: 1204,
  cellWidth: 126,
  cellHeight: 172,
};

// Ordered left-to-right, top-to-bottom across the 8-column × 7-row grid.
var _CARD_DATA = {
  boneWizard:           { row: 0, col: 0 },
  burial:               { row: 0, col: 1 },
  burntOffering:        { row: 0, col: 2 },
  castIntoPit:          { row: 0, col: 3 },
  castIntoVoid:         { row: 0, col: 4 },
  chosenSacrifice:      { row: 0, col: 5 },
  corpseCollector:      { row: 0, col: 6 },
  corruptChalice:       { row: 0, col: 7 },
  corruptedKnowledge:   { row: 1, col: 0 },
  darkEchoes:           { row: 1, col: 1 },
  darklameDemon:        { row: 1, col: 2 },  // filename typo in source art, preserved
  darkOmen:             { row: 1, col: 3 },
  dimensionalHourglass: { row: 1, col: 4 },
  dimensionalShift:     { row: 1, col: 5 },
  eaterSouls:           { row: 1, col: 6 },
  enlistDead:           { row: 1, col: 7 },
  feed:                 { row: 2, col: 0 },
  forbiddenKnowledge:   { row: 2, col: 1 },
  forbiddenSpiral:      { row: 2, col: 2 },
  forsakenArchitect:    { row: 2, col: 3 },
  gildedKnight:         { row: 2, col: 4 },
  gildedPactCultist:    { row: 2, col: 5 },
  gildedProphet:        { row: 2, col: 6 },
  gildedRitual:         { row: 2, col: 7 },
  infernalGrunt:        { row: 3, col: 0 },
  infernalKnight:       { row: 3, col: 1 },
  infernalPactCultist:  { row: 3, col: 2 },
  infernalRitual:       { row: 3, col: 3 },
  infernalSign:         { row: 3, col: 4 },
  investigate:          { row: 3, col: 5 },
  leadAstray:           { row: 3, col: 6 },
  mindwarpMage:         { row: 3, col: 7 },
  obelisk:              { row: 4, col: 0 },
  obliqueHypnotist:     { row: 4, col: 1 },
  obliqueInfiltrator:   { row: 4, col: 2 },
  obliqueManipulator:   { row: 4, col: 3 },
  obliquePactCultist:   { row: 4, col: 4 },
  psychicSabotage:      { row: 4, col: 5 },
  reconstitute:         { row: 4, col: 6 },
  rippedFromTime:       { row: 4, col: 7 },
  ritualDagger:         { row: 5, col: 0 },
  seekerOrb:            { row: 5, col: 1 },
  seekWorthy:           { row: 5, col: 2 },
  spy:                  { row: 5, col: 3 },
  stolenEssence:        { row: 5, col: 4 },
  sunder:               { row: 5, col: 5 },
  temporalRift:         { row: 5, col: 6 },
  unwllingSacrifice:    { row: 5, col: 7 },  // filename typo in source art, preserved
  voidGaze:             { row: 6, col: 0 },
  voidStrike:           { row: 6, col: 1 },
  warpedSimulacra:      { row: 6, col: 2 },
  wretchedBanisher:     { row: 6, col: 3 },
  wretchedCommunion:    { row: 6, col: 4 },
  wretchedDominance:    { row: 6, col: 5 },
  wretchedKnight:       { row: 6, col: 6 },
  wretchedPactCultist:  { row: 6, col: 7 },
};

// ── FACTION ICON SHEET ───────────────────────────────────────────────────────

var _FACTION_SHEET = {
  file: 'assets/faction_sprite_sheet.webp',
  sheetWidth: 1344,
  sheetHeight: 896,
  cellWidth: 448,
  cellHeight: 448,
};

// Row 0: device, forbidden, oblique  |  Row 1: gilded, infernal, wretched
var _FACTION_DATA = {
  device:    { row: 0, col: 0, color: '#306878' },
  forbidden: { row: 0, col: 1, color: '#7a3ae8' },
  oblique:   { row: 0, col: 2, color: '#7878a0' },
  gilded:    { row: 1, col: 0, color: '#c8922a' },
  infernal:  { row: 1, col: 1, color: '#b82838' },
  wretched:  { row: 1, col: 2, color: '#307030' },
};

// ── snake_case card ID → camelCase art key ───────────────────────────────────
// Maps the IDs used in CARDS[] definitions to their sprite sheet art keys.

var _SNAKE_TO_CAMEL = {
  bone_wizard:           'boneWizard',
  burial:                'burial',
  burnt_offering:        'burntOffering',
  cast_into_the_pit:     'castIntoPit',
  cast_into_void:        'castIntoVoid',
  chosen_sacrifice:      'chosenSacrifice',
  corpse_collector:      'corpseCollector',
  corrupt_chalice:       'corruptChalice',
  corrupted_knowledge:   'corruptedKnowledge',
  dark_echoes:           'darkEchoes',
  darkflame_demon:       'darklameDemon',       // typo in source art file preserved
  dark_omen:             'darkOmen',
  dimensional_hourglass: 'dimensionalHourglass',
  dimensional_shift:     'dimensionalShift',
  eater_of_souls:        'eaterSouls',
  enlist_the_dead:       'enlistDead',
  feed:                  'feed',
  forbidden_knowledge:   'forbiddenKnowledge',
  forbidden_spiral:      'forbiddenSpiral',
  forsaken_architect:    'forsakenArchitect',
  gilded_knight:         'gildedKnight',
  gilded_pact_cultist:   'gildedPactCultist',
  gilded_prophet:        'gildedProphet',
  gilded_ritual:         'gildedRitual',
  infernal_grunt:        'infernalGrunt',
  infernal_knight:       'infernalKnight',
  infernal_pact_cultist: 'infernalPactCultist',
  infernal_ritual:       'infernalRitual',
  infernal_sign:         'infernalSign',
  investigate:           'investigate',
  lead_astray:           'leadAstray',
  mindwarp_mage:         'mindwarpMage',
  obelisk:               'obelisk',
  oblique_hypnotist:     'obliqueHypnotist',
  oblique_infiltrator:   'obliqueInfiltrator',
  oblique_manipulator:   'obliqueManipulator',
  oblique_pact_cultist:  'obliquePactCultist',
  psychic_sabotage:      'psychicSabotage',
  reconstitute:          'reconstitute',
  ripped_from_time:      'rippedFromTime',
  ritual_dagger:         'ritualDagger',
  seeker_orb:            'seekerOrb',
  seek_the_worthy:       'seekWorthy',
  spy:                   'spy',
  stolen_essence:        'stolenEssence',
  sunder:                'sunder',
  temporal_rift:         'temporalRift',
  unwilling_sacrifice:   'unwllingSacrifice',  // typo in source art file preserved
  void_gaze:             'voidGaze',
  void_strike:           'voidStrike',
  warped_simulacra:      'warpedSimulacra',
  wretched_banisher:     'wretchedBanisher',
  wretched_communion:    'wretchedCommunion',
  wretched_dominance:    'wretchedDominance',
  wretched_knight:       'wretchedKnight',
  wretched_pact_cultist: 'wretchedPactCultist',
};

// ── SPRITE HELPER FACTORY ────────────────────────────────────────────────────

function _makeSpriteHelper(sheet, data) {
  return {
    /** Raw pixel rect: { x, y, w, h, row, col } */
    get: function(id) {
      var d = data[id];
      if (!d) return null;
      return {
        x: d.col * sheet.cellWidth,
        y: d.row * sheet.cellHeight,
        w: sheet.cellWidth,
        h: sheet.cellHeight,
        row: d.row,
        col: d.col,
      };
    },

    /**
     * CSS background properties to display a sprite at any render size.
     * Apply to a <div> that is sized to (displayW × displayH).
     *
     * @param {string} id
     * @param {number} [displayW]  defaults to native cell width
     * @param {number} [displayH]  defaults to native cell height
     * @returns {{ backgroundImage, backgroundPosition, backgroundSize, backgroundRepeat } | null}
     */
    cssPosition: function(id, displayW, displayH) {
      displayW = displayW || sheet.cellWidth;
      displayH = displayH || sheet.cellHeight;
      var s = this.get(id);
      if (!s) return null;
      var scaleX = displayW / sheet.cellWidth;
      var scaleY = displayH / sheet.cellHeight;
      return {
        backgroundImage:    "url('" + sheet.file + "')",
        backgroundPosition: (-Math.round(s.x * scaleX)) + 'px ' + (-Math.round(s.y * scaleY)) + 'px',
        backgroundSize:     Math.round(sheet.sheetWidth  * scaleX) + 'px ' +
                            Math.round(sheet.sheetHeight * scaleY) + 'px',
        backgroundRepeat:   'no-repeat',
      };
    },

    /** Apply sprite CSS directly to a DOM element */
    applyToElement: function(el, id, displayW, displayH) {
      var css = this.cssPosition(id, displayW, displayH);
      if (!css) { console.warn('SPRITES: unknown id "' + id + '"'); return; }
      el.style.backgroundImage    = css.backgroundImage;
      el.style.backgroundPosition = css.backgroundPosition;
      el.style.backgroundSize     = css.backgroundSize;
      el.style.backgroundRepeat   = css.backgroundRepeat;
    },

    /** Draw onto a canvas context */
    drawToCanvas: function(ctx, sheetImg, id, destX, destY, destW, destH) {
      var s = this.get(id);
      if (!s) { console.warn('SPRITES: unknown id "' + id + '"'); return; }
      ctx.drawImage(sheetImg, s.x, s.y, s.w, s.h, destX, destY, destW, destH);
    },

    /** All IDs in this sheet */
    allIds: function() { return Object.keys(data); },

    sheet: sheet,
  };
}

// ── PUBLIC API ───────────────────────────────────────────────────────────────

var SPRITES = {
  /** Card art helpers — use camelCase art keys */
  cardArt: _makeSpriteHelper(_CARD_SHEET, _CARD_DATA),

  /** Faction icon helpers — use faction names: gilded, oblique, infernal, wretched, forbidden, device */
  faction: _makeSpriteHelper(_FACTION_SHEET, _FACTION_DATA),

  /**
   * Convert snake_case card ID (as in CARDS[]) to camelCase art key.
   * @param {string} snakeId  e.g. 'gilded_pact_cultist'
   * @returns {string|null}   e.g. 'gildedPactCultist'
   */
  cardIdToArtKey: function(snakeId) {
    return _SNAKE_TO_CAMEL[snakeId] || null;
  },

  /**
   * Full convenience: card art CSS from a snake_case card ID.
   * Handles snake→camel internally.
   *
   * @param {string} snakeId  e.g. 'gilded_pact_cultist'
   * @param {number} [displayW]
   * @param {number} [displayH]
   * @returns {object|null}
   */
  cardArtCss: function(snakeId, displayW, displayH) {
    var key = _SNAKE_TO_CAMEL[snakeId];
    if (!key) return null;
    return this.cardArt.cssPosition(key, displayW, displayH);
  },

  /**
   * Faction brand color.
   * @param {string} factionId
   * @returns {string|null}  hex color e.g. '#c8922a'
   */
  factionColor: function(factionId) {
    return (_FACTION_DATA[factionId] || {}).color || null;
  },
};

// CommonJS export (Node / bundlers) — ignored in browser
if (typeof module !== 'undefined') module.exports = { SPRITES };
