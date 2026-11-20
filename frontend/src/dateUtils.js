// Data de azi in formatul folosit in db.json: 2026-11-20
export function dataAzi() {
  const d = new Date();
  const luna = String(d.getMonth() + 1).padStart(2, "0");
  const zi = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${luna}-${zi}`;
}

// "2026-11-20" -> "20.11.2026"
export function formateazaData(iso) {
  if (!iso) return "";
  const [an, luna, zi] = iso.split("-");
  return `${zi}.${luna}.${an}`;
}