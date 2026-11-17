import AparatCard from "./AparatCard.jsx";
import styles from "./AparatList.module.css";

export default function AparatList({ aparate, onToggle, onDelete }) {
  // Daca lista este goala, afisam un mesaj simplu
  if (aparate.length === 0) {
    return (
      <p className="empty" data-testid="empty">
        Nu exista niciun aparat inregistrat.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
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