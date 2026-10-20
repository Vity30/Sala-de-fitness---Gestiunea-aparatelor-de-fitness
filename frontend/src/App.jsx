import AparatList from "./components/AparatList.jsx";

// Datele cu imaginile specifice pentru fiecare aparat
const aparate = [
  { id: 1, nume: "Presa pentru picioare", grupa: "Legs", functional: true, imagine: "https://www.topculturism.ro/wp-content/uploads/2024/09/impins-la-presa-vs-genuflexiuni-ce-sa-alegi.jpg" },
  { id: 2, nume: "Aparat pentru fluturari la piept", grupa: "Push", functional: false, imagine: "https://aparate-fitness.ro/wp-content/uploads/2021/10/fluturari-piept-wb-pfa.jpg" },
  { id: 3, nume: "Helcometru", grupa: "Pull", functional: true, imagine: "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3891282733477675077" },
  { id: 4, nume: "Banca Scott", grupa: "Arms", functional: true, imagine: "https://body365.ro/wp-content/uploads/2023/08/Flexii-biceps-Bara-Z-la-Banca-Scott.jpg.webp" },
  { id: 5, nume: "Banda de alergare", grupa: "Cardio", functional: false, imagine: "https://sportmagazin.md/cdn/shop/articles/banda-de-alergare_da2e04e0-3c89-4c22-a1cd-98abcb7ec1df.jpg?v=1776761714" },
  { id: 6, nume: "Aparat Crunch", grupa: "Core", functional: true, imagine: "https://shopbuilder.ro/images/bbcomment/abcrunch.jpg" }
];

export default function App() {
  const functionale = aparate.filter((a) => a.functional).length;

  return (
    <>
      <header className="app-header">
        <h1>Sala de fitness</h1>
        <p>Gestiunea aparatelor pe grupe musculare si starea lor de functionare.</p>
        <p className="app-count">
          {aparate.length} aparate, dintre care {functionale} functionale
        </p>
        
        {/* LEGENDA ADAUGATA PENTRU PROFESOR */}
        <div className="legend">
          <span><strong>Legenda status:</strong></span>
          <span className="status-badge">✅ Functional</span>
          <span className="status-badge">🛠️ Defect (Necesita mentenanta)</span>
        </div>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Aparatele din sala</h2>
          <AparatList aparate={aparate} />
        </section>
      </main>
    </>
  );
}