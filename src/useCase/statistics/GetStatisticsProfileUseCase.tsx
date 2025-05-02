import { StatisticsServicesImpl } from "@/services";
const { getStatisticsProfile } = new StatisticsServicesImpl();

export const GetStatisticsProfileUseCase = async (token: string) => {
    try {
        console.log("GetStatisticsProfileUseCase", token);
        const response = await getStatisticsProfile(token);
        // Aquí podrías manejar el éxito, por ejemplo, almacenar un token o redirigir al usuario
        return response;
    } catch (error) {
        // Aquí puedes manejar el error de diferentes maneras según el contexto
        console.error("Error en GetStatisticsProfileUseCase:", error);
    
        // Si deseas propagar el error para que el componente que invoca la función también lo maneje:
        throw error;
    }
};
