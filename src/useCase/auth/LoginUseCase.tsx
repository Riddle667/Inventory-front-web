import { AuthServicesImpl } from "@/services/auth.services";

const { login } = new AuthServicesImpl();

export const LoginUseCase = async (email: string, password: string) => {
  try {
    console.log("LoginUseCase", email, password);
    const response = await login(email, password);
    // Aquí podrías manejar el éxito, por ejemplo, almacenar un token o redirigir al usuario
    return response;
  } catch (error) {
    // Aquí puedes manejar el error de diferentes maneras según el contexto
    console.error("Error en LoginUseCase:", error);

    // Si deseas propagar el error para que el componente que invoca la función también lo maneje:
    throw error;
  }
};
