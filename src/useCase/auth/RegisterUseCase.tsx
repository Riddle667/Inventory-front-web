import { User } from "@/models";
import { AuthServicesImpl } from "@/services/auth.services";
const { register } = new AuthServicesImpl();

export const RegisterUseCase = async (user: User) => {
    return register(user);
  };