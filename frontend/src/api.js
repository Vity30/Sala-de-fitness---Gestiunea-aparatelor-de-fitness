export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function fetchAparate() {
  const res = await fetch(`${API_URL}/aparate`);
  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }
  return res.json();
}