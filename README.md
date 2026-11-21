# Costa Luna

[![make.fun — gta6-01](https://make.fun/badge/gta6-01.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![rank](https://make.fun/badge/gta6-01/cffilham-jpg/makefun-gta6-01-v11/rank.svg)](https://make.fun/bounty/gta6-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![reward](https://make.fun/badge/gta6-01/cffilham-jpg/makefun-gta6-01-v11/reward.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)

An original coastal crime sandbox built for [make.fun](https://make.fun). Play Maya Solis, a wheelwoman making her own future across six districts of Costa Luna. Ten story contracts, a moving city, named police units, an airborne searchlight, rideable motorcycles, combat, crew skills, and local progression run entirely offline.

Run `node serve.ts`, then open `http://localhost:8080`. No build or runtime downloads required.

WASD/arrows move or drive; E enters/exits vehicles; mouse or F fires; 1–6 selects or purchases weapons; Space brakes or takes cover. Z smoke, X field repair, C eagle eye. M chapters, G garage, J taxi, V vigilante, L delivery, T race, B supplies, R repair. H changes day/night, P changes weather, N toggles synthesized radio. Escape pauses and saves; the pause menu includes volume and weather settings. Saves use localStorage.

The four `?shot=chase`, `shootout`, `night`, and `progress` routes stage live playable moments. Screenshot capture and browser interaction checks are in `capture.mjs`. Three.js r128 is vendored under its MIT license; all game geometry, city, music, characters, interface, and gameplay are original procedural work.

With the server running, `node verify.mjs` checks keyboard movement, vehicle entry, motorcycle riding, combat rewards, all three crew abilities, mission stages, taxi completion, weather, radio controls, and saving in Chromium. `MAKEFUN_OUTPUT_DIR=out node main.ts` packages the game and screenshots with the kit's unchanged dossier builder.
