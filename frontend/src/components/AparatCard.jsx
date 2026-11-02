export default function AparatCard({ aparat, onToggle, onDelete, onSelect }) {
  const esteFunctional = aparat.functional;

  const statusClass = esteFunctional
    ? "status status-functional"
    : "status status-defect";

  const codAparat = `#SYS-${String(aparat.id).padStart(3, "0")}`;

  return (
    <li className="task-card">
      {/* 1. Click pe imagine: apeleaza onSelect(id) si te duce in pagina urmatoare de detalii */}
      <img
        src={aparat.img}
        alt={aparat.nume}
        className="card-img clickable"
        loading="lazy"
        onClick={() => onSelect(aparat.id)}
        title="Vezi detalii exercitiu"
      />

      <div className="task-main">
        {/* 2. Casuta de bifat (checkbox): este independenta, schimba doar starea de functionare */}
        <input
          type="checkbox"
          checked={esteFunctional}
          onChange={() => onToggle(aparat.id)}
          title="Schimba starea de functionare"
        />
        
        {/* 3. Click pe titlu: apeleaza si el onSelect(id) pentru a deschide detaliile */}
        <div 
          className="card-content clickable" 
          onClick={() => onSelect(aparat.id)}
          title="Vezi detalii exercitiu"
        >
          <h3>{aparat.nume}</h3>
        </div>
      </div>

      <div className="card-footer">
        <span className="system-id">{codAparat}</span>

        <span className={statusClass}>
          {esteFunctional ? "✓ FUNCTIONAL" : "✕ DEFECT"}
        </span>

        {/* Butonul de stergere: apeleaza functia de stergere dupa ID */}
        <button
          className="btn-danger"
          onClick={() => onDelete(aparat.id)}
          aria-label={`Sterge ${aparat.nume}`}
        >
          Sterge
        </button>
      </div>
    </li>
  );
}