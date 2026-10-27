# Stage 5: AI log

## Tools
-Gemini

## Conversations
Chat Session (Implementare state local cu useState, funcții imutabile, transmitere props, comutare temă light/dark și stilizare personalizată Black + Neon Lime)

## Key requests
### 1. Migrarea listei în state și funcții de modificare
-Asked: Mutarea array-ului de aparate în useState în App.jsx, implementarea funcțiilor imutabile de comutare (handleToggle) și ștergere (handleDelete), și transmiterea lor prin props.
-Got: Codul complet adaptat pentru App.jsx, AparatList.jsx și AparatCard.jsx respectând formele imutabile cu funcție (prev) => ....
-Changed or rejected: Am scos imaginea din interiorul label-ului în AparatCard.jsx pentru a repara layout-ul flexbox și a elimina spațiile goale excesive de pe carduri.

### 2. Comutarea temei (Light / Dark) și personalizarea vizuală
-Asked: Configurarea butonului de schimbare a temei cu atributul data-theme pe elementul <html> și crearea unei teme luminoase pe stilul "Black + Neon Lime" cu elemente neon și text lizibil.
-Got: Soluția CSS cu variabile și reguli bazate pe html[data-theme="light"], incluzând efecte de hover, culori pentru bife, stări de funcțional/defect și hover-ul personalizat pentru buton.
-Changed or rejected: Am ajustat repetat fundalul și contrastul textelor pentru a asigura vizibilitatea maximă a literelor și a colțurilor panoului, înlocuind nuanțele deschise cu o temă luminoasă bine definită pe fond alb curat cu accente verde neon.