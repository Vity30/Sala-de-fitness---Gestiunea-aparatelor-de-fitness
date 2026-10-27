import { useState } from "react";
import AparatList from "./components/AparatList.jsx";

// Datele initiale redenumite conform cerintelor etapei
const APARATE_INITIALE = [
  {
    id: 1,
    nume: "Presa pentru picioare",
    grupa: "Legs",
    functional: true,
    img: "/img/PresaPicioare.jpg",
  },
  {
    id: 2,
    nume: "Aparat pentru fluturari la piept",
    grupa: "Push",
    functional: false,
    img: "/img/FluturariPiept.jpg",
  },
  {
    id: 3,
    nume: "Helcometru",
    grupa: "Pull",
    functional: true,
    img: "/img/Helcometru.jpg",
  },
  {
    id: 4,
    nume: "Banca Scott",
    grupa: "Arms",
    functional: true,
    img: "/img/BancaScott.jpg",
  },
  {
    id: 5,
    nume: "Banda de alergare",
    grupa: "Cardio",
    functional: false,
    img: "/img/BandaAlergare.jpg",
  },
  {
    id: 6,
    nume: "Aparat Crunch",
    grupa: "Core",
    functional: true,
    img: "/img/AparatCrunch.jpg",
  },
];

// Functie pentru tema initiala bazata pe sistemul de operare
function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  // State-ul pentru lista de aparate si pentru tema
  const [aparate, setAparate] = useState(APARATE_INITIALE);
  const [tema, setTema] = useState(temaInitiala);

  // Functie imutabila pentru comutarea starii (functional: true / false)
  function handleToggle(id) {
    setAparate((prev) =>
      prev.map((a) => (a.id === id ? { ...a, functional: !a.functional } : a))
    );
  }

  // Functie imutabila pentru stergerea unui aparat
  function handleDelete(id) {
    setAparate((prev) => prev.filter((a) => a.id !== id));
  }

  // Comutarea temei vizuale si scrierea pe elementul <html>
  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  // Valoare derivata recalculata automat la fiecare randare
  const functionale = aparate.filter((aparat) => aparat.functional).length;

  return (
    <>
      <header className="app-header">
        <button
          className="theme-toggle"
          onClick={handleTema}
          aria-pressed={tema === "dark"}
        >
          {tema === "dark" ? "Mod luminos" : "Mod intunecat"}
        </button>

        <h1>SALA DE FITNESS</h1>

        <p>
          Gestiunea aparatelor pe grupe musculare si starea lor de
          functionare.
        </p>

        <div className="header-meta">
          <p className="app-count">
            {aparate.length} aparate, dintre care {functionale} functionale
          </p>

          <div className="legend">
            <strong>STATUS:</strong>

            <span className="status-badge ok">
              ✓ FUNCTIONAL
            </span>

            <span className="status-badge bad">
              ✕ DEFECT (NECESITA MENTENANTA)
            </span>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="panel">
          <h2>APARATELE DIN SALA</h2>

          <AparatList
            aparate={aparate}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </>
  );
}