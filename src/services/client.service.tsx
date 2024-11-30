import { Client } from "@/models";
import { api, ResponseAPI } from "@/utilities";
import { AxiosError } from "axios";

export interface ClientServices {
  createClient: (client: Client, token: string) => Promise<ResponseAPI>;
  updateClient: (client: Client, token: string) => Promise<ResponseAPI>;
  addBlackList: (id: number, token: string) => Promise<ResponseAPI>;
  getClient: (id: number, token: string) => Promise<ResponseAPI>;
  getClients: (token: string) => Promise<ResponseAPI>;
}

export class ClientServicesImpl implements ClientServices {
  async createClient(client: Client, token: string): Promise<ResponseAPI> {
    try {
      const { name, lastName, phone, address, rut } = client;
      const { data } = await api.post<ResponseAPI>(
        "/client/create-client",
        { name, lastName, phone, address, rut },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Cliente creado con éxito:", data);
      return Promise.resolve(data);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      console.error("Error en ClientServices:", error);
      return Promise.reject(e.response?.data);
    }
  }

  async updateClient(client: Client, token: string): Promise<ResponseAPI> {
    try {
      const { id, name, lastName, phone, address, rut } = client;
      const { data } = await api.put<ResponseAPI>(
        `/client/edit-client/${id}`,
        { name, lastName, phone, address, rut },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Cliente actualizado con éxito:", data);
      return Promise.resolve(data);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      console.error("Error en ClientServices:", error);
      return Promise.reject(e.response?.data);
    }
  }

  async addBlackList(id: number, token: string): Promise<ResponseAPI> {
    try {
      console.log(token)
      const { data } = await api.get<ResponseAPI>(
        `/client/add-blacklist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Cliente añadido a la lista negra con éxito:", data);
      return Promise.resolve(data);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      console.error("Error en ClientServices:", error);
      return Promise.reject(e.response?.data);
    }
  }

  async getClient(id: number, token: string): Promise<ResponseAPI> {
    try {
      const { data } = await api.get<ResponseAPI>(`/client/get-client/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Cliente obtenido con éxito:", data);
      return Promise.resolve(data);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      console.error("Error en ClientServices:", error);
      return Promise.reject(e.response?.data);
    }
  }

  async getClients(token: string): Promise<ResponseAPI> {
    try {
      const { data } = await api.get<ResponseAPI>("/client/get-clients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Clientes obtenidos con éxito:", data);
      return Promise.resolve(data);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      console.error("Error en ClientServices:", error);
      return Promise.reject(e.response?.data);
    }
  }
}
