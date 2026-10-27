# Sala-de-fitness---Gestiunea-aparatelor-de-fitness
Aplicatia gestioneaza inventarul aparatelor dintr-o sala de fitness. Permite urmarirea starii de mentenanta si organizarea echipamentelor pe grupe musculare.

## Data model
| Field | Type | Notes |
| --- | --- | --- |
| Nume aparat | text | required, max 100 chars |
| Stare | boolean | toggled from the list, default false |
| Grupa musculara | fixed values | Push, Pull, Legs |
| Zona din sala | relation | Greutati libere, Cabluri, Cardio |
| Responsabil tehnic | relation | the owner of the item (from week 11) |

Sample data used across all stages:
1. Presa pentru picioare, activ, Legs
2. Aparat pentru fluturari la piept, mentenanță, Push
3. Helcometru, activ, Pull

## AI usage
| Tool | Used for |
| --- | --- |
| Gemini | Generare structura HTML, stilizare CSS (layout flexbox/grid), generare logica JavaScript si suport Git |

Details per stage: see the `ai-log/` folder.

## How to run
Open `index.html` in a browser. No build step, no server.
(From Stage 3 on, the app lives in `frontend/`; see "How to run" in the Stage 3 section.)

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
-

---

## Stage 1: Static mockup
HTML layout using Flexbox and CSS dark mode styling. Static interface representing the fitness equipment dashboard.

