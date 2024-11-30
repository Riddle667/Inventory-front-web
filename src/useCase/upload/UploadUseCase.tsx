import { UploadServicesImpl } from "@/services/upload.services";
const { uploadImages } = new UploadServicesImpl();

export const UploadUseCase = async (images: File[], id: number, token: string) => {
    try {
        const response = await uploadImages(images, id, token);
        console.log("UploadUseCase", images);
        console.log("response", response);

        return Promise.resolve(response);
    } catch (error) {
        console.error("Error en UploadUseCase:", error);
        return Promise.reject(error);
    }
}
