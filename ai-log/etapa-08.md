# Stage 8: AI log

## Tools
- Claude

## Conversations
[https://claude.ai/chat/d57addef-b220-4c7d-8b0c-76d865635a12] (React Router, pagina de detaliu, CSS Modules, restilizare si detalii pentru aparate)

## Key requests
### 1. Rutele si layout-ul comun
- Asked: Impartirea aplicatiei in pagini cu React Router, dupa ghidul Etapei 8, adaptat la resursa `aparate`.
- Got: `BrowserRouter` in `main.jsx`, harta rutelor in `App.jsx` (`/`, `/aparate/:id`, `/despre`, `*`), componenta `Layout` cu `NavLink` si `Outlet`, si paginile `AparatePage`, `DesprePage`, `NotFoundPage`.
- Changed or rejected: Am pastrat titlul mare in antetul comun si am mutat contorul si bara de progres pe pagina listei. Butonul de tema a trecut in `Layout`, ca tema sa ramana aceeasi pe toate paginile. Am adaugat fisierele manual, nu dintr-o arhiva.

### 2. Pagina de detaliu
- Asked: O pagina pentru fiecare aparat, care citeste id-ul din adresa si cere aparatul de la server.
- Got: `AparatDetaliuPage` cu `useParams`, functia `fetchAparat` in `api.js`, mesaj de eroare pentru un id inexistent si titlul din card transformat in link (`item-link`).
- Changed or rejected: Pagina de detaliu facuta cu state in etapele anterioare a fost inlocuita de ruta `/aparate/:id`. Grupele musculare au trecut in `constants.js`, folosit de formular, card si detaliu.

### 3. CSS Modules si temele ca variabile
- Asked: Mutarea stilurilor din `App.css` langa componente si un aspect mai reusit, pastrand tema negru-galben.
- Got: `index.css` cu doua seturi de variabile (tema intunecata si tema luminoasa) si cate un `.module.css` pentru fiecare componenta. Regulile cu `!important` pentru modul luminos au disparut, componentele folosesc doar variabile.
- Changed or rejected: Prima varianta de mod luminos (EcoGym, verde si alb) am respins-o pentru ca trecerea de la tema intunecata era prea brusca pentru ochi. Am ales "Nisip si chihlimbar": fundal de nisip in loc de alb, accent auriu si aceleasi fonturi ca tema intunecata, plus o estompare lina la schimbarea temei.

### 4. Detalii pentru fiecare aparat
- Asked: Ca urmare a feedback-ului profesorului, descrieri mai bune pentru fiecare exercitiu: executie, repetari, greutate (fara video deocamdata).
- Got: Campuri noi in `db.json` pentru toate cele 8 aparate (descriere, tip, nivel, muschi principali si secundari, pasi, respiratie, greseli frecvente, sfat, program pe trei niveluri) si sectiunile corespunzatoare pe pagina de detaliu.
- Changed or rejected: Greutatea este data in procente din 1RM si "repetari in rezerva", nu in kg, pentru ca depinde de fiecare persoana; sub tabel apare o nota explicativa. La banda de alergare programul foloseste durata si intensitatea in loc de serii si greutate.