import { useState, useEffect } from "react";
import AparatList from "./components/AparatList.jsx";
import { fetchAparate } from "./api.js"; // Import pentru Etapa 6

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  // Starile adaugate pentru Etapa 6
  const [aparate, setAparate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Starile deja existente pentru functionalitatea site-ului
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
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Seteaza clasa de tema pe elementul HTML
  useEffect(() => {
    document.documentElement.dataset.theme = tema;
  }, [tema]);

  // Schimba statusul aparatului (functional <-> defect)
  function handleToggle(id) {
    setAparate((prev) =>
      prev.map((a) => (a.id === id ? { ...a, functional: !a.functional } : a))
    );
  } 

  // Sterge un aparat din lista
  function handleDelete(id) {
    setAparate((prev) => prev.filter((a) => a.id !== id));
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

  // Gaseste aparatul curent pentru view-ul de detalii
  const aparatCurent = aparate.find((a) => a.id === aparatSelectat);

  return (
    <>
      <header className="app-header">
        <button className="theme-toggle" onClick={handleTema}>
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

      <main className="container">
        {aparatCurent ? (
          <section className="panel detail-view">
            <button className="btn-back" onClick={() => setAparatSelectat(null)}>
              ← Inapoi la lista de aparate
            </button>
            <div className="detail-content-grid">
              <div className="detail-img-box">
                <img src={aparatCurent.img} alt={aparatCurent.nume} className="detail-img" />
                <span className="detail-sys-code">#SYS-{String(aparatCurent.id).padStart(3, "0")}</span>
              </div>
              <div className="detail-info-box">
                <h2>{aparatCurent.nume}</h2>
                <span className="detail-grupa">
                  Grupa musculara: <strong>{aparatCurent.grupa}</strong>
                </span>
                <div className="detail-section">
                  <h3>Descriere si beneficii:</h3>
                  <p>{aparatCurent.descriere}</p>
                </div>
                <div className="detail-section">
                  <h3>Mod de executie corecta:</h3>
                  <p>{aparatCurent.executie}</p>
                </div>
                <div className="detail-section">
                  <h3>Muschi implicati:</h3>
                  <p className="muschi-tag">{aparatCurent.muschi}</p>
                </div>
              </div>
            </div>
          </section>
        ) : (
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

            {/* Afisarea starilor de incarcare si eroare */}
            {loading && <p className="info">Se incarca lista de aparate...</p>}
            {error && (
              <p className="error">
                Nu am putut incarca datele: {error}. Ruleaza <code>npm run api</code>?
              </p>
            )}
            
            {/* Lista se afiseaza doar daca avem date (fara loading/eroare) */}
            {!loading && !error && (
              <AparatList
                aparate={aparateFiltrate}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onSelect={(id) => setAparatSelectat(id)}
              />
            )}
          </section>
        )}
      </main>
    </>
  );
}