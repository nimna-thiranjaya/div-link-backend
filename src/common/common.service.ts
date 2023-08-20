import cloudinary from "./common.config";

const uploadImageAndGetUri = async (file: any, folder: any) => {
  try {
    return await cloudinary.uploader
      .upload(file, { folder })
      .then((data: any) => {
        return {
          url: data.secure_url,
          publicId: data.public_id,
        };
      });
  } catch (e: any) {
    throw new Error(e);
  }
};

const deleteImageByUri = async (public_id: string) => {
  try {
    return await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

export { uploadImageAndGetUri, deleteImageByUri };