## Checklist Etapa 1
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S1-R1 | README: description, fields, sample data, how to run | README.md | read |
| S1-R2 | AI usage section | README.md | read |
| S1-R3 | AI log for stage 1 | ai-log/etapa-01.md | read |
| S1-R4 | header, form (text + select), 3 cards with own data | [index.html](https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/e0bcc7581de0eed179dff015d84574bd4767e36c/index.html#L10-L59) | open the page |
| S1-R5 | finished card looks different | [style.css](https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/e0bcc7581de0eed179dff015d84574bd4767e36c/style.css#L139-L145) | look at the card |
| S1-R6 | 2 columns on desktop, 1 under 700px | [style.css](https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/e0bcc7581de0eed179dff015d84574bd4767e36c/style.css#L165-L169) | resize < 700px |
| S1-R7 | visible focus, readable dark theme | [style.css](https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/e0bcc7581de0eed179dff015d84574bd4767e36c/style.css#L155-L172) | Tab; dark mode |
| S1-R8 | commit "Stage 1" pushed | [link commit](https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/commit/408e5358dff9e53082bd0c0c01c328200502e746) | commit history |

---

## Stage 2: Data logic
Plain JavaScript, no DOM. `aparate.js` holds the array and the functions that read and change it. Results are printed in the browser console (F12).

## Checklist Etapa 2
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S2-R1 | JS file linked, logs on page load | [index.html](https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/db5a20a3214dd60c379ae2c87b9a8d9de236a925/index.html#L64) | open page, F12 |
| S2-R2 | 3+ items with id, nume, functional, grupa | [aparate.js](https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/db5a20a3214dd60c379ae2c87b9a8d9de236a925/aparate.js#L2-L6) | read |
| S2-R3 | list, count, search, add, toggle, delete | [aparate.js](https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/db5a20a3214dd60c379ae2c87b9a8d9de236a925/aparate.js#L10-L62) | console output |
| S2-R4 | add rejects empty name and invalid tag | [aparate.js](https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/db5a20a3214dd60c379ae2c87b9a8d9de236a925/aparate.js#L34-L42) | last 2 console lines |
| S2-R5 | original array unchanged after add | [aparate.js](https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/db5a20a3214dd60c379ae2c87b9a8d9de236a925/aparate.js#L72-L75) | console line |
| S2-R6 | README Stage 2 section + AI log | README.md, ai-log/etapa-02.md | read |
| S2-R7 | commit "Stage 2" pushed | [link commit](https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/commit/db5a20a3214dd60c379ae2c87b9a8d9de236a925) | commit history |

---

## Stage 3: Vite and React project

The app now lives in frontend/, built with Vite. The data from stage 2 moved into the main component; the list is still printed raw.

## How to run

```bash
cd frontend
npm install
npm run dev
```

After `npm run dev`, open http://localhost:5173/ in your browser (Vite prints the exact address in the terminal).

## Checklist Etapa 3

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S3-R1 | npm run dev starts without errors | frontend/package.json | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/cf652b105f5c027d94c567709d483cdb987ac07b/frontend/src/App.jsx#L9-L11 | edit data, save |
| S3-R3 | data from README, not from the example | https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/cf652b105f5c027d94c567709d483cdb987ac07b/frontend/src/App.jsx#L2-L7 | compare with README |
| S3-R4 | stage 1 styles reused | frontend/src/App.css | look at the page |
| S3-R5 | node_modules ignored, build passes | frontend/.gitignore | npm run build |
| S3-R6 | README Stage 3 section + AI log | README.md, ai-log/etapa-03.md | read |
| S3-R7 | commit "Stage 3" pushed | https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/commit/cf652b105f5c027d94c567709d483cdb987ac07b | commit history |

---


## Stage 4: components

The gym equipment list is rendered dynamically from the `aparate` array in `App.jsx`, using two React components:

- `AparatList` receives the complete array through props and renders one card for each item.
- `AparatCard` receives a single `aparat` object through props and displays its image, name, system ID, and functional status.
- `AparatList` uses `map()` and `key={aparat.id}` to render the cards.
- An explicit message is displayed when the equipment list is empty.
- The card status and appearance depend on the `functional` property of each item.

## Stage 4 checklist

| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S4-R1 | At least two components in `src/components/` | https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/tree/57dd7a33c9d6660d146f08fb741ffa2e64300e4c/frontend/src/components | Open folder |
| S4-R2 | Card receives data through props | https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/57dd7a33c9d6660d146f08fb741ffa2e64300e4c/frontend/src/components/AparatCard.jsx#L1-L8 | Read component |
| S4-R3 | `map()` + `key={aparat.id}`, no console warnings | https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/57dd7a33c9d6660d146f08fb741ffa2e64300e4c/frontend/src/components/AparatList.jsx#L10-L12 | Open browser Console |
| S4-R4 | Message for an empty list | https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/57dd7a33c9d6660d146f08fb741ffa2e64300e4c/frontend/src/components/AparatList.jsx#L3-L6 | Temporarily set array to `[]` |
| S4-R5 | Changing `functional` changes the card appearance | https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/57dd7a33c9d6660d146f08fb741ffa2e64300e4c/frontend/src/components/AparatCard.jsx#L4-L6 · https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/57dd7a33c9d6660d146f08fb741ffa2e64300e4c/frontend/src/components/AparatCard.jsx#L27-L29 | Toggle `functional` |
| S4-R6 | README Stage 4 section and AI log | https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/57dd7a33c9d6660d146f08fb741ffa2e64300e4c/README.md · https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/57dd7a33c9d6660d146f08fb741ffa2e64300e4c/ai-log/etapa-04.md | Read files |
| S4-R7 | Stage 4 implementation commit published | https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/commit/57dd7a33c9d6660d146f08fb741ffa2e64300e4c | Open commit |

## Stage 5: local state and events

The fitness equipment list is now stored in React state using `useState`. Toggling a machine's functional status and deleting an item work interactively from the page, and the header counters update automatically as derived values. A theme toggle button in the header allows switching between light and dark modes dynamically using `data-theme` on the `<html>` element.

## Stage 5 checklist

| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S5-R1 | list kept in useState, in App | frontend/src/App.jsx | read |
| S5-R2 | toggling changes state and card look | frontend/src/App.jsx, frontend/src/components/AparatCard.jsx | click a checkbox |
| S5-R3 | delete removes the item | frontend/src/App.jsx, frontend/src/components/AparatCard.jsx | click Delete |
| S5-R4 | header counter derived, not in state | frontend/src/App.jsx | toggle, watch header |
| S5-R5 | immutable updates (no push, splice, assignment) | frontend/src/App.jsx | read |
| S5-R6 | light/dark toggle: state + data-theme on html | frontend/src/App.jsx, frontend/src/App.css | click the button |
| S5-R7 | no console warnings; README + AI log | README.md, ai-log/etapa-05.md | F12, Console |
| S5-R8 | commit "Stage 5" pushed | link to the commit | commit history |