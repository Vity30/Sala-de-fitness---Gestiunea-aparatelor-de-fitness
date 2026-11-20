import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAparate } from "../api.js";
import { GRUPE } from "../constants.js";
import { formateazaData } from "../dateUtils.js";
import styles from "./StatisticiPage.module.css";

// Numara cate aparate are fiecare valoare a unui camp: { Compus: 3, Izolare: 4, ... }
function numara(aparate, camp) {
  const rezultat = {};
  for (const a of aparate) {
    const cheie = a[camp] || "Necompletat";
    rezultat[cheie] = (rezultat[cheie] ?? 0) + 1;
  }
  return rezultat;
}

// Pagina cu statistici despre inventar, calculate din lista de aparate
export default function StatisticiPage() {
  const [aparate, setAparate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetchAparate()
      .then((data) => {
        if (!ignore) setAparate(data);
      })
      .catch((err) => {
        if (!ignore) setError(`Nu am putut incarca datele: ${err.message}`);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Se calculeaza statisticile...
      </p>
    );
  }

  if (error) {
    return (
      <section className="panel page-narrow">
        <p className="error" data-testid="error">
          {error}
        </p>
      </section>
    );
  }

  const total = aparate.length;
  const functionale = aparate.filter((a) => a.functional).length;
  const defecte = aparate.filter((a) => !a.functional);
  const procent = total === 0 ? 0 : Math.round((functionale / total) * 100);

  // Pe fiecare grupa: cate aparate functionale si cate defecte
  const peGrupe = GRUPE.map((g) => {
    const dinGrupa = aparate.filter((a) => a.grupa === g.value);
    return {
      ...g,
      total: dinGrupa.length,
      ok: dinGrupa.filter((a) => a.functional).length,
    };
  });
  const maxGrupa = Math.max(1, ...peGrupe.map((g) => g.total));

  const peTip = numara(aparate, "tip");
  const peNivel = numara(aparate, "nivel");

  // Cele mai vechi defecte primele: acolo trebuie intervenit intai
  const defecteSortate = [...defecte].sort((a, b) =>
    (a.defectData ?? "9999").localeCompare(b.defectData ?? "9999")
  );

  return (
    <section className={`panel ${styles.page}`} data-testid="stats">
      <div className="panel-header">
        <h2>STATISTICI INVENTAR</h2>
      </div>

      {total === 0 ? (
        <p className="empty" data-testid="empty">
          Nu exista aparate, deci nici statistici. Adauga primul aparat din pagina principala.
        </p>
      ) : (
        <>
          {/* Cifrele mari */}
          <div className={styles.kpis}>
            <div className={styles.kpi}>
              <span className={styles.kpiValue}>{total}</span>
              <span className={styles.kpiLabel}>aparate in total</span>
            </div>
            <div className={`${styles.kpi} ${styles.kpiOk}`}>
              <span className={styles.kpiValue}>{functionale}</span>
              <span className={styles.kpiLabel}>functionale</span>
            </div>
            <div className={`${styles.kpi} ${styles.kpiBad}`}>
              <span className={styles.kpiValue}>{defecte.length}</span>
              <span className={styles.kpiLabel}>defecte</span>
            </div>
            <div className={styles.kpi}>
              <span className={styles.kpiValue}>{procent}%</span>
              <span className={styles.kpiLabel}>disponibilitate</span>
            </div>
          </div>

          <div className={styles.grid}>
            {/* Grafic cu bare: aparate pe grupe, impartite in functionale si defecte */}
            <div className={styles.card}>
              <h3>Aparate pe grupe musculare</h3>
              <ul className={styles.bars}>
                {peGrupe.map((g) => (
                  <li key={g.value} className={styles.barRow}>
                    <span className={styles.barLabel}>
                      <span aria-hidden="true">{g.emoji}</span> {g.label}
                    </span>
                    <span
                      className={styles.barTrack}
                      role="img"
                      aria-label={`${g.label}: ${g.ok} functionale, ${g.total - g.ok} defecte`}
                    >
                      <span
                        className={styles.barOk}
                        style={{ width: `${(g.ok / maxGrupa) * 100}%` }}
                      />
                      <span
                        className={styles.barBad}
                        style={{ width: `${((g.total - g.ok) / maxGrupa) * 100}%` }}
                      />
                    </span>
                    <span className={styles.barValue}>{g.total}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.legend}>
                <span className={styles.dotOk} /> functionale
                <span className={styles.dotBad} /> defecte
              </p>
            </div>

            {/* Tipul exercitiilor si nivelul recomandat */}
            <div className={styles.card}>
              <h3>Tip exercitiu</h3>
              <ul className={styles.chips}>
                {Object.entries(peTip).map(([tip, nr]) => (
                  <li key={tip}>
                    <strong>{nr}</strong> {tip}
                  </li>
                ))}
              </ul>

              <h3 className={styles.spaced}>Nivel recomandat</h3>
              <ul className={styles.chips}>
                {Object.entries(peNivel).map(([nivel, nr]) => (
                  <li key={nivel}>
                    <strong>{nr}</strong> {nivel}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lista de interventii: aparatele defecte, cele mai vechi primele */}
          <div className={styles.card}>
            <h3>De reparat</h3>
            {defecteSortate.length === 0 ? (
              <p className={styles.allGood}>Toate aparatele functioneaza. 🎉</p>
            ) : (
              <ul className={styles.repairs}>
                {defecteSortate.map((a) => (
                  <li key={a.id}>
                    <div>
                      <Link to={`/aparate/${a.id}`} className={styles.repairName}>
                        {a.nume}
                      </Link>
                      <p>{a.defectNota || "Fara nota de mentenanta."}</p>
                    </div>
                    <span className={styles.repairDate}>
                      {a.defectData ? `din ${formateazaData(a.defectData)}` : "data necunoscuta"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </section>
  );
}