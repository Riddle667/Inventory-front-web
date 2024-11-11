import { User } from "@/models";
import { AuthServicesImpl } from "@/services/auth.services";
const { register } = new AuthServicesImpl();

export const RegisterUseCase = async (user: User) => {
  try {
    const response = await register(user);
    // Aquí podrías manejar el éxito, por ejemplo, mostrar un mensaje de éxito
    return response;
  } catch (error) {
    // Aquí puedes manejar el error de diferentes maneras según el contexto
    console.error("Error en RegisterUseCase:", error);

    // Si deseas propagar el error para que el componente que invoca la función también lo maneje:
    throw error;
  }
  };