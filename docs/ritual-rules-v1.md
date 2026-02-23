# RITUAL — Game Design Document v1
*Last updated: February 2026*
*Status: Early design — rules subject to change through playtesting*

---

## Overview

RITUAL is a 2-player card game in which players draft a deck from a shared pool, then race to empty that deck before their opponent. The first player to attempt a draw with an empty deck wins — completing the ritual. Players must manage two resources, Essence and Sanity, while deploying Minions, Actions, Devices, and Forbidden techniques to accelerate their own progress and disrupt their opponent.

---

## Game Structure

The game is played in two phases:

**Phase 1 — The Winston Draft**
Players build their decks by drafting from a shared pool of 100 cards using the Winston draft format.

**Phase 2 — The Duel**
Players duel using the decks they drafted until one player wins or loses.

---

## Phase 1: The Winston Draft

**Setup**
Shuffle all 100 cards into a single face-down pool. Create 3 face-down piles of 1 card each from the top of the pool. The remaining cards form the draw stack.

**How it works**
Players alternate taking turns as the active drafter. On your turn:

1. Look at Pile 1. You may take it or pass.
   - If you **take** it: add all cards in that pile to your deck. Your turn ends. Replenish that pile with 1 card from the draw stack.
   - If you **pass**: add 1 card from the draw stack to Pile 1 face-down. Move to Pile 2.
2. If you passed Pile 1, look at Pile 2. You may take it or pass (same rules).
3. If you passed Pile 2, look at Pile 3. You may take it or pass (same rules).
4. If you pass all three piles, you must take a single card from the top of the draw stack.

The draft ends when the draw stack is empty and all piles have been taken. Players then shuffle their drafted cards — these become their duel decks.

---

## Phase 2: The Duel

### Zones

| Zone | Description |
|---|---|
| **Deck** | Your remaining cards. The win condition clock. |
| **Hand** | Cards available to play. No maximum hand size. |
| **Battlefield** | Active Minions, Devices, and Essence cards you control. |
| **Discard** | Played Actions, Forbidden Actions, and destroyed/sacrificed permanents. Face-up. |
| **Banish** | Permanently removed cards. Face-down. Cannot be retrieved unless a card specifically says so. |

---

### Resources

**Essence**
The primary resource used to play cards. Essence resets to zero at the start of each turn and is regenerated fresh from your Essence cards each turn.

- Each ready Essence card on your battlefield produces 1 Essence when depleted.
- Essence cards deplete to produce Essence (once per card per turn).
- All Essence cards ready at the start of your turn.
- Unspent Essence does not carry over between turns.

**Sanity**
A secondary resource representing mental stability. Each player begins with 10 Sanity.

- Sanity is only spent to play Forbidden Action cards.
- Sanity does not reset or refresh between turns.
- If your Sanity reaches 0, you lose immediately.

---

### Card Types

**Minion**
A permanent that enters the battlefield and stays until destroyed or sacrificed.

- Has a **Cost** (paid in Essence to play).
- Has a **Life** value (hit points — damaged by card effects).
- May have an **ETB** (Enter the Battlefield) effect that triggers immediately when played.
- May have a **Passive** effect that is always active while on the battlefield.
- May have a **Depletion** ability (not in v1 — reserved for future expansion).
- Can be **sacrificed** for 1 Essence at any time during your main phase, except on the turn it entered the battlefield.
- Minions do **not** attack or block. They are utility pieces.

**Action**
A one-time effect card.

- Has a **Cost** (paid in Essence to play).
- Resolves its effect immediately when played.
- Goes to your discard pile after resolving.
- Can be played as an Essence card instead (see Essence Cards below).

**Forbidden Action**
A powerful effect card that costs Sanity instead of Essence.

- Has a **Sanity Cost** (shown as a negative number, e.g. -3 means costs 3 Sanity).
- Resolves its effect immediately when played.
- Goes to your discard pile after resolving.
- **Cannot** be played as an Essence card.
- Cannot be played if you do not have enough Sanity.

**Device**
A permanent artifact that stays on the battlefield.

- Has a **Cost** (paid in Essence to play).
- May be **passive** (always-on effect), have a **depletion ability**, a **sacrifice ability**, or other activation triggers — varies by card.
- Goes to discard when destroyed or sacrificed.
- **Cannot** be played as an Essence card.

