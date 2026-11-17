import { useState } from "react";
import { GRUPE } from "../constants.js";
import styles from "./AparatForm.module.css";

const NUME_MAX = 100;

// Formular controlat: state-ul React este sursa de adevar pentru campuri
export default function AparatForm({ onAdd }) {
  const [nume, setNume] = useState("");
  const [grupa, setGrupa] = useState("Legs");
  const [eroare, setEroare] = useState("");
  const [trimite, setTrimite] = useState(false);

  // Intoarce mesajul de eroare sau sirul gol daca datele sunt valide
  function valideaza() {
    const n = nume.trim();
    if (n === "") return "Numele aparatului este obligatoriu.";
    if (n.length > NUME_MAX) return `Numele are maximum ${NUME_MAX} de caractere.`;
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault(); // opreste reincarcarea paginii
    const mesaj = valideaza();
    if (mesaj) {
      setEroare(mesaj);
      return; // nu se trimite nimic la server
    }
    setEroare("");
    setTrimite(true);
    try {
      // Aparatul nou porneste ca defect, pana este verificat si bifat
      await onAdd({ nume: nume.trim(), grupa, functional: false });
      setNume(""); // campurile se golesc doar daca salvarea a reusit
      setGrupa("Legs");
    } catch (err) {
      setEroare(err.message); // textul scris ramane in camp
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate data-testid="form">
      <label className={styles.field}>
        Nume aparat
        <input
          type="text"
          value={nume}
          onChange={(e) => setNume(e.target.value)}
          placeholder="Ex: Aparat pentru umeri"
          maxLength={NUME_MAX}
          aria-invalid={Boolean(eroare)}
          data-testid="form-title"
        />
        <span className={styles.charCount}>
          {nume.length}/{NUME_MAX}
        </span>
      </label>

      <label className={styles.field}>
        Grupa musculara
        <select
          value={grupa}
          onChange={(e) => setGrupa(e.target.value)}
          data-testid="form-grupa"
        >
          {GRUPE.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      </label>

      {eroare && (
        <p className="error" data-testid="form-error">
          {eroare}
        </p>
      )}

      <button
        type="submit"
        className={styles.submit}
        disabled={trimite}
        data-testid="form-submit"
      >
        {trimite ? "Se salveaza..." : "Adauga aparatul"}
      </button>

      <p className={styles.hint}>
        Aparatele noi apar ca <strong>defecte</strong> pana sunt verificate.
        Bifeaza-le din lista cand sunt functionale.
      </p>
    </form>
  );
}