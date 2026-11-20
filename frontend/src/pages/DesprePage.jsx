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
        In pagina principala poti adauga aparate, le poti cauta dupa nume, filtra dupa grupa
        sau stare si ordona. Cand un aparat se strica, il marchezi ca defect si notezi ce
        s-a intamplat; pagina <strong>Statistici</strong> arata apoi ce trebuie reparat
        primul.
      </p>
      <p className="page-text">
        Fiecare aparat are o pagina proprie cu descrierea exercitiului, pasii de executie,
        greselile frecvente, un program pe niveluri si demonstratii video. De acolo il poti
        adauga in <strong>Antrenamentul meu</strong>, un plan personal salvat in browser.
      </p>
      <p className="page-text">
        <strong>Stack:</strong> React, Vite, React Router, json-server. Urmeaza Node.js,
        Express, MariaDB si Docker.
      </p>
      <p className="page-text">
        <strong>Credite imagini:</strong> pozele pentru extensii si aparatul de impins provin
        de pe Wikimedia Commons, sub licente libere Creative Commons.
      </p>
    </section>
  );
}