// Un singur element din lista, primit prin props.
const ETICHETE_GRUPA = {
  Legs: "Picioare 🦵",
  Push: "Piept 🏋️",
  Pull: "Spate 🦍",
  Arms: "Brate 🦾",
  Cardio: "Cardio 🏃",
  Core: "Abdomen 🤸"
};

export default function AparatCard({ aparat }) {
  const cardClass = aparat.functional ? "task-card" : "task-card done";
  const iconitaStatus = aparat.functional ? "✅" : "🛠️";

  return (
    <li className={cardClass}>
      <img src={aparat.imagine} alt={aparat.nume} className="card-img" />
      
      <div className="card-content">
        <h3>{aparat.nume}</h3>
        <span className={`badge badge-${aparat.grupa.toLowerCase()}`}>
          Grupa: {ETICHETE_GRUPA[aparat.grupa] || aparat.grupa}
        </span>
      </div>
      
      <span className="status">
        {iconitaStatus} {aparat.functional ? "Functional" : "Defect"}
      </span>
    </li>
  );
}