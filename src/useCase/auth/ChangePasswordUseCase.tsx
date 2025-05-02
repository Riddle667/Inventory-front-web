import { UserServicesImpl } from "@/services/user.services";
const { changePassword } = new UserServicesImpl();

export const ChangePasswordUseCase = async (
  currentPassword: string,
  newPassword: string,
  token: string
) => {
  try {
    console.log("ChangePasswordUseCase", currentPassword, newPassword, token);
    const response = await changePassword(currentPassword, newPassword, token);
    // Aquí podrías manejar el éxito, por ejemplo, almacenar un token o redirigir al usuario
    return response;
  } catch (error) {
    // Aquí puedes manejar el error de diferentes maneras según el contexto
    console.error("Error en ChangePasswordUseCase:", error);

    // Si deseas propagar el error para que el componente que invoca la función también lo maneje:
    throw error;
  }
};