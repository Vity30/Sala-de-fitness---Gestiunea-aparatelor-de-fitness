import AparatCard from "./AparatCard.jsx";

export default function AparatList({ aparate }) {
  if (aparate.length === 0) {
    return <p className="empty">Nu exista niciun aparat inregistrat.</p>;
  }

  return (
    <ul className="task-list">
      {aparate.map((aparat) => (
        <AparatCard key={aparat.id} aparat={aparat} />
      ))}
    </ul>
  );
}