import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary =async ()=>{

    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_SECRET_KEY
    })
}

async function uploadImage(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "my_uploads", // Optional: organizes files into a folder
      use_filename: true    // Optional: keeps the original file name
    });
    
    console.log("Upload Successful!");
    console.log("URL:", result.secure_url); // This is the link to your image
    return result.secure_url;
  } catch (error) {
    console.error("Upload Error:", error);
  }
}

export default connectCloudinary