import { api, ResponseAPI } from "@/utilities";
import { AxiosError } from "axios";


export interface AlertService {
    getAlerts: (token: string) => Promise<ResponseAPI>;
    }

export class AlertServiceImp implements AlertService {
    async getAlerts(token: string): Promise<ResponseAPI> {
        try {
            const {data} = await api.get<ResponseAPI>("/alert/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("data", data);
            return Promise.resolve(data);
        } catch (error) {
            const e = error as ResponseAPI & AxiosError;
            console.error("Error fetching alerts:", e.response?.data);
            return Promise.reject(e.response?.data);
        }
    }
}