import { AuthServicesImpl } from "@/services/auth.services";

const { login } = new AuthServicesImpl();

export const LoginUseCase = async (email: string, password: string) => {
  return await login(email, password);
};
