// Toate cererile HTTP stau aici; componentele nu apeleaza fetch direct.
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Functie comuna: trimite JSON si arunca eroare daca raspunsul nu este 2xx
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }
  // 204 No Content nu are corp
  return res.status === 204 ? null : res.json();
}

// Citirea listei
export function fetchAparate() {
  return request("/aparate");
}

// Adaugarea: trimitem aparatul fara id, serverul il genereaza
export function createAparat(aparat) {
  return request("/aparate", { method: "POST", body: JSON.stringify(aparat) });
}

// Modificarea partiala: trimitem doar campurile schimbate
export function updateAparat(id, changes) {
  return request(`/aparate/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

// Stergerea
export function deleteAparat(id) {
  return request(`/aparate/${id}`, { method: "DELETE" });
}

// Etapa 8: un singur aparat, pentru pagina de detaliu
export function fetchAparat(id) {
  return request(`/aparate/${id}`);
}