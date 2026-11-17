import { useEffect, useState } from "react";
import AparatList from "../components/AparatList.jsx";
import AparatForm from "../components/AparatForm.jsx";
import { createAparat, deleteAparat, fetchAparate, updateAparat } from "../api.js";
import styles from "./AparatePage.module.css";

// Pagina principala: starea echipamentelor, formularul si lista
export default function AparatePage() {
  const [aparate, setAparate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtru, setFiltru] = useState("toate");

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
    const creat = await createAparat(aparat); // serverul intoarce aparatul cu id
    setAparate((prev) => [...prev, creat]);
    setError(null);
  }

  // Bifarea se salveaza pe server (PATCH doar cu campul schimbat)
  async function handleToggle(id) {
    const aparat = aparate.find((a) => a.id === id);
    if (!aparat) return;
    try {
      const actualizat = await updateAparat(id, { functional: !aparat.functional });
      setAparate((prev) => prev.map((a) => (a.id === id ? actualizat : a)));
      setError(null);
    } catch (err) {
      setError(`Nu am putut salva modificarea: ${err.message}`);
    }
  }

  // Stergerea se face intai pe server
  async function handleDelete(id) {
    try {
      await deleteAparat(id);
      setAparate((prev) => prev.filter((a) => a.id !== id));
      setError(null);
    } catch (err) {
      setError(`Nu am putut sterge aparatul: ${err.message}`);
    }
  }

  // Valori derivate pentru contor si bara de progres
  const total = aparate.length;
  const functionale = aparate.filter((a) => a.functional).length;
  const procentaj = total === 0 ? 0 : Math.round((functionale / total) * 100);

  const aparateFiltrate = aparate.filter((a) => {
    if (filtru === "functionale") return a.functional;
    if (filtru === "defecte") return !a.functional;
    return true;
  });

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
            <div className={styles.filter}>
              <label htmlFor="filtru-aparate">Filtru:</label>
              <select
                id="filtru-aparate"
                value={filtru}
                onChange={(e) => setFiltru(e.target.value)}
              >
                <option value="toate">Toate aparatele</option>
                <option value="functionale">Doar functionale</option>
                <option value="defecte">Doar defecte</option>
              </select>
            </div>
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
              aparate={aparateFiltrate}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>
    </>
  );
}