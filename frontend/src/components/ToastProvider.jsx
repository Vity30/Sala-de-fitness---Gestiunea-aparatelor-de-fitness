import { useCallback, useRef, useState } from "react";
import { ToastContext } from "../toast.js";
import styles from "./ToastProvider.module.css";

const DURATA_MS = 5000;

// Tine lista de notificari si le afiseaza in coltul ecranului.
// O notificare poate avea un buton, de exemplu "Anuleaza" dupa stergere.
export default function ToastProvider({ children }) {
  const [toasturi, setToasturi] = useState([]);
  const urmatorulId = useRef(1);

  const inchide = useCallback((id) => {
    setToasturi((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // tip: "succes" | "eroare" | "info"; actiune: { eticheta, onClick }
  const arata = useCallback(
    (mesaj, { tip = "succes", actiune = null } = {}) => {
      const id = urmatorulId.current++;
      setToasturi((prev) => [...prev, { id, mesaj, tip, actiune }]);
      setTimeout(() => inchide(id), DURATA_MS);
    },
    [inchide]
  );

  return (
    <ToastContext.Provider value={arata}>
      {children}

      {/* aria-live: cititoarele de ecran anunta notificarile noi */}
      <div className={styles.stack} role="status" aria-live="polite">
        {toasturi.map((t) => (
          <div key={t.id} className={`${styles.toast} ${styles[t.tip]}`} data-testid="toast">
            <span className={styles.icon} aria-hidden="true">
              {t.tip === "eroare" ? "✕" : t.tip === "info" ? "i" : "✓"}
            </span>
            <span className={styles.text}>{t.mesaj}</span>
            {t.actiune && (
              <button
                className={styles.action}
                onClick={() => {
                  inchide(t.id);
                  t.actiune.onClick();
                }}
              >
                {t.actiune.eticheta}
              </button>
            )}
            <button className={styles.close} onClick={() => inchide(t.id)} aria-label="Inchide notificarea">
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}