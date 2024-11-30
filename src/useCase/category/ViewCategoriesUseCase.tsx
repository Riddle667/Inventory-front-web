import { CategoryServicesImpl } from "@/services/category.services";
const { getCategories } = new CategoryServicesImpl();

export const ViewCategoriesUseCase = async (token: string) => {
    try {
        const response = await getCategories(token);
        console.log("ViewCategoriesUseCase", response);
        return response;
    } catch (error) {
        console.error("Error en ViewCategoriesUseCase:", error);
        throw error;
    }
};