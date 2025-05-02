import { UploadServicesImpl } from "@/services";
const { uploadImageProfile } = new UploadServicesImpl();

export const UpdatePhotoUseCase = async (image: File, id: number, token: string) => {
    try {
        console.log("UploadProfileUseCase", image);
        const response = await uploadImageProfile(image, id, token);
        
        console.log("response", response);

        return Promise.resolve(response);
    } catch (error) {
        console.error("Error en UploadProfileUseCase:", error);
        return Promise.reject(error);
    }
};