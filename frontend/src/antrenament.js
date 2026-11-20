// Antrenamentul personal se pastreaza in browser (localStorage),
// nu pe server: fiecare utilizator are planul lui.
const CHEIE = "sala-antrenament";
const GOL = { nivel: "Incepator", ids: [] };

export const NIVELURI = ["Incepator", "Intermediar", "Avansat"];

export function citesteAntrenament() {
  try {
    const salvat = JSON.parse(localStorage.getItem(CHEIE));
    if (salvat && Array.isArray(salvat.ids)) {
      return { nivel: NIVELURI.includes(salvat.nivel) ? salvat.nivel : GOL.nivel, ids: salvat.ids };
    }
  } catch {
    // date stricate sau localStorage indisponibil: pornim de la zero
  }
  return GOL;
}

export function salveazaAntrenament(antrenament) {
  try {
    localStorage.setItem(CHEIE, JSON.stringify(antrenament));
  } catch {
    // browserul nu permite salvarea (de exemplu mod privat); planul ramane doar in pagina
  }
}

// Id-urile se compara ca text, ca sa mearga si cu "3" din adresa si cu 3 din server
export function contineAparat(antrenament, id) {
  return antrenament.ids.some((x) => String(x) === String(id));
}

// Adauga aparatul daca lipseste, il scoate daca exista deja
export function comutaAparat(id) {
  const curent = citesteAntrenament();
  const ids = contineAparat(curent, id)
    ? curent.ids.filter((x) => String(x) !== String(id))
    : [...curent.ids, id];
  const nou = { ...curent, ids };
  salveazaAntrenament(nou);
  return nou;
}