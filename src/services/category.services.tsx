import { api, ResponseAPI } from "@/utilities";
import { AxiosError } from "axios";

export interface CategoryServices {
    createCategory: (name: string, token: string) => Promise<ResponseAPI>;
    updateCategory: (id: string, name: string) => Promise<ResponseAPI>;
    deleteCategory: (id: string) => Promise<ResponseAPI>;
    getCategory: (id: string) => Promise<ResponseAPI>;
    getCategories: (token: string) => Promise<ResponseAPI>;
}


export class CategoryServicesImpl implements CategoryServices {

    async createCategory(name: string, token: string): Promise<ResponseAPI> {
        try {
            console.log("categoryServices", name, token);
            // Asegúrate de enviar `name` dentro de un objeto
            const { data } = await api.post<ResponseAPI>("/category/create-category", { name }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("CreateCategoryUseCase", name);
            console.log("data", data);
            return Promise.resolve(data);
        } catch (error) {
            const e = error as AxiosError & ResponseAPI;
            console.error("Error en CategoryServices:", error);
            return Promise.reject(e.response?.data);
        }
    }
    
    async updateCategory(id: string, name: string): Promise<ResponseAPI> {
        try {
            console.log("UpdateCategoryUseCase", id, name);
            // Aquí podrías manejar el éxito, por ejemplo, almacenar un token o redirigir al usuario
            return Promise.resolve({ status: 200, message: "Categoria actualizada correctamente" });
        } catch (error) {
            // Aquí puedes manejar el error de diferentes maneras según el contexto
            console.error("Error en UpdateCategoryUseCase:", error);
            // Si deseas propagar el error para que el componente que invoca la función también lo maneje:
            return Promise.reject({ status: 500, message: "Error al actualizar la categoria" });
        }
    }

    async deleteCategory(id: string): Promise<ResponseAPI> {
        try {
            console.log("DeleteCategoryUseCase", id);
            // Aquí podrías manejar el éxito, por ejemplo, almacenar un token o redirigir al usuario
            return Promise.resolve({ status: 200, message: "Categoria eliminada correctamente" });
        } catch (error) {
            // Aquí puedes manejar el error de diferentes maneras según el contexto
            console.error("Error en DeleteCategoryUseCase:", error);
            // Si deseas propagar el error para que el componente que invoca la función también lo maneje:
            return Promise.reject({ status: 500, message: "Error al eliminar la categoria" });
        }
    }

    async getCategory(id: string): Promise<ResponseAPI> {
        try {
            console.log("GetCategoryUseCase", id);
            // Aquí podrías manejar el éxito, por ejemplo, almacenar un token o redirigir al usuario
            return Promise.resolve({ status: 200, message: "Categoria obtenida correctamente" });
        } catch (error) {
            // Aquí puedes manejar el error de diferentes maneras según el contexto
            console.error("Error en GetCategoryUseCase:", error);
            // Si deseas propagar el error para que el componente que invoca la función también lo maneje:
            return Promise.reject({ status: 500, message: "Error al obtener la categoria" });
        }

    }

    async getCategories(token: string): Promise<ResponseAPI> {
        try {
            console.log("GetCategoriesUseCase");
            // Aquí podrías manejar el éxito, por ejemplo, almacenar un token o redirigir al usuario
            const { data } = await api.get<ResponseAPI>("/category/get-categories", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            return Promise.resolve(data);
        } catch (error) {
            const e = error as AxiosError & ResponseAPI;
            console.error("Error en CategoryServices:", error);
            return Promise.reject(e.response?.data);
        }
    }
}