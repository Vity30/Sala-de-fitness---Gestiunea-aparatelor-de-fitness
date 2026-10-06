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
2. Aparat pentru fluturari lapiept, mentenanță, Push
3. Helcometru, activ, Pull

## AI usage
| Tool | Used for |
| --- | --- |
| Gemini | Generare structura HTML, stilizare CSS (layout flexbox/grid) si suport comenzi Git |

Details per stage: see the `ai-log/` folder.

## How to run
Open `index.html` in a browser. No build step, no server.

## Status
- [x] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript

## Checklist Etapa 1
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S1-R1 | README: description, fields, sample data, how to run | README.md | read |
| S1-R2 | AI usage section | README.md | read |
| S1-R3 | AI log for stage 1 | ai-log/etapa-01.md | read |
| S1-R4 | header, form (text + select), 3 cards with own data | [index.html] (https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/e0bcc7581de0eed179dff015d84574bd4767e36c/index.html#L10-L59) | open the page |
| S1-R5 | finished card looks different | [style.css] (https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/e0bcc7581de0eed179dff015d84574bd4767e36c/style.css#L139-L145) | look at the card |
| S1-R6 | 2 columns on desktop, 1 under 700px | [style.css] (https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/e0bcc7581de0eed179dff015d84574bd4767e36c/style.css#L165-L169) | resize < 700px |
| S1-R7 | visible focus, readable dark theme | [style.css] (https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/blob/e0bcc7581de0eed179dff015d84574bd4767e36c/style.css#L155-L172) | Tab; dark mode |
| S1-R8 | commit "Stage 1" pushed | [link commit] (https://github.com/Vity30/Sala-de-fitness---Gestiunea-aparatelor-de-fitness/commit/e0bcc7581de0eed179dff015d84574bd4767e36c) | commit history |