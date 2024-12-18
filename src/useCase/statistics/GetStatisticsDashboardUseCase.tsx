import { StatisticsServicesImpl } from "@/services/statistics.services";
const { getStatisticsDashboard } = new StatisticsServicesImpl();

export const GetStatisticsDashboardUseCase = async () => {
    const statistics = await getStatisticsDashboard();
    return statistics;
}