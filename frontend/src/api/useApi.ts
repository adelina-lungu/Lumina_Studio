import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { ApiError } from "./client";
import { ROUTES } from "../constants";

const STATUS_MESSAGES: Record<number, string> = {
  400: "Datele trimise nu sunt valide.",
  401: "Sesiunea a expirat. Te rugam sa te autentifici din nou.",
  403: "Nu ai permisiunea de a accesa aceasta resursa.",
  404: "Resursa solicitata nu a fost gasita.",
  409: "Exista un conflict cu datele existente.",
  422: "Datele nu au putut fi procesate.",
  429: "Prea multe cereri. Incearca din nou mai tarziu.",
  500: "Eroare interna de server. Incearca din nou.",
  502: "Serverul nu este disponibil momentan.",
  503: "Serviciul este temporar indisponibil.",
};

export function useApiHandler() {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleError = useCallback((err: unknown) => {
    if (err instanceof ApiError) {
      if (err.status === 401) {
        addToast("error", STATUS_MESSAGES[401]);
        return;
      }
      if (err.status === 403) {
        navigate(ROUTES.forbidden);
        return;
      }

      const serverMsg = typeof err.body === "object" && err.body && "message" in err.body
        ? (err.body as { message: string }).message
        : null;

      addToast("error", serverMsg || STATUS_MESSAGES[err.status] || `Eroare ${err.status}`);
    } else if (err instanceof TypeError && err.message === "Failed to fetch") {
      addToast("error", "Nu s-a putut conecta la server. Verifica conexiunea.");
    } else {
      addToast("error", "A aparut o eroare neasteptata.");
    }
  }, [addToast, navigate]);

  const call = useCallback(async <T,>(fn: () => Promise<T>): Promise<T | null> => {
    try {
      return await fn();
    } catch (err) {
      handleError(err);
      return null;
    }
  }, [handleError]);

  return { call, handleError, addToast };
}
