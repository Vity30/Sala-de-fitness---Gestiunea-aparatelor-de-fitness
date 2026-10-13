// 8.2 Datele se pun deasupra functiei, ca sa nu fie recreate la fiecare actualizare
const aparate = [
  { id: 1, nume: "Presa pentru picioare", grupa: "Legs", functional: true },
  { id: 2, nume: "Aparat pentru fluturari la piept", grupa: "Push", functional: false },
  { id: 3, nume: "Helcometru", grupa: "Pull", functional: true }
];

// 8.1 Scheletul componentei principale
export default function App() {
  // 8.3 Calculam numarul de aparate functionale (valoarea calculata)
  const functionale = aparate.filter((a) => a.functional).length;

  return (
    <>
      {/* 8.4 Antetul aplicatiei - Folosim className in loc de class */}
      <header className="app-header">
        <h1>Sala de fitness</h1>
        <p>Gestiunea aparatelor pe grupe musculare si starea lor de functionare.</p>
        <p className="app-count">
          {aparate.length} aparate, dintre care {functionale} functionale
        </p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Aparatele din sala</h2>
          {/* 8.5 Temporar afisam datele brute ca text JSON */}
          <pre>{JSON.stringify(aparate, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}