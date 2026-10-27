import AparatCard from "./AparatCard.jsx";

export default function AparatList({ aparate, onToggle, onDelete }) {
  if (aparate.length === 0) {
    return <p className="empty">Nu exista niciun aparat inregistrat.</p>;
  }

  return (
    <ul className="task-list">
      {aparate.map((aparat) => (
        <AparatCard
          key={aparat.id}
          aparat={aparat}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}