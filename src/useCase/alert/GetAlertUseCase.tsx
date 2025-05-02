import { AlertServiceImp } from "@/services/alert.services";
const { getAlerts } = new AlertServiceImp();

export const GetAlertUseCase = async (token: string) => {
    try {
        const response = await getAlerts(token);
        return response;
    }
    catch (error) {
        console.error("Error en GetAlertUseCase:", error);
        throw error;
    }
}