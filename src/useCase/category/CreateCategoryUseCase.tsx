// CreateCategoryUseCase.ts
import { CategoryServicesImpl } from "@/services/category.services";
const { createCategory } = new CategoryServicesImpl();

export const CreateCategoryUseCase = async (name: string, token: string) => {
    try {
        console.log(name);
        const response = await createCategory(name, token);
        console.log("CreateCategoryUseCase", name);
        return response;
    } catch (error) {
        console.error("Error en CreateCategoryUseCase:", error);
        
        throw error;
    }
};
