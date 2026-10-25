export default function AparatCard({ aparat }) {
  const esteFunctional = aparat.functional;

  const statusClass = esteFunctional
    ? "status status-functional"
    : "status status-defect";

  const codAparat = `#SYS-${String(aparat.id).padStart(3, "0")}`;

  return (
    <li className="task-card">
      <img
        src={aparat.img}
        alt={aparat.nume}
        className="card-img"
        loading="lazy"
      />

      <div className="card-content">
        <h3>{aparat.nume}</h3>
      </div>

      <div className="card-footer">
        <span className="system-id">{codAparat}</span>

        <span className={statusClass}>
          {esteFunctional ? "✓ FUNCȚIONAL" : "✕ DEFECT"}
        </span>
      </div>
    </li>
  );
}
