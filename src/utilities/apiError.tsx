import { resetUser } from "@/redux";
import { ResponseAPI } from "./ReponseApi";
import { AxiosError } from "axios";

export const handleApiError = (
  error: ResponseAPI | AxiosError,
  dispatch: any,
  navigate: any
): string => {
  if (error.message) {
    if (
      error.message === "No token provided" ||
      error.message === "token expired"
    ) {
      dispatch(resetUser());
      navigate("/", { replace: true });
      return "Sesión expirada. Por favor, inicie sesión nuevamente.";
    }
  }
  return "Ocurrió un error inesperado.";
};
