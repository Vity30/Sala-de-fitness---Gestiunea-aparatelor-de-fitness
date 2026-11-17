import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AparatePage from "./pages/AparatePage.jsx";
import AparatDetaliuPage from "./pages/AparatDetaliuPage.jsx";
import DesprePage from "./pages/DesprePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Harta rutelor. Layout inconjoara fiecare pagina.
// Ruta de detaliu foloseste resursa din tw.json: /aparate/:id
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AparatePage />} />
        <Route path="/aparate/:id" element={<AparatDetaliuPage />} />
        <Route path="/despre" element={<DesprePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}