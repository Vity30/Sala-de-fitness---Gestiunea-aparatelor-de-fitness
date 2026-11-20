import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAparate } from "../api.js";
import { NIVELURI, citesteAntrenament, salveazaAntrenament } from "../antrenament.js";
import { EMOJI_GRUPA, ETICHETE_GRUPA } from "../constants.js";
import { useToast } from "../toast.js";
import styles from "./AntrenamentPage.module.css";

// "3-4 x 8-12" -> 4 (numarul maxim de serii); pentru cardio nu se aplica
function seriiMaxime(volum) {
  const potrivire = /^(\d+)(?:-(\d+))?\s*x/.exec(volum ?? "");
  if (!potrivire) return 0;
  return Number(potrivire[2] ?? potrivire[1]);
}

// Antrenamentul personal: aparatele alese, in ordine, cu programul pentru nivelul ales
export default function AntrenamentPage() {
  const [plan, setPlan] = useState(citesteAntrenament);
  const [aparate, setAparate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const arataToast = useToast();

  useEffect(() => {
    let ignore = false;
    fetchAparate()
      .then((data) => {
        if (!ignore) setAparate(data);
      })
      .catch((err) => {
        if (!ignore) setError(`Nu am putut incarca aparatele: ${err.message}`);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  // Orice schimbare se salveaza imediat in browser
  function actualizeaza(nou) {
    setPlan(nou);
    salveazaAntrenament(nou);
  }

  function muta(index, directie) {
    const ids = [...plan.ids];
    const tinta = index + directie;
    [ids[index], ids[tinta]] = [ids[tinta], ids[index]];
    actualizeaza({ ...plan, ids });
  }

  function scoate(id, nume) {
    actualizeaza({ ...plan, ids: plan.ids.filter((x) => String(x) !== String(id)) });
    arataToast(`"${nume}" a fost scos din antrenament.`, { tip: "info" });
  }

  function goleste() {
    actualizeaza({ ...plan, ids: [] });
    arataToast("Antrenamentul a fost golit.", { tip: "info" });
  }

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Se incarca antrenamentul...
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

  // Pastram ordinea din plan; aparatele sterse intre timp dispar singure
  const exercitii = plan.ids
    .map((id) => aparate.find((a) => String(a.id) === String(id)))
    .filter(Boolean);

  const randuri = exercitii.map((a) => ({
    aparat: a,
    program: (a.program ?? []).find((p) => p.nivel === plan.nivel),
  }));
  const totalSerii = randuri.reduce((s, r) => s + seriiMaxime(r.program?.volum), 0);
  const defecte = exercitii.filter((a) => !a.functional);

  return (
    <section className={`panel ${styles.page}`} data-testid="workout">
      <div className="panel-header">
        <h2>ANTRENAMENTUL MEU</h2>
        <div className={styles.levels} role="group" aria-label="Nivelul tau">
          {NIVELURI.map((n) => (
            <button
              key={n}
              className={n === plan.nivel ? `${styles.level} ${styles.levelOn}` : styles.level}
              onClick={() => actualizeaza({ ...plan, nivel: n })}
              aria-pressed={n === plan.nivel}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {exercitii.length === 0 ? (
        <div className="empty" data-testid="empty">
          <p className={styles.emptyTitle}>Antrenamentul tau e gol.</p>
          <p>
            Deschide un aparat din lista si apasa <strong>+ Adauga in antrenament</strong>.
            Planul se pastreaza in browser, chiar daca inchizi pagina.
          </p>
          <Link to="/" className="btn-back">
            Alege aparatele
          </Link>
        </div>
      ) : (
        <>
          <p className={styles.summary}>
            <strong>{exercitii.length}</strong> exercitii
            {totalSerii > 0 && (
              <>
                {" "}· aproximativ <strong>{totalSerii}</strong> serii de forta
              </>
            )}{" "}
            · nivel <strong>{plan.nivel}</strong>
          </p>

          {defecte.length > 0 && (
            <p className={styles.warning} role="alert">
              ⚠ {defecte.map((a) => a.nume).join(", ")}{" "}
              {defecte.length === 1 ? "este defect" : "sunt defecte"} acum. Inlocuieste-
              {defecte.length === 1 ? "l" : "le"} pentru azi sau sari peste.
            </p>
          )}

          <ol className={styles.list}>
            {randuri.map(({ aparat, program }, index) => (
              <li
                key={aparat.id}
                className={aparat.functional ? styles.item : `${styles.item} ${styles.itemDefect}`}
              >
                <span className={styles.number}>{index + 1}</span>

                <div className={styles.info}>
                  <Link to={`/aparate/${aparat.id}`} className={styles.name}>
                    <span aria-hidden="true">{EMOJI_GRUPA[aparat.grupa] ?? "🏋️"}</span>{" "}
                    {aparat.nume}
                  </Link>
                  <span className={styles.group}>
                    {ETICHETE_GRUPA[aparat.grupa] ?? aparat.grupa}
                    {!aparat.functional && " · defect"}
                  </span>
                  {program ? (
                    <dl className={styles.program}>
                      <dt>{aparat.tip === "Cardio" ? "Durata" : "Serii x rep."}</dt>
                      <dd>{program.volum}</dd>
                      <dt>{aparat.tip === "Cardio" ? "Intensitate" : "Greutate"}</dt>
                      <dd>{program.intensitate}</dd>
                      <dt>Pauza</dt>
                      <dd>{program.pauza}</dd>
                    </dl>
                  ) : (
                    <p className={styles.noProgram}>
                      Acest aparat nu are inca un program recomandat.
                    </p>
                  )}
                </div>

                <div className={styles.controls}>
                  <button
                    onClick={() => muta(index, -1)}
                    disabled={index === 0}
                    aria-label={`Muta ${aparat.nume} mai sus`}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => muta(index, 1)}
                    disabled={index === randuri.length - 1}
                    aria-label={`Muta ${aparat.nume} mai jos`}
                  >
                    ↓
                  </button>
                  <button
                    className={styles.remove}
                    onClick={() => scoate(aparat.id, aparat.nume)}
                    aria-label={`Scoate ${aparat.nume} din antrenament`}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.footer}>
            <p className={styles.tip}>
              Sfat: pune exercitiile compuse (presa, helcometru, impins) la inceput, cand esti
              odihnit, si izolarile spre final. Incalzeste-te 5-10 minute inainte.
            </p>
            <button className="btn-danger" onClick={goleste}>
              Goleste antrenamentul
            </button>
          </div>
        </>
      )}
    </section>
  );
}