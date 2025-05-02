import { api, ResponseAPI } from "@/utilities";
import { AxiosError } from "axios";


export interface StatisticsServices {
    getStatisticsDashboard: () => Promise<ResponseAPI>;
    getStatisticsProfile: (token: string) => Promise<ResponseAPI>;
}


export class StatisticsServicesImpl implements StatisticsServices {
    async getStatisticsDashboard(): Promise<ResponseAPI> {
        try {
            const { data } = await api.get<ResponseAPI>(
                "/statistics/get-statistics-dashboard"
            );

            console.log(data);

            return Promise.resolve(data);
        } catch (error) {
            const e = error as AxiosError & ResponseAPI;
            return Promise.reject(e.response?.data);
        }
    }

    async getStatisticsProfile(token: string): Promise<ResponseAPI> {
        try {
            const { data } = await api.get<ResponseAPI>(
                "/statistics/get-statistics-profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(data);

            return Promise.resolve(data);
        } catch (error) {
            const e = error as AxiosError & ResponseAPI;
            return Promise.reject(e.response?.data);
        }
    }
}