**Essence Card** *(not a printed type — a way of playing any eligible card)*
Any Action or Minion card may be played face-down as an Essence card instead of for its printed effect.

- Counts as 1 Essence source on the battlefield.
- Readies at the start of your turn.
- Deplete it during your main phase to add 1 Essence to your pool.
- Once per turn limit: you may only play one card as an Essence card per turn.
- Devices and Forbidden Actions **cannot** be played as Essence cards.
- Once a card is played as Essence, it permanently loses its original card type and all printed effects. It is no longer a Minion, Action, or Device — it is only an Essence card. It cannot be targeted or affected by anything that references its original type.

---

### Game Start

**First Player**: Determined randomly (coin flip or equivalent) before the game begins.

**Opening Hand**: Both players simultaneously draw 5 cards from their drafted deck before the first turn begins. Neither player draws again at the start of the first turn's Draw Phase unless they have fewer than 5 cards in hand.

---

### Turn Structure

**1. Ready Phase**
All of your depleted cards (Essence cards, Devices with depletion abilities) become ready.

**2. Draw Phase**
Draw cards from your deck until you have 5 cards in hand, or until your deck is empty.
- If your deck reaches 0 cards during this draw, you **win immediately**.
- If you already have 5 or more cards in hand, you draw nothing.

**3. Main Phase**
You may take any of the following actions in any order, as many times as you can afford:

- **Play an Essence card**: Place one card from your hand face-down on the battlefield as an Essence source. Limit once per turn.
- **Deplete an Essence card**: Tap a ready Essence card to add 1 Essence to your pool.
- **Play a Minion**: Pay its Essence cost. Place it on the battlefield. Trigger its ETB effect if any.
- **Play an Action**: Pay its Essence cost. Resolve its effect. Move to discard.
- **Play a Forbidden Action**: Pay its Sanity cost. Resolve its effect. Move to discard.
- **Play a Device**: Pay its Essence cost. Place it on the battlefield.
- **Sacrifice a Minion**: Move a Minion you control (that did not enter this turn) to your discard. Gain 1 Essence.
- **Activate a Device**: Use a Device's ability if it has an activation cost or trigger.

**4. End Phase**
Pass priority to your opponent. Their turn begins.

---

### Win & Loss Conditions

**Win**: At the start of your Draw Phase, if your deck has 0 cards, you win. The ritual is complete.

**Lose**: If your Sanity reaches 0 at any point, you lose immediately.

---

### Key Terms Glossary

| Term | Meaning |
|---|---|
| **ETB** | Enter the Battlefield — triggers when a Minion is played |
| **Deplete** | Tap/exhaust a card to use its effect or produce Essence |
| **Ready** | Untap — happens at the start of your turn |
| **Banish** | Remove from game permanently (face-down, inaccessible) |
| **Sacrifice** | Voluntarily destroy a permanent you control for an effect or Essence |
| **Discard (verb)** | Send a card from hand to your discard pile |
| **Discard (noun)** | The face-up pile of used/destroyed cards |

---

### Card Color / Faction Guide

Based on the current card set, the following faction identities are present:

| Color | Faction | Identity |
|---|---|---|
| Yellow/Gold | **Gilded** | Sacrifice synergies, death triggers, drawing from dying minions |
| Gray | **Oblique** | Hand manipulation, stealing, information, bounce effects |
| Dark Red | **Infernal** | Discard synergies, damage, forced discards |
| Green | **Wretched** | Graveyard disruption, minion flooding, opponent discard hate |
| Purple/Dark | **Forbidden** | Sanity costs, banish effects, void manipulation |
| Neutral | **Devices** | Artifacts — Essence generation, passive effects, utility |

---

## Open Design Questions
*To be resolved through playtesting*

- [x] ~~Do Minions with passive effects that reference "more minions than opponent" count Essence cards toward that total?~~ **Resolved: No. Essence cards lose their Minion type entirely and are never counted as Minions.**
- [ ] When a card effect says "draw," does that trigger the win condition if it empties your deck mid-turn?
- [ ] What happens if both players would reach 0 Sanity or empty their deck simultaneously?
- [ ] Depletion abilities on Minions — reserved for v2, needs design.
- [ ] Starting hand size and who goes first — not yet defined.

---

*End of Document*
