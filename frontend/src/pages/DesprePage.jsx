// Pagina de prezentare: ce face aplicatia si cu ce este construita
export default function DesprePage() {
  return (
    <section className="panel page-narrow">
      <div className="panel-header">
        <h2>DESPRE SALA DE FITNESS</h2>
      </div>
      <p className="page-text">
        Aplicatia gestioneaza inventarul aparatelor dintr-o sala de fitness. Permite
        urmarirea starii de functionare a fiecarui aparat si organizarea echipamentelor
        pe grupe musculare: picioare, piept, spate, brate, cardio si abdomen.
      </p>
      <p className="page-text">
        Aparatele se pot adauga din pagina principala, marca drept functionale sau defecte
        si sterge, iar fiecare aparat are o pagina proprie cu descrierea, modul de executie
        si muschii implicati.
      </p>
      <p className="page-text">
        <strong>Stack:</strong> React, Vite, React Router, json-server. Urmeaza Node.js,
        Express, MariaDB si Docker.
      </p>
    </section>
  );
}