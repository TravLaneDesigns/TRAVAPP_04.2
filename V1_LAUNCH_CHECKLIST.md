# F.A.R.T. Version 1 Launch Checklist

## V1 Scope Decision
- [x] Feature freeze: Version 1.0 focuses on the five games, Passport, G.A.M.E., Journal, Sticker Book, XP, Road Tokens, state milestones, and Cartographer's Pencil progression.
- [x] Landmarks deferred to V1.x.
- [x] Expanded collectible Sticker Catalog deferred to V1.x; existing achievement/state-milestone stickers remain in V1.0.
- [x] Unlock celebration/notification effects deferred unless needed during final polish.

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
- [x] Live Passport visually approved after 50-state integration

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
- [x] State milestone achievements appear in the live Sticker Book
- [x] Sticker catalog data module created for V1.x expansion
- [x] Mythic catalog data created
- [x] Secret achievement data module created
- [x] State milestone reward data module created
- [x] Farm Friends data supports any 5 of cow/chicken/dog/cat/owl/horse for Barn reward

## Landmarks
- [x] Landmark data module created for V1.x
- [x] Landmark collection deferred to V1.x

## Automated Testing / Deployment
- [x] Validate exactly 50 states and required Passport fields
- [x] Validate milestone sequence (5/10/20/25/30/40/50)
- [x] Validate unique landmark/sticker/secret-achievement IDs
- [x] Validate sticker rarities and Sticker Set references
- [x] Progression smoke tests for milestones
- [x] Progression smoke tests for Cartographer's Pencil tiers
- [x] Progression smoke tests for Coast To Coast
- [x] App integration smoke test for duplicate stamp guard
- [x] App integration smoke test for +10 XP / +1 Road Token state reward
- [x] App integration smoke test for all five game routes, Passport, G.A.M.E., and Sticker Book
- [x] Run validation, progression, and app-integration tests before production build
- [x] Successful GitHub Pages production build after Passport integration
- [x] Production artifact verified to contain full-state Passport and final milestone UI text

## Manual V1 QA
- [ ] Test fresh save in browser
- [x] Existing save survived Passport/state progression upgrade
- [x] Play-test all five games on current production build
- [x] Live Passport / G.A.M.E. visual approval on phone
- [x] Test duplicate state stamp prevention manually
- [x] Confirm XP / Road Token totals after one new stamp
- [ ] Test milestone changes with actual saved progress beyond 5 states
- [ ] Test Sticker Book unlock count after a new milestone
- [x] Phone layout visually approved for Passport/G.A.M.E.
- [ ] Tablet layout
- [ ] Desktop layout
- [ ] Final full-app visual approval

## Post-V1 / Expansion Vault
- Living Map
- Coast-to-Coast drawn route lines
- Landmark collection expansion
- Expanded collectible Sticker Catalog
- Sticker unlock celebrations/notifications
- Rocco's Sticker Swap
- P.O.O.P. daily goals
- Road Trip Crew random events
- Additional sticker sets
- Additional games / F.A.R.T. II
