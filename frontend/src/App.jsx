import { useState, useEffect } from "react";
import AparatList from "./components/AparatList.jsx";

// Baza de date initiala: contine toate aparatele cu detaliile, exercitiile si muschii lucrati
const APARATE_INITIALE = [
  {
    id: 1,
    nume: "Presa pentru picioare",
    grupa: "Legs",
    functional: true,
    img: "/img/PresaPicioare.jpg",
    descriere: "Un exercitiu compus esential pentru dezvoltarea fortei...",
    executie: "Aseaza-te pe aparat cu spatele lipit bine de suport...",
    muschi: "Cvadriceps, Fesieri, Ischiogambieni, Gambe",
  },
  {
    id: 2,
    nume: "Aparat pentru fluturari la piept",
    grupa: "Push",
    functional: false,
    img: "/img/FluturariPiept.jpg",
    descriere: "Cunoscut si sub numele de Pec Deck, acest exercitiu izoleaza...",
    executie: "Regleaza scaunul astfel incat manerele sa fie la nivelul pieptului...",
    muschi: "Pectorali majori, Fasciculul anterior al deltoidului",
  },
  {
    id: 3,
    nume: "Helcometru",
    grupa: "Pull",
    functional: true,
    img: "/img/Helcometru.jpg",
    descriere: "Un exercitiu fundamental pentru dezvoltarea latimii spatelui...",
    executie: "Prinde bara cu o priza mai lata decat umerii...",
    muschi: "Marele dorsal, Rotundul mare, Biceps, Romboizi",
  },
  {
    id: 4,
    nume: "Banca Scott",
    grupa: "Arms",
    functional: true,
    img: "/img/BancaScott.jpg",
    descriere: "Izoleaza complet bicepsul brahial, impiedicand balansul corpului...",
    executie: "Stai cu bratele sprijinite pe planul inclinat al bancii...",
    muschi: "Biceps brahial, Brahial anterior",
  },
  {
    id: 5,
    nume: "Banda de alergare",
    grupa: "Cardio",
    functional: false,
    img: "/img/BandaAlergare.jpg",
    descriere: "Echipament cardio de baza pentru imbunatatirea rezistentei...",
    executie: "Porneste banda la o viteza mica de incalzire...",
    muschi: "Sistem cardiovascular, Cvadriceps, Ischiogambieni, Gambe, Core",
  },
  {
    id: 6,
    nume: "Aparat Crunch",
    grupa: "Core",
    functional: true,
    img: "/img/AparatCrunch.jpg",
    descriere: "Permite adaugarea de greutate progresiva pentru antrenamentul...",
    executie: "Aseaza-te pe scaun si fixeaza picioarele sub suporturi...",
    muschi: "Dreptul abdominal, Oblici",
  },
];

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  // Starea listei de aparate (poate fi modificata prin stergere sau bifare)
  const [aparate, setAparate] = useState(APARATE_INITIALE);
  
  // Starea temei (dark sau light)
  const [tema, setTema] = useState(temaInitiala);

  // Starea pentru filtru (toate, functionale, defecte)
  const [filtru, setFiltru] = useState("toate");

  // STAREA PENTRU PAGINA URMATOARE: 
  // Daca e null, afisam lista. Daca contine un ID (ex: 2), afisam ecranul de detalii pentru acel aparat.
  const [aparatSelectat, setAparatSelectat] = useState(null);

  // Seteaza clasa de tema pe elementul HTML pentru ca CSS-ul sa stie ce stiluri sa aplice
  useEffect(() => {
    document.documentElement.dataset.theme = tema;
  }, [tema]);

  // Functie care schimba statusul aparatului (functional <-> defect) cand bifezi casuta
  function handleToggle(id) {
    setAparate((prev) =>
      prev.map((a) => (a.id === id ? { ...a, functional: !a.functional } : a))
    );
  }

  // Functie care sterge un aparat din lista dupa ID
  function handleDelete(id) {
    setAparate((prev) => prev.filter((a) => a.id !== id));
  }

  // Functie care inverseaza tema curenta la apasarea butonului
  function handleTema() {
    setTema((prev) => (prev === "dark" ? "light" : "dark"));
  }

  // Calcul pentru bara de progres
  const total = aparate.length;
  const functionale = aparate.filter((aparat) => aparat.functional).length;
  const procentaj = total === 0 ? 0 : Math.round((functionale / total) * 100);

  // Logica dropdown-ului de filtrare (returneaza doar elementele care respecta filtrul)
  const aparateFiltrate = aparate.filter((aparat) => {
    if (filtru === "functionale") return aparat.functional;
    if (filtru === "defecte") return !aparat.functional;
    return true;
  });

  // Gaseste obiectul aparatului pe care s-a dat click
  const aparatCurent = aparate.find((a) => a.id === aparatSelectat);

  return (
    <>
      <header className="app-header">
        {/* Butonul de schimbare a temei */}
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

        {/* Bara de progres vizuala */}
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
        {/* 
          NAVIGARE CONDITIONATA (Pagina noua):
          Daca exista un aparat selectat (aparatCurent nu e null), afisam sectiunea de detalii.
          Altfel, afisam panoul principal cu lista de aparate si filtrul.
        */}
        {aparatCurent ? (
          <section className="panel detail-view">
            {/* Butonul care reseteaza starea la null si te intoarce la lista */}
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

              {/* CUM A APARUT FILTRUL: Un element select conectat la starea `filtru` */}
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

            {/* Componenta care afiseaza lista filtrata */}
            <AparatList
              aparate={aparateFiltrate}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onSelect={(id) => setAparatSelectat(id)} // Trimite ID-ul aparatului apasat
            />
          </section>
        )}
      </main>
    </>
  );
}