import AparatCard from "./AparatCard.jsx";

export default function AparatList({ aparate, onToggle, onDelete, onSelect }) {
  // Daca lista este goala, afisam un mesaj simplu
  if (aparate.length === 0) {
    return <p className="empty">Nu exista niciun aparat inregistrat.</p>;
  }

  return (
    <ul className="task-list">
      {/* Parcurgem fiecare aparat din lista si generam cate un card */}
      {aparate.map((aparat) => (
        <AparatCard
          key={aparat.id}
          aparat={aparat}
          onToggle={onToggle}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}