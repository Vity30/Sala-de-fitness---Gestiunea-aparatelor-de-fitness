
import AparatList from "./components/AparatList.jsx";

const aparate = [
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

export default function App() {
  const functionale = aparate.filter(
    (aparat) => aparat.functional
  ).length;

  return (
    <>
      <header className="app-header">
        <h1>SALA DE FITNESS</h1>

        <p>
          Gestiunea aparatelor pe grupe musculare și starea lor de
          funcționare.
        </p>

        <div className="header-meta">
          <p className="app-count">
            {aparate.length} aparate, dintre care {functionale} funcționale
          </p>

          <div className="legend">
            <strong>STATUS:</strong>

            <span className="status-badge ok">
              ✓ FUNCȚIONAL
            </span>

            <span className="status-badge bad">
              ✕ DEFECT (NECESITĂ MENTENANȚĂ)
            </span>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="panel">
          <h2>APARATELE DIN SALĂ</h2>

          <AparatList aparate={aparate} />
        </section>
      </main>
    </>
  );
}
