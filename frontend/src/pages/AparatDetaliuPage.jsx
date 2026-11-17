import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAparat } from "../api.js";
import { EMOJI_GRUPA, ETICHETE_GRUPA } from "../constants.js";
import styles from "./AparatDetaliuPage.module.css";

// Pagina unui singur aparat, la adresa /aparate/:id
export default function AparatDetaliuPage() {
  const { id } = useParams(); // text din adresa, de exemplu "3"
  const [aparat, setAparat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Se reincarca daca se schimba id-ul din adresa
  useEffect(() => {
    let ignore = false;

    fetchAparat(id)
      .then((data) => {
        if (!ignore) {
          setAparat(data);
          setError(null); // o eroare de la un id anterior nu mai este valabila
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Se incarca aparatul...
      </p>
    );
  }

  // Un id inexistent (de exemplu /aparate/999): mesaj si drum inapoi, nu ecran gol
  if (error) {
    return (
      <section className="panel page-narrow">
        <p className="error" data-testid="error">
          Aparatul nu a putut fi incarcat: {error}
        </p>
        <Link to="/" className="btn-back">
          ← Inapoi la lista
        </Link>
      </section>
    );
  }

  const cod = `#SYS-${String(aparat.id).padStart(3, "0")}`;

  // Campurile noi pot lipsi (de exemplu la aparatele adaugate din formular)
  const pasi = aparat.pasi ?? [];
  const greseli = aparat.greseli ?? [];
  const program = aparat.program ?? [];
  const principali = aparat.muschiPrincipali ?? (aparat.muschi ? [aparat.muschi] : []);
  const secundari = aparat.muschiSecundari ?? [];

  return (
    <section className={`panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className="btn-back">
        ← Inapoi la lista de aparate
      </Link>

      {/* Sus: poza in stanga, prezentarea in dreapta */}
      <div className={styles.grid}>
        <div>
          {aparat.img ? (
            <img
              src={aparat.img}
              alt={aparat.nume}
              className={aparat.functional ? styles.img : `${styles.img} ${styles.imgDefect}`}
            />
          ) : (
            <div className={`img-placeholder ${styles.img} ${styles.placeholder}`}>
              <span>{EMOJI_GRUPA[aparat.grupa] ?? "🏋️"}</span>
              <small>Fara poza</small>
            </div>
          )}
          <span className={styles.sysCode}>{cod}</span>
        </div>

        <div>
          <h2 className={styles.title} data-testid="detail-title">
            {aparat.nume}
          </h2>

          {/* Campurile scurte ale aparatului */}
          <dl className={styles.fields}>
            <dt>Grupa musculara</dt>
            <dd>{ETICHETE_GRUPA[aparat.grupa] ?? aparat.grupa}</dd>
            <dt>Stare</dt>
            <dd>
              <span className={aparat.functional ? "status status-functional" : "status status-defect"}>
                {aparat.functional ? "✓ FUNCTIONAL" : "✕ DEFECT"}
              </span>
            </dd>
            {aparat.tip && (
              <>
                <dt>Tip exercitiu</dt>
                <dd>{aparat.tip}</dd>
              </>
            )}
            {aparat.nivel && (
              <>
                <dt>Nivel</dt>
                <dd>{aparat.nivel}</dd>
              </>
            )}
          </dl>

          <div className={styles.section}>
            <h3>Ce face exercitiul</h3>
            <p>{aparat.descriere || "Descrierea nu a fost adaugata inca."}</p>
          </div>

          {/* Muschii: principalii evidentiati, secundarii mai discreti */}
          {principali.length > 0 && (
            <div className={styles.section}>
              <h3>Muschi lucrati</h3>
              <ul className={styles.tags}>
                {principali.map((m) => (
                  <li key={m} className={styles.tag}>
                    {m}
                  </li>
                ))}
                {secundari.map((m) => (
                  <li key={m} className={`${styles.tag} ${styles.tagSecondary}`}>
                    {m}
                  </li>
                ))}
              </ul>
              {secundari.length > 0 && (
                <p className={styles.legend}>
                  <span className={styles.dotMain} /> principali
                  <span className={styles.dotSecondary} /> secundari
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Executia pas cu pas si greselile frecvente */}
      {(pasi.length > 0 || aparat.executie || greseli.length > 0) && (
        <div className={styles.columns}>
          <div className={styles.block}>
            <h3>Executie pas cu pas</h3>
            {pasi.length > 0 ? (
              <ol className={styles.steps}>
                {pasi.map((pas) => (
                  <li key={pas}>{pas}</li>
                ))}
              </ol>
            ) : (
              <p>{aparat.executie || "Pasii de executie nu au fost adaugati inca."}</p>
            )}
            {aparat.respiratie && (
              <p className={styles.breath}>
                <strong>Respiratie:</strong> {aparat.respiratie}
              </p>
            )}
          </div>

          {greseli.length > 0 && (
            <div className={styles.block}>
              <h3>Greseli frecvente</h3>
              <ul className={styles.mistakes}>
                {greseli.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              {aparat.sfat && (
                <p className={styles.tip}>
                  <strong>Sfatul antrenorului</strong>
                  {aparat.sfat}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Programul recomandat pe niveluri: serii x repetari, greutate, pauza */}
      {program.length > 0 && (
        <div className={styles.block}>
          <h3>Program recomandat</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Nivel</th>
                  <th scope="col">{aparat.tip === "Cardio" ? "Durata" : "Serii x repetari"}</th>
                  <th scope="col">{aparat.tip === "Cardio" ? "Intensitate" : "Greutate"}</th>
                  <th scope="col">Pauza</th>
                </tr>
              </thead>
              <tbody>
                {program.map((rand) => (
                  <tr key={rand.nivel}>
                    <th scope="row">
                      <span className={styles.level}>{rand.nivel}</span>
                    </th>
                    <td data-label={aparat.tip === "Cardio" ? "Durata" : "Serii x repetari"}>
                      <strong>{rand.volum}</strong>
                    </td>
                    <td data-label={aparat.tip === "Cardio" ? "Intensitate" : "Greutate"}>
                      {rand.intensitate}
                    </td>
                    <td data-label="Pauza">{rand.pauza}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.note}>
            {aparat.tip === "Cardio"
              ? "Valorile sunt orientative. Incepe mereu cu 5 minute de incalzire si opreste-te daca simti ameteala sau durere."
              : "Valorile sunt orientative. 1RM este greutatea maxima cu care poti face o singura repetare; \"repetari in rezerva\" inseamna cate repetari ai mai putea face corect la finalul seriei. Alege intotdeauna o greutate cu care pastrezi tehnica."}
          </p>
        </div>
      )}
    </section>
  );
}