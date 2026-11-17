import { Link } from "react-router-dom";

// Orice adresa care nu se potriveste cu nicio ruta ajunge aici
export default function NotFoundPage() {
  return (
    <section className="panel page-narrow" data-testid="not-found">
      <div className="panel-header">
        <h2>PAGINA NU EXISTA</h2>
      </div>
      <p className="info">Adresa ceruta nu duce nicaieri. Poate aparatul a fost mutat?</p>
      <Link to="/" className="btn-back">
        ← Inapoi la aparate
      </Link>
    </section>
  );
}