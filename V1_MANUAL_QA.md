# F.A.R.T. Version 1 Manual QA

This is the short human test pass before calling Version 1 launch-ready.

## 1. Refresh / Load
- Hard refresh the GitHub Pages app.
- Confirm the cover opens normally.
- Confirm an existing player name/save still loads.
- Confirm Home shows the five games plus G.A.M.E., Passport, Journal, Stickers, and Settings navigation.

## 2. Passport
- Open Passport.
- Confirm the state dropdown contains states from Alabama through Wyoming.
- Use the dropdown to jump to at least: Alabama, Alaska, California, Florida, Hawaii, Maine, Pennsylvania, Texas, Washington, and Wyoming.
- Confirm each page shows: Nickname, Capital, Statehood, Bird, Flower, Fun Fact.
- Confirm the left/right arrows still change states.
- Stamp one previously uncollected state.
- Confirm it immediately changes to `✅ Stamp Collected`.
- Leave Passport, return, and confirm the stamp is still collected.
- Try the same state again and confirm no duplicate reward is possible.

## 3. Rewards
Before stamping a new state, note XP and Road Tokens on G.A.M.E.

After one new stamp, confirm:
- XP increases by 10.
- Road Tokens increase by 1.
- States Collected increases by 1.

## 4. G.A.M.E.
Confirm Milestones lists:
- State Hopper - 5
- Street Sweeper - 10
- Road Hog - 20
- Cross-Country Cruiser - 25
- Highway Man - 30
- Interstate Master - 40
- Great American Road Trip - 50

Confirm Extras shows Cartographer's Pencil progress.

## 5. Games
Play enough of each to confirm controls still respond:
- Tic-Tac-Toe
- Hangman
- Dots & Boxes
- 20 Questions
- Rock Paper Scissors

Check that returning to Home still works after each game.

## 6. Existing Screens
Open and return from:
- Journal
- Sticker Book
- Settings

Confirm the Journal now describes Passport progress as a Version 1 feature rather than "Coming Later".

## 7. Layout
Do a quick visual check on available devices:
- Phone
- Tablet
- Desktop/browser

Look especially for:
- clipped buttons
- text running off cards
- Passport dropdown too wide/narrow
- milestone card overflow
- top navigation buttons wrapping badly

## 8. Launch Decision
If the above passes, the remaining product decision is scope:
- Ship the current Passport/achievement-focused Version 1, with Landmarks and expanded collectible Sticker Catalog in V1.x; or
- Hold launch and wire those larger systems into V1.0.
