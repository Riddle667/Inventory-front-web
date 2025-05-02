import { AuthServicesImpl } from "@/services";
const { logout } = new AuthServicesImpl();

export const LogoutUseCase = async (token:string) => {
  try {
    const response = await logout(token);
    // Aquí podrías manejar el éxito, por ejemplo, almacenar un token o redirigir al usuario
    return response;
  } catch (error) {
    // Aquí puedes manejar el error de diferentes maneras según el contexto
    console.error("Error en LogoutUseCase:", error);

    // Si deseas propagar el error para que el componente que invoca la función también lo maneje:
    throw error;
  }
};