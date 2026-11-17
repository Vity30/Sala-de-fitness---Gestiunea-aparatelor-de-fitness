import { useState, useEffect } from "react";
import AparatList from "./components/AparatList.jsx";
import AparatForm from "./components/AparatForm.jsx";
import { createAparat, deleteAparat, fetchAparate, updateAparat } from "./api.js";

const GRUPE = {
  Legs: { emoji: "🦵", label: "Picioare" },
  Push: { emoji: "🏋️", label: "Piept" },
  Pull: { emoji: "🦍", label: "Spate" },
  Arms: { emoji: "🦾", label: "Brate" },
  Cardio: { emoji: "🏃", label: "Cardio" },
  Core: { emoji: "🤸", label: "Abdomen" },
};

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  // Datele de la server (Etapa 6)
  const [aparate, setAparate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Starile pentru tema, filtru si pagina de detalii
  const [tema, setTema] = useState(temaInitiala);
  const [filtru, setFiltru] = useState("toate");
  const [aparatSelectat, setAparatSelectat] = useState(null);

  // Efectul care cere datele de la json-server la montarea componentei
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

  // Seteaza tema pe elementul <html>
  useEffect(() => {
    document.documentElement.dataset.theme = tema;
  }, [tema]);

  // Etapa 7: intai serverul, apoi state-ul; pe ecran ajunge doar ce s-a salvat.
  // Fara try: eroarea ajunge inapoi in formular, care o afiseaza langa campuri.
  async function handleAdd(aparat) {
    const creat = await createAparat(aparat); // serverul intoarce aparatul cu id
    setAparate((prev) => [...prev, creat]);
    setError(null);
  }

  // Etapa 7: bifarea se salveaza pe server (PATCH doar cu campul schimbat)
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

  // Etapa 7: stergerea se face intai pe server
  async function handleDelete(id) {
    try {
      await deleteAparat(id);
      setAparate((prev) => prev.filter((a) => a.id !== id));
      setError(null);
    } catch (err) {
      setError(`Nu am putut sterge aparatul: ${err.message}`);
    }
  }

  // Inverseaza tema curenta
  function handleTema() {
    setTema((prev) => (prev === "dark" ? "light" : "dark"));
  }

  // Calcul pentru bara de progres
  const total = aparate.length;
  const functionale = aparate.filter((aparat) => aparat.functional).length;
  const procentaj = total === 0 ? 0 : Math.round((functionale / total) * 100);

  // Filtrarea listei
  const aparateFiltrate = aparate.filter((aparat) => {
    if (filtru === "functionale") return aparat.functional;
    if (filtru === "defecte") return !aparat.functional;
    return true;
  });

  // Aparatul curent pentru pagina de detalii
  const aparatCurent = aparate.find((a) => a.id === aparatSelectat);

  return (
    <>
      <header className="app-header">
        <button className="theme-toggle" onClick={handleTema} aria-pressed={tema === "dark"}>
          {tema === "dark" ? "Mod luminos" : "Mod intunecat"}
        </button>
        <h1>SALA DE FITNESS</h1>
        <p>Gestiunea aparatelor pe grupe musculare si starea lor de functionare.</p>

        <div className="header-meta">
          <p className="app-count">
            {total} aparate, dintre care {functionale} functionale
          </p>
          <div className="legend">
            <strong>STATUS:</strong>
            <span className="status-badge ok">✓ FUNCTIONAL</span>
            <span className="status-badge bad">✕ DEFECT</span>
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-info">
            <span>Stare generala echipamente</span>
            <span>{procentaj}% Functional</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${procentaj}%` }}></div>
          </div>
        </div>
      </header>

      {/* Etapa 7: pe pagina principala, formularul in stanga si lista in dreapta */}
      <main className={aparatCurent ? "container" : "container container-split"}>
        {aparatCurent ? (
          <section className="panel detail-view">
            <button className="btn-back" onClick={() => setAparatSelectat(null)}>
              ← Inapoi la lista de aparate
            </button>
            <div className="detail-content-grid">
              <div className="detail-img-box">
                {aparatCurent.img ? (
                  <img src={aparatCurent.img} alt={aparatCurent.nume} className="detail-img" />
                ) : (
                  <div
                    className="detail-img card-img-placeholder"
                    role="img"
                    aria-label={`${aparatCurent.nume}, fara poza`}
                  >
                    <span aria-hidden="true">{GRUPE[aparatCurent.grupa]?.emoji ?? "🏋️"}</span>
                    <small>Fara poza</small>
                  </div>
                )}
                <span className="detail-sys-code">
                  #SYS-{String(aparatCurent.id).padStart(3, "0")}
                </span>
              </div>
              <div className="detail-info-box">
                <h2>{aparatCurent.nume}</h2>
                <span className="detail-grupa">
                  Grupa musculara: <strong>{GRUPE[aparatCurent.grupa]?.label ?? aparatCurent.grupa}</strong>
                </span>
                <div className="detail-section">
                  <h3>Descriere si beneficii:</h3>
                  <p>{aparatCurent.descriere || "Descrierea nu a fost adaugata inca."}</p>
                </div>
                <div className="detail-section">
                  <h3>Mod de executie corecta:</h3>
                  <p>{aparatCurent.executie || "Modul de executie nu a fost adaugat inca."}</p>
                </div>
                <div className="detail-section">
                  <h3>Muschi implicati:</h3>
                  <p className="muschi-tag">{aparatCurent.muschi || "Nespecificat"}</p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="panel panel-form">
              <div className="panel-header">
                <h2>ADAUGA UN APARAT</h2>
              </div>
              <AparatForm onAdd={handleAdd} />
            </section>

            <section className="panel">
              <div className="panel-header">
                <h2>APARATELE DIN SALA</h2>
                <div className="filter-wrapper">
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

              {/* Starile de incarcare si eroare */}
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

              {/* Etapa 7: conditia este doar !loading; daca o bifare esueaza,
                  eroarea apare deasupra, iar lista ramane pe ecran */}
              {!loading && (
                <AparatList
                  aparate={aparateFiltrate}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onSelect={(id) => setAparatSelectat(id)}
                />
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
}