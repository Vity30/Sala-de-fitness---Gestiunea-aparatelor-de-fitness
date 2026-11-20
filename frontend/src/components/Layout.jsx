import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

// Tema de pornire: cea a sistemului de operare
function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// NavLink marcheaza singur pagina curenta
function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

// Antetul, navigatia si subsolul, comune tuturor paginilor
export default function Layout() {
  const [tema, setTema] = useState(temaInitiala);

  // Tema se scrie pe elementul <html>, unde o citesc variabilele CSS
  useEffect(() => {
    document.documentElement.dataset.theme = tema;
  }, [tema]);

  // Schimbarea temei cu o estompare lina, unde browserul stie (Chrome, Edge);
  // in rest, sau daca animatiile sunt oprite din sistem, schimbarea e instantanee
  function schimbaTema() {
    const noua = tema === "dark" ? "light" : "dark";
    const aplica = () => {
      document.documentElement.dataset.theme = noua;
      flushSync(() => setTema(noua));
    };
    const faraAnimatii = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !faraAnimatii) {
      document.startViewTransition(aplica);
    } else {
      aplica();
    }
  }

  return (
    <>
      <header className={styles.header}>
        <button
          className={styles.themeToggle}
          onClick={schimbaTema}
          aria-pressed={tema === "dark"}
        >
          <span aria-hidden="true">{tema === "dark" ? "☀️" : "🌙"}</span>
          {tema === "dark" ? "Mod luminos" : "Mod intunecat"}
        </button>

        <span className={styles.eyebrow}>Inventar · Mentenanta · Grupe musculare</span>
        <h1 className={styles.title}>Sala de fitness</h1>
        <p className={styles.subtitle}>
          Gestiunea aparatelor pe grupe musculare si starea lor de functionare.
        </p>

        <nav className={styles.nav} data-testid="nav">
          <NavLink to="/" end className={navClass}>
            Aparate
          </NavLink>
          <NavLink to="/statistici" className={navClass}>
            Statistici
          </NavLink>
          <NavLink to="/antrenament" className={navClass}>
            Antrenament
          </NavLink>
          <NavLink to="/despre" className={navClass}>
            Despre
          </NavLink>
        </nav>
      </header>

      {/* Aici se deseneaza pagina potrivita cu adresa */}
      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>Proiect Tehnologii Web · Sala de fitness</footer>
    </>
  );
}