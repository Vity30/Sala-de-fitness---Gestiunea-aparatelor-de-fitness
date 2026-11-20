import { useEffect, useState } from "react";
import AparatList from "../components/AparatList.jsx";
import AparatForm from "../components/AparatForm.jsx";
import { createAparat, deleteAparat, fetchAparate, updateAparat } from "../api.js";
import { GRUPE } from "../constants.js";
import { dataAzi } from "../dateUtils.js";
import { useToast } from "../toast.js";
import styles from "./AparatePage.module.css";

// Cum se poate ordona lista
const SORTARI = {
  implicit: () => 0,
  "nume-az": (a, b) => a.nume.localeCompare(b.nume, "ro"),
  "nume-za": (a, b) => b.nume.localeCompare(a.nume, "ro"),
  "functionale-intai": (a, b) => Number(b.functional) - Number(a.functional),
  "defecte-intai": (a, b) => Number(a.functional) - Number(b.functional),
};

// Pagina principala: starea echipamentelor, formularul si lista
export default function AparatePage() {
  const [aparate, setAparate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtru, setFiltru] = useState("toate");
  const [cautare, setCautare] = useState("");
  const [grupaFiltru, setGrupaFiltru] = useState("toate");
  const [sortare, setSortare] = useState("implicit");
  const arataToast = useToast();

  // Cere lista o singura data, la deschiderea paginii
  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await fetchAparate();
        if (!ignore) setAparate(data);
      } catch (err) {
        if (!ignore) {
          setError(`Nu am putut incarca datele: ${err.message}. Ruleaza npm run api?`);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Intai serverul, apoi state-ul; pe ecran ajunge doar ce s-a salvat.
  // Fara try: eroarea ajunge inapoi in formular, care o afiseaza langa campuri.
  async function handleAdd(aparat) {
    const creat = await createAparat({ ...aparat, defectData: dataAzi() });
    setAparate((prev) => [...prev, creat]);
    setError(null);
    arataToast(`"${creat.nume}" a fost adaugat.`);
  }

  // Bifarea se salveaza pe server. Cand aparatul devine defect retinem data,
  // cand e reparat stergem data si nota de mentenanta.
  async function handleToggle(id) {
    const aparat = aparate.find((a) => a.id === id);
    if (!aparat) return;
    const devineFunctional = !aparat.functional;
    const schimbari = devineFunctional
      ? { functional: true, defectData: null, defectNota: null }
      : { functional: false, defectData: dataAzi() };
    try {
      const actualizat = await updateAparat(id, schimbari);
      setAparate((prev) => prev.map((a) => (a.id === id ? actualizat : a)));
      setError(null);
      arataToast(
        devineFunctional
          ? `"${aparat.nume}" este din nou functional.`
          : `"${aparat.nume}" a fost marcat ca defect.`,
        { tip: devineFunctional ? "succes" : "info" }
      );
    } catch (err) {
      setError(`Nu am putut salva modificarea: ${err.message}`);
    }
  }

  // Readuce un aparat sters, cu acelasi id, din butonul "Anuleaza"
  async function restaureaza(aparat) {
    try {
      const refacut = await createAparat(aparat);
      setAparate((prev) => [...prev, refacut].sort((a, b) => Number(a.id) - Number(b.id)));
      arataToast(`"${aparat.nume}" a fost readus in lista.`);
    } catch (err) {
      arataToast(`Nu am putut readuce aparatul: ${err.message}`, { tip: "eroare" });
    }
  }

  // Stergerea se face intai pe server; notificarea ofera 5 secunde pentru "Anuleaza"
  async function handleDelete(id) {
    const sters = aparate.find((a) => a.id === id);
    try {
      await deleteAparat(id);
      setAparate((prev) => prev.filter((a) => a.id !== id));
      setError(null);
      if (sters) {
        arataToast(`"${sters.nume}" a fost sters.`, {
          tip: "info",
          actiune: { eticheta: "Anuleaza", onClick: () => restaureaza(sters) },
        });
      }
    } catch (err) {
      setError(`Nu am putut sterge aparatul: ${err.message}`);
    }
  }

  // Valori derivate pentru contor si bara de progres
  const total = aparate.length;
  const functionale = aparate.filter((a) => a.functional).length;
  const procentaj = total === 0 ? 0 : Math.round((functionale / total) * 100);

  // Cautarea ignora literele mari si mici
  const text = cautare.trim().toLowerCase();
  const aparateAfisate = aparate
    .filter((a) => {
      if (filtru === "functionale" && !a.functional) return false;
      if (filtru === "defecte" && a.functional) return false;
      if (grupaFiltru !== "toate" && a.grupa !== grupaFiltru) return false;
      return text === "" || a.nume.toLowerCase().includes(text);
    })
    .sort(SORTARI[sortare]);

  const existaFiltre = text !== "" || filtru !== "toate" || grupaFiltru !== "toate";

  function reseteazaFiltre() {
    setCautare("");
    setFiltru("toate");
    setGrupaFiltru("toate");
    setSortare("implicit");
  }

  return (
    <>
      <section className={styles.stats} aria-label="Starea echipamentelor">
        <div className={styles.meta}>
          <p className={styles.count}>
            {total} aparate, dintre care {functionale} functionale
          </p>
          <div className={styles.legend}>
            <strong>STATUS:</strong>
            <span className="status-badge ok">✓ FUNCTIONAL</span>
            <span className="status-badge bad">✕ DEFECT</span>
          </div>
        </div>

        <div className={styles.progress}>
          <div className={styles.progressInfo}>
            <span>Stare generala echipamente</span>
            <span>{procentaj}% Functional</span>
          </div>
          <div className={styles.progressBg}>
            <div className={styles.progressFill} style={{ width: `${procentaj}%` }}></div>
          </div>
        </div>
      </section>

      {/* Formularul in stanga, lista in dreapta */}
      <div className={styles.grid}>
        <section className={`panel ${styles.panelForm}`}>
          <div className="panel-header">
            <h2>ADAUGA UN APARAT</h2>
          </div>
          <AparatForm onAdd={handleAdd} />
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>APARATELE DIN SALA</h2>
            <span className={styles.resultCount}>
              {aparateAfisate.length} din {total}
            </span>
          </div>

          {/* Bara de unelte: cautare, filtre si sortare */}
          <div className={styles.toolbar}>
            <label className={styles.search}>
              <span className={styles.searchIcon} aria-hidden="true">⌕</span>
              <input
                type="search"
                value={cautare}
                onChange={(e) => setCautare(e.target.value)}
                placeholder="Cauta dupa nume..."
                aria-label="Cauta un aparat dupa nume"
                data-testid="search"
              />
            </label>

            <select
              value={grupaFiltru}
              onChange={(e) => setGrupaFiltru(e.target.value)}
              aria-label="Filtreaza dupa grupa musculara"
            >
              <option value="toate">Toate grupele</option>
              {GRUPE.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.emoji} {g.label}
                </option>
              ))}
            </select>

            <select
              id="filtru-aparate"
              value={filtru}
              onChange={(e) => setFiltru(e.target.value)}
              aria-label="Filtreaza dupa stare"
            >
              <option value="toate">Orice stare</option>
              <option value="functionale">Doar functionale</option>
              <option value="defecte">Doar defecte</option>
            </select>

            <select
              value={sortare}
              onChange={(e) => setSortare(e.target.value)}
              aria-label="Ordoneaza lista"
            >
              <option value="implicit">Ordinea adaugarii</option>
              <option value="nume-az">Nume A-Z</option>
              <option value="nume-za">Nume Z-A</option>
              <option value="functionale-intai">Functionale intai</option>
              <option value="defecte-intai">Defecte intai</option>
            </select>

            {(existaFiltre || sortare !== "implicit") && (
              <button type="button" className={styles.reset} onClick={reseteazaFiltre}>
                Reseteaza
              </button>
            )}
          </div>

          {loading && (
            <p className="info" data-testid="loading">
              Se incarca lista de aparate...
            </p>
          )}
          {error && (
            <p className="error" data-testid="error">
              {error}
            </p>
          )}
          {!loading && (
            <AparatList
              aparate={aparateAfisate}
              onToggle={handleToggle}
              onDelete={handleDelete}
              mesajGol={
                existaFiltre && total > 0
                  ? "Niciun aparat nu se potriveste cu cautarea sau filtrele alese."
                  : undefined
              }
            />
          )}
        </section>
      </div>
    </>
  );
}