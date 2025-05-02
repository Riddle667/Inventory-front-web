import { api, ResponseAPI } from "@/utilities";
import { AxiosError } from "axios";



export interface UploadServices {
    uploadImages: (images: File[], id: number, token: string) => Promise<ResponseAPI>;
    uploadImageProfile: (image: File, id: number, token: string) => Promise<ResponseAPI>;
}

export class UploadServicesImpl implements UploadServices {
    async uploadImages(images: File[], id: number, token: string): Promise<ResponseAPI> {
        try {
            const formData = new FormData();
            images.forEach((image) => {
                formData.append("archive", image, image.name);
            });

            const { data } = await api.put<ResponseAPI>(`/upload/products/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Imágenes subidas con éxito:", data);
            return Promise.resolve(data);
        } catch (error) {
            const e = error as AxiosError & ResponseAPI;
            console.error("Error en UploadServices:", error);
            return Promise.reject(e.response?.data);
        }
    }

    async uploadImageProfile(image: File, id: number, token: string): Promise<ResponseAPI> {
        try {
            const formData = new FormData();
            formData.append("archive", image, image.name);

            const { data } = await api.put<ResponseAPI>(`/upload/users/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Imagen de perfil subida con éxito:", data);
            return Promise.resolve(data);
        } catch (error) {
            const e = error as AxiosError & ResponseAPI;
            console.error("Error en UploadServices:", error);
            return Promise.reject(e.response?.data);
        }
    }
}