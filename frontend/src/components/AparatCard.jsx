// Emoji folosit cand un aparat nu are poza (de exemplu, unul adaugat din formular)
const EMOJI_GRUPA = {
  Legs: "🦵",
  Push: "🏋️",
  Pull: "🦍",
  Arms: "🦾",
  Cardio: "🏃",
  Core: "🤸",
};

export default function AparatCard({ aparat, onToggle, onDelete, onSelect }) {
  const esteFunctional = aparat.functional;

  const statusClass = esteFunctional
    ? "status status-functional"
    : "status status-defect";

  const codAparat = `#SYS-${String(aparat.id).padStart(3, "0")}`;

  return (
    <li
      className={esteFunctional ? "task-card" : "task-card done"}
      data-testid="item"
      data-id={aparat.id}
    >
      {/* 1. Click pe imagine: deschide pagina de detalii */}
      {aparat.img ? (
        <img
          src={aparat.img}
          alt={aparat.nume}
          className="card-img clickable"
          loading="lazy"
          onClick={() => onSelect(aparat.id)}
          title="Vezi detalii exercitiu"
        />
      ) : (
        <div
          className="card-img card-img-placeholder clickable"
          onClick={() => onSelect(aparat.id)}
          title="Vezi detalii exercitiu"
          role="img"
          aria-label={`${aparat.nume}, fara poza`}
        >
          <span aria-hidden="true">{EMOJI_GRUPA[aparat.grupa] ?? "🏋️"}</span>
          <small>Fara poza</small>
        </div>
      )}

      <div className="task-main">
        {/* 2. Checkbox-ul schimba doar starea de functionare */}
        <input
          type="checkbox"
          checked={esteFunctional}
          onChange={() => onToggle(aparat.id)}
          title="Schimba starea de functionare"
          aria-label={`Functional: ${aparat.nume}`}
          data-testid="item-toggle"
        />

        {/* 3. Click pe titlu: deschide pagina de detalii */}
        <div
          className="card-content clickable"
          onClick={() => onSelect(aparat.id)}
          title="Vezi detalii exercitiu"
        >
          <h3 data-testid="item-title">{aparat.nume}</h3>
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
          data-testid="item-delete"
        >
          Sterge
        </button>
      </div>
    </li>
  );
}