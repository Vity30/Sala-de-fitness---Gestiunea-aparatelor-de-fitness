import AparatCard from "./AparatCard.jsx";
import styles from "./AparatList.module.css";

// mesajGol: textul afisat cand nu e nimic de aratat (de exemplu dupa o cautare)
export default function AparatList({ aparate, onToggle, onDelete, mesajGol }) {
  if (aparate.length === 0) {
    return (
      <p className="empty" data-testid="empty">
        {mesajGol ?? "Nu exista niciun aparat inregistrat."}
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