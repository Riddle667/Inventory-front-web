import { User } from "@/models";
import { api } from "@/utilities";
import { ResponseAPI } from "@/utilities/ReponseApi";
import { AxiosError } from "axios";

export interface AuthServices {
  login: (email: string, password: string) => Promise<ResponseAPI>;
  register: (user: User) => Promise<ResponseAPI>;
  logout: (token: string) => Promise<ResponseAPI>;
}

export class AuthServicesImpl implements AuthServices {
  async login(email: string, password: string): Promise<ResponseAPI> {
    try {
      const { data } = await api.post<ResponseAPI>("/auth/login", {
        email,
        password,
      });
      console.log("data", data);
      return Promise.resolve(data);
    } catch (error) {
      console.log("error", error);
      const e = error as AxiosError & ResponseAPI;
      return Promise.reject(e.response?.data);
    }
  }

  async register(user: User): Promise<ResponseAPI> {
    const { name, lastname, phone, email, password } = user;
    try {
      const { data } = await api.post<ResponseAPI>("/auth/register", {
        name,
        lastname,
        phone,
        email,
        password,
      });
      return Promise.resolve(data);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      return Promise.reject(e.response?.data);
    }
  }
  async logout(token: string): Promise<ResponseAPI> {
    console.log(token);
    try {
      const { data } = await api.post<ResponseAPI>(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return Promise.resolve(data);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      return Promise.reject(e.response?.data);
    }
  }

  
}
