// Datele initiale si valorile permise
const aparate = [
  { id: 1, nume: "Presa pentru picioare", functional: true, grupa: "legs" },
  { id: 2, nume: "Aparat pentru fluturari la piept", functional: false, grupa: "push" },
  { id: 3, nume: "Helcometru", functional: true, grupa: "pull" }
];

const GRUPE = ["push", "pull", "legs"];

// 1. Listarea aparatelor (map)
function listeazaAparate(lista) {
  return lista.map((a) => a.nume);
}

// 2. Numararea elementelor functionale (filter)
function numaraFunctionale(lista) {
  return lista.filter((a) => a.functional).length;
}

// 3. Cautarea dupa nume
function cautaDupaNume(lista, text) {
  return lista.filter((a) => a.nume.toLowerCase().includes(text.toLowerCase()));
}

// Functie ajutatoare pentru id (reduce)
function nextId(lista) {
  return lista.reduce((max, a) => Math.max(max, a.id), 0) + 1;
}

// 4. Adaugarea unui element cu validare
function adaugaAparat(lista, nume, grupa) {
  const numeCurat = nume.trim();

  if (numeCurat === "") {
    console.log("Eroare validare: Numele aparatului nu poate fi gol.");
    return lista;
  }

  if (!GRUPE.includes(grupa)) {
    console.log(`Eroare validare: Grupa musculara invalida (${grupa}).`);
    return lista;
  }

  const nouAparat = {
    id: nextId(lista),
    nume: numeCurat,
    functional: true,
    grupa: grupa
  };

  return [...lista, nouAparat];
}

// 5. Comutarea starii
function comutaStare(lista, id) {
  return lista.map((a) => (a.id === id ? { ...a, functional: !a.functional } : a));
}

// 6. Stergerea
function stergeAparat(lista, id) {
  return lista.filter((a) => a.id !== id);
}

// =====================================
// TESTE PENTRU CONSOLA BROWSERULUI
// =====================================
console.log("--- Citire ---");
console.log("Aparate:", listeazaAparate(aparate).join(", "));
console.log("Functionale:", numaraFunctionale(aparate));
console.log("Cautare 'aparat':", listeazaAparate(cautaDupaNume(aparate, "aparat")).join(", "));

console.log("--- Adaugare ---");
let lista = adaugaAparat(aparate, "Aparat extensii", "legs");
console.log("Lista noua:", lista.length, "aparate");
console.log("Originalul a ramas cu:", aparate.length, "aparate");

console.log("--- Modificare si stergere ---");
lista = comutaStare(lista, 1);
console.log("Dupa stricarea aparatului id 1, functionale:", numaraFunctionale(lista));
lista = stergeAparat(lista, 3);
console.log("Dupa stergerea id 3:", listeazaAparate(lista).join(", "));

console.log("--- Validare ---");
adaugaAparat(lista, "   ", "push");
adaugaAparat(lista, "Banda alergare", "cardio");