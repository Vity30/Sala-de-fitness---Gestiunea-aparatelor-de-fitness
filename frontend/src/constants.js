// Grupele musculare intr-un singur loc, folosite de formular, card si pagina de detaliu.
// "value" este exact ca in db.json, "label" este ce vede utilizatorul.
export const GRUPE = [
  { value: "Legs", label: "Picioare", emoji: "🦵" },
  { value: "Push", label: "Piept", emoji: "🏋️" },
  { value: "Pull", label: "Spate", emoji: "🦍" },
  { value: "Arms", label: "Brate", emoji: "🦾" },
  { value: "Cardio", label: "Cardio", emoji: "🏃" },
  { value: "Core", label: "Abdomen", emoji: "🤸" },
];

// { Legs: "Picioare", Push: "Piept", ... }
export const ETICHETE_GRUPA = Object.fromEntries(GRUPE.map((g) => [g.value, g.label]));

// { Legs: "🦵", Push: "🏋️", ... }, folosit cand un aparat nu are poza
export const EMOJI_GRUPA = Object.fromEntries(GRUPE.map((g) => [g.value, g.emoji]));