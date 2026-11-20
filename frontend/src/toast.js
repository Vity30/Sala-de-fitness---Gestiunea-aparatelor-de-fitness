import { createContext, useContext } from "react";

// Contextul prin care orice pagina poate afisa o notificare scurta
export const ToastContext = createContext(null);

// Folosire: const arataToast = useToast(); arataToast("Salvat");
export function useToast() {
  const arataToast = useContext(ToastContext);
  if (!arataToast) {
    throw new Error("useToast trebuie folosit in interiorul lui ToastProvider");
  }
  return arataToast;
}