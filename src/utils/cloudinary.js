import { v2 as cloudinary } from 'cloudinary';
import fs from  "fs"

dotenv.config();

// Log environment variables for debugging
console.log('Cloudinary Env Variables:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing'
});


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (localFilePath) => {
   try {
     if (!localFilePath) return null
        // uplaod the file on cloudinary 
    const response =   await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        // file has been uplaoded successfull
console.log("file is uploaded on cloudinary", response.url);
    return response.url
   } catch (error) {
     fs.unlinkSync(localFilePath) 
     return null 
   }

}


export {uploadOnCloudinary}
