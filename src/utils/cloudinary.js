import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', 
    api_key: 'process.env.CLOUDINARY_API_KEY', 
    api_secret: 'process.env.CLOUDINARY_API_SECERT' 
});


const uploadOnCloudinary = async (localfilepath) => {
try {
    if(!localfilepath) return null;
    //cloudinary uploding
    const response=await cloudinary.uploader
    .upload(
        'localfilepath', {
            resource_type:'auto',
        }
    )
    console.log("sucessfully uploaded to cloudinary",response);
    return response;
  
} catch (error) {
    fs.unlinkSync(localfilepath); // remove locally saved tempary files as upload got failed
    return null;
}
} 

export default uploadOnCloudinary;