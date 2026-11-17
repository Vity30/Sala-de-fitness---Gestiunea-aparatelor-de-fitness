import { useState } from "react";

// Grupele musculare: "value" este exact ca in db.json, "label" este ce vede utilizatorul
const GRUPE = [
  { value: "Legs", label: "Picioare" },
  { value: "Push", label: "Piept" },
  { value: "Pull", label: "Spate" },
  { value: "Arms", label: "Brate" },
  { value: "Cardio", label: "Cardio" },
  { value: "Core", label: "Abdomen" },
];
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
    <form className="task-form" onSubmit={handleSubmit} noValidate data-testid="form">
      <label>
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
        <span className="char-count">
          {nume.length}/{NUME_MAX}
        </span>
      </label>

      <label>
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
        className="btn-submit"
        disabled={trimite}
        data-testid="form-submit"
      >
        {trimite ? "Se salveaza..." : "Adauga aparatul"}
      </button>

      <p className="form-hint">
        Aparatele noi apar ca <strong>defecte</strong> pana sunt verificate.
        Bifeaza-le din lista cand sunt functionale.
      </p>
    </form>
  );
}