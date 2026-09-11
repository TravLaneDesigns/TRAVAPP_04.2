# F.A.R.T. Version 1 Launch Checklist

## Core App
- [x] Home navigation
- [x] Persistent save data
- [x] Journal
- [x] Sticker Book
- [x] Settings
- [x] G.A.M.E. page
- [x] Passport page

## Games
- [x] Tic-Tac-Toe
- [x] Hangman
- [x] Dots & Boxes
- [x] 20 Questions
- [x] Rock Paper Scissors

## Passport
- [x] State selector arrows
- [x] Fast 50-state dropdown selector
- [x] State information format
- [x] Add Stamp button
- [x] Collected-state check
- [x] States Collected counter
- [x] XP reward for first stamp
- [x] Road Token reward for first stamp
- [x] Full 50-state data module created
- [x] Wire full state database into production build
- [x] Confirm production artifact contains the 50-state database
- [ ] Manually verify representative state pages in the live Passport

## State Progression
- [x] State Hopper - 5
- [x] Street Sweeper - 10
- [x] Road Hog - 20
- [x] Cross-Country Cruiser - 25
- [x] Highway Man - 30
- [x] Interstate Master - 40
- [x] Great American Road Trip - 50
- [x] Show 30/40/50 milestones on G.A.M.E. card
- [x] Cartographer's Pencil progression logic
- [x] Cartographer's Pencil status display
- [x] Coast To Coast helper logic

## Rewards / Stickers
- [x] Existing achievement sticker engine
- [x] Sticker catalog data module created
- [x] Mythic catalog data created
- [x] Secret achievement data module created
- [x] State milestone reward data module created
- [x] Farm Friends data supports any 5 of cow/chicken/dog/cat/owl/horse for Barn reward
- [ ] Decide whether expanded collectible Sticker Catalog ships fully wired in V1.0 or V1.x
- [ ] Add optional unlock celebration/notification pass if included in V1.0

## Landmarks
- [x] Landmark data module created
- [ ] Decide whether landmarks ship in V1.0 or V1.x
- [ ] Wire landmark collection if included in V1.0

## Automated Testing / Deployment
- [x] Validate exactly 50 states and required Passport fields
- [x] Validate milestone sequence (5/10/20/25/30/40/50)
- [x] Validate unique landmark/sticker/secret-achievement IDs
- [x] Validate sticker rarities and Sticker Set references
- [x] Progression smoke tests for milestones
- [x] Progression smoke tests for Cartographer's Pencil tiers
- [x] Progression smoke tests for Coast To Coast
- [x] Run validation and progression tests before production build
- [x] Successful GitHub Pages production build after Passport integration
- [x] Production artifact verified to contain full-state Passport and final milestone UI text

## Manual V1 QA
- [ ] Test fresh save in browser
- [ ] Test existing save migration
- [ ] Test all five games
- [ ] Spot-check state data/pages across several regions
- [ ] Test duplicate state stamp prevention
- [ ] Test XP / Road Token totals after stamping
- [ ] Test milestone changes with actual saved progress
- [ ] Test Sticker Book unlock counts
- [ ] Test phone layout
- [ ] Test tablet layout
- [ ] Test desktop layout
- [ ] Final visual approval

## Post-V1 / Expansion Vault
- Living Map
- Coast-to-Coast drawn route lines
- Landmark collection expansion (if deferred)
- Expanded collectible Sticker Catalog (if deferred)
- Rocco's Sticker Swap
- P.O.O.P. daily goals
- Road Trip Crew random events
- Additional sticker sets
- Additional games / F.A.R.T. II
