import { User } from "@/models";
import { api, ResponseAPI } from "@/utilities";
import { AxiosError } from "axios";

export interface UserServices {
    updateUserProfile: (data: User, token: string) => Promise<ResponseAPI>;
    deleteUserAccount: (id: number, token: string) => Promise<ResponseAPI>;
    changePassword: (
        currentPassword: string,
        newPassword: string,
        token: string
    ) => Promise<ResponseAPI>;
}

export class UserServicesImpl implements UserServices {
    async updateUserProfile(data: User, token: string): Promise<ResponseAPI> {
        try {
            const { data: response } = await api.put<ResponseAPI>(`/users/${data.id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return Promise.resolve(response);
        } catch (error) {
            const e = error as AxiosError & ResponseAPI;
            console.error("Error en UserServices:", error);
            return Promise.reject(e.response?.data);
        }
    }
    async deleteUserAccount(id:number,token: string ): Promise<ResponseAPI> {
        try {
            const { data } = await api.delete<ResponseAPI>(`/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return Promise.resolve(data);
        } catch (error) {
            const e = error as AxiosError & ResponseAPI;
            console.error("Error en UserServices:", error);
            return Promise.reject(e.response?.data);
        }
    }

    async changePassword(
        currentPassword: string,
        newPassword: string,
        token: string
      ): Promise<ResponseAPI> {
        try {
          const { data } = await api.post<ResponseAPI>(
            "/user/change-password",
            {
              password: currentPassword,
              newPassword: newPassword,
            },
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