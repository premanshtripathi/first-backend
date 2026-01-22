import { v2 as cloudinary, v2 } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary.
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // the file has been uploaded
    console.log("file is uploaded on cloudinary", response.url);
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the operation got failed.
    return null;
  }
};

export { uploadOnCloudinary };

// cloudinary.v2.uploader.upload(
//   "",
//   { public_id: "public_id" },
//   function (error, result) {
//     console.log(result);
//   }
// );
