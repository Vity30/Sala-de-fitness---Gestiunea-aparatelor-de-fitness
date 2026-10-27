export default function AparatCard({ aparat, onToggle, onDelete }) {
  const esteFunctional = aparat.functional;

  const statusClass = esteFunctional
    ? "status status-functional"
    : "status status-defect";

  const codAparat = `#SYS-${String(aparat.id).padStart(3, "0")}`;

  return (
    <li className={esteFunctional ? "task-card" : "task-card done"}>
      {/* Poza este scoasă din label și rămâne sus, ocupând lățimea normală */}
      <img
        src={aparat.img}
        alt={aparat.nume}
        className="card-img"
        loading="lazy"
      />

      {/* Label-ul ține acum DOAR checkbox-ul și titlul pe același rând */}
      <label className="task-main">
        <input
          type="checkbox"
          checked={esteFunctional}
          onChange={() => onToggle(aparat.id)}
        />
        
        <div className="card-content">
          <h3>{aparat.nume}</h3>
        </div>
      </label>

      <div className="card-footer">
        <span className="system-id">{codAparat}</span>

        <span className={statusClass}>
          {esteFunctional ? "✓ FUNCTIONAL" : "✕ DEFECT"}
        </span>

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