import { useState } from "react";
import { Link } from "react-router-dom";
import { EMOJI_GRUPA } from "../constants.js";
import styles from "./AparatCard.module.css";

export default function AparatCard({ aparat, onToggle, onDelete }) {
  const esteFunctional = aparat.functional;
  const linkDetaliu = `/aparate/${aparat.id}`;
  const codAparat = `#SYS-${String(aparat.id).padStart(3, "0")}`;
  // Daca poza lipseste din public/img, afisam locul cu emoji in loc de o imagine sparta
  const [pozaLipsa, setPozaLipsa] = useState(false);

  return (
    <li
      className={esteFunctional ? styles.card : `${styles.card} ${styles.done}`}
      data-testid="item"
      data-id={aparat.id}
    >
      {/* Poza duce si ea la pagina de detaliu; pentru tastatura ajunge linkul din titlu */}
      <Link to={linkDetaliu} className={styles.imgLink} tabIndex={-1} aria-hidden="true">
        {aparat.img && !pozaLipsa ? (
          <img
            src={aparat.img}
            alt=""
            className={styles.img}
            loading="lazy"
            onError={() => setPozaLipsa(true)}
          />
        ) : (
          <div className={`img-placeholder ${styles.img}`}>
            <span>{EMOJI_GRUPA[aparat.grupa] ?? "🏋️"}</span>
            <small>Fara poza</small>
          </div>
        )}
      </Link>

      <div className={styles.main}>
        {/* Checkbox-ul schimba doar starea de functionare */}
        <input
          type="checkbox"
          checked={esteFunctional}
          onChange={() => onToggle(aparat.id)}
          title="Schimba starea de functionare"
          aria-label={`Functional: ${aparat.nume}`}
          data-testid="item-toggle"
        />

        {/* Etapa 8: titlul este link catre pagina de detaliu */}
        <h3 className={styles.heading}>
          <Link to={linkDetaliu} className={styles.title} data-testid="item-link">
            {aparat.nume}
          </Link>
        </h3>
      </div>

      <div className={styles.footer}>
        <span className={styles.systemId}>{codAparat}</span>

        <span className={esteFunctional ? "status status-functional" : "status status-defect"}>
          {esteFunctional ? "✓ FUNCTIONAL" : "✕ DEFECT"}
        </span>

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