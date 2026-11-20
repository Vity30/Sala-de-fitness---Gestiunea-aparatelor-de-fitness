import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAparat, updateAparat } from "../api.js";
import { comutaAparat, citesteAntrenament, contineAparat } from "../antrenament.js";
import { EMOJI_GRUPA, ETICHETE_GRUPA } from "../constants.js";
import { dataAzi, formateazaData } from "../dateUtils.js";
import { useToast } from "../toast.js";
import styles from "./AparatDetaliuPage.module.css";

// Pagina unui singur aparat, la adresa /aparate/:id
export default function AparatDetaliuPage() {
  const { id } = useParams(); // text din adresa, de exemplu "3"
  const [aparat, setAparat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inAntrenament, setInAntrenament] = useState(() =>
    contineAparat(citesteAntrenament(), id)
  );
  const [nota, setNota] = useState("");
  const [editeazaNota, setEditeazaNota] = useState(false);
  const [salveaza, setSalveaza] = useState(false);
  const [pozaLipsa, setPozaLipsa] = useState(false);
  const arataToast = useToast();

  // Se reincarca daca se schimba id-ul din adresa
  useEffect(() => {
    let ignore = false;

    fetchAparat(id)
      .then((data) => {
        if (!ignore) {
          setAparat(data);
          setNota(data.defectNota ?? "");
          setInAntrenament(contineAparat(citesteAntrenament(), id));
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

  // Schimba starea direct din pagina de detaliu (aceeasi regula ca in lista)
  async function comutaStarea() {
    const devineFunctional = !aparat.functional;
    const schimbari = devineFunctional
      ? { functional: true, defectData: null, defectNota: null }
      : { functional: false, defectData: dataAzi() };
    setSalveaza(true);
    try {
      const actualizat = await updateAparat(aparat.id, schimbari);
      setAparat(actualizat);
      setNota(actualizat.defectNota ?? "");
      setEditeazaNota(!devineFunctional); // la un defect nou, propunem direct scrierea notei
      arataToast(devineFunctional ? "Aparatul este din nou functional." : "Aparatul a fost marcat ca defect.", {
        tip: devineFunctional ? "succes" : "info",
      });
    } catch (err) {
      arataToast(`Nu am putut salva: ${err.message}`, { tip: "eroare" });
    } finally {
      setSalveaza(false);
    }
  }

  // Salveaza nota de mentenanta (doar campul defectNota)
  async function salveazaNota(e) {
    e.preventDefault();
    setSalveaza(true);
    try {
      const actualizat = await updateAparat(aparat.id, { defectNota: nota.trim() });
      setAparat(actualizat);
      setEditeazaNota(false);
      arataToast("Nota de mentenanta a fost salvata.");
    } catch (err) {
      arataToast(`Nu am putut salva nota: ${err.message}`, { tip: "eroare" });
    } finally {
      setSalveaza(false);
    }
  }

  // Adauga sau scoate aparatul din antrenamentul personal (localStorage)
  function comutaAntrenament() {
    const nou = comutaAparat(aparat.id);
    const acum = contineAparat(nou, aparat.id);
    setInAntrenament(acum);
    arataToast(acum ? "Adaugat in antrenamentul tau." : "Scos din antrenamentul tau.", {
      tip: acum ? "succes" : "info",
    });
  }

  const cod = `#SYS-${String(aparat.id).padStart(3, "0")}`;

  // Campurile noi pot lipsi (de exemplu la aparatele adaugate din formular)
  const pasi = aparat.pasi ?? [];
  const greseli = aparat.greseli ?? [];
  const program = aparat.program ?? [];
  const principali = aparat.muschiPrincipali ?? (aparat.muschi ? [aparat.muschi] : []);
  const secundari = aparat.muschiSecundari ?? [];
  const cautareVideo = encodeURIComponent(aparat.videoCautare || `${aparat.nume} executie corecta`);

  return (
    <section className={`panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className="btn-back">
        ← Inapoi la lista de aparate
      </Link>

      {/* Sus: poza in stanga, prezentarea in dreapta */}
      <div className={styles.grid}>
        <div>
          {aparat.img && !pozaLipsa ? (
            <img
              src={aparat.img}
              alt={aparat.nume}
              onError={() => setPozaLipsa(true)}
              className={aparat.functional ? styles.img : `${styles.img} ${styles.imgDefect}`}
            />
          ) : (
            <div className={`img-placeholder ${styles.img} ${styles.placeholder}`}>
              <span>{EMOJI_GRUPA[aparat.grupa] ?? "🏋️"}</span>
              <small>Fara poza</small>
            </div>
          )}
          <span className={styles.sysCode}>{cod}</span>

          {/* Actiuni rapide */}
          <div className={styles.actions}>
            <button
              className={inAntrenament ? `${styles.actionBtn} ${styles.actionOn}` : styles.actionBtn}
              onClick={comutaAntrenament}
              aria-pressed={inAntrenament}
              data-testid="detail-workout"
            >
              {inAntrenament ? "✓ In antrenamentul tau" : "+ Adauga in antrenament"}
            </button>
            <button
              className={styles.actionBtn}
              onClick={comutaStarea}
              disabled={salveaza}
              data-testid="detail-toggle"
            >
              {aparat.functional ? "✕ Marcheaza ca defect" : "✓ Marcheaza ca reparat"}
            </button>
          </div>
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

          {/* Jurnalul de mentenanta, doar pentru aparatele defecte */}
          {!aparat.functional && (
            <div className={styles.maintenance} data-testid="maintenance">
              <div className={styles.maintenanceHead}>
                <h3>🔧 Mentenanta</h3>
                {aparat.defectData && (
                  <span className={styles.maintenanceDate}>
                    Semnalat pe {formateazaData(aparat.defectData)}
                  </span>
                )}
              </div>

              {editeazaNota ? (
                <form onSubmit={salveazaNota} className={styles.noteForm}>
                  <textarea
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    placeholder="Ce s-a stricat si ce urmeaza? Ex: cablul rupt, piesa comandata."
                    maxLength={300}
                    rows={3}
                    aria-label="Nota de mentenanta"
                  />
                  <div className={styles.noteButtons}>
                    <button type="submit" className={styles.saveBtn} disabled={salveaza}>
                      {salveaza ? "Se salveaza..." : "Salveaza nota"}
                    </button>
                    <button
                      type="button"
                      className={styles.cancelBtn}
                      onClick={() => {
                        setNota(aparat.defectNota ?? "");
                        setEditeazaNota(false);
                      }}
                    >
                      Renunta
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p>{aparat.defectNota || "Nu a fost adaugata inca o nota despre defect."}</p>
                  <button className={styles.editBtn} onClick={() => setEditeazaNota(true)}>
                    {aparat.defectNota ? "Modifica nota" : "Adauga o nota"}
                  </button>
                </>
              )}
            </div>
          )}

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

      {/* Demonstratia video: player daca aparatul are un id YouTube, altfel cautare */}
      <div className={`${styles.block} ${styles.videoBlock}`}>
        <h3>Demonstratie video</h3>
        {aparat.video ? (
          <div className={styles.videoFrame}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${aparat.video}`}
              title={`Demonstratie: ${aparat.nume}`}
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <p>
            Vezi cum arata miscarea facuta corect. Uita-te la doua-trei clipuri de la
            antrenori diferiti si urmareste mai ales pozitia de start si ritmul coborarii.
          </p>
        )}
        <a
          className={styles.videoLink}
          href={`https://www.youtube.com/results?search_query=${cautareVideo}`}
          target="_blank"
          rel="noreferrer"
        >
          ▶ {aparat.video ? "Mai multe clipuri pe YouTube" : "Cauta demonstratii pe YouTube"}
        </a>
      </div>

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