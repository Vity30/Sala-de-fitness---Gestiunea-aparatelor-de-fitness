# Sala-de-fitness---Gestiunea-aparatelor-de-fitness
Aplicatia gestioneaza inventarul aparatelor dintr-o sală de fitness. Permite urmarirea starii de mentenanta si organizarea echipamentelor pe grupe musculare.

## Data model
| Field | Type | Notes |
| --- | --- | --- |
| Nume aparat | text | required, max 100 chars |
| Stare | boolean | toggled from the list, default false |
| Grupă musculară | fixed values | Push, Pull, Legs |
| Zona din sală | relation | Greutăți libere, Cabluri, Cardio |
| Responsabil tehnic | relation | the owner of the item (from week 11) |

Sample data used across all stages:
1. Presa pentru picioare, activ, Legs
2. Aparat pentru fluturari la piept, mentenanță, Push
3. Helcometru, activ, Pull

## AI usage
| Tool | Used for |
| --- | --- |
| TBD | TBD |

Details per stage: see the `ai-log/` folder.

## How to run
Open `index.html` in a browser. No build step, no server.

## Status
- [x] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript