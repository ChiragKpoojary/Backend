import {asynchandler} from '../utils/asynchandler.js';
import apierror from "../utils/apierror.js";
import user from "../models/user.models.js";
import uploadcloudinary from "../utils/cloudinary.js";
import apiresponse from "../utils/apiresponse.js";
const registerUser =asynchandler(async (req,res)=>{
   //take userdetails
   //validation
   //check if user already exists :email
   //check for avatar
   //upload cloudinary , cloudinary
   // create use object - create entry in db
   //remove password and refresh token feild from response
   //check for user creation
   //return response
   
const {fullname,email,username,password}=req.body
  if([fullname,email,username,password].some((field)=>
     field?.trim()===""
  )){
    throw new apierror(400,"All feilds are compalsary")
  }
  const existeduser = user.findOne({
    $or: [{username},{email}]
  })
  if (existeduser) {
    throw new apierror(409,"User with email or usename already exists");
  }
  const avatarlocalpath = req.files?.avatar[0]?.path;
  const coverimagelocalpath = req.files?.coverimage[0]?.path;
  if (!avatarlocalpath) {
    throw new apierror(400,"avatar file is required");
  }
  const avatar=await uploadcloudinary(avatarlocalpath);
  const coverimg=await uploadcloudinary(coverimagelocalpath);
   if(!avatar){
    throw new apierror(400,"avatar is required")
  }
  const user = await user.create({
    fullname,
    avatar:avatar.url,
    coverimage:coverimg?.url ||"",
    email,
    password,
    username:username.toLowerCase()
  })
 const createduser =await user.findById(user._id).select(
    "-password -refreshtoken"
  )

  if(!createduser){
throw new apierror(500,"something went wrong while registering")
  
  }
  return res.status(201).json(
    new apiresponse(200,createduser,"user registered suessfully")
  )

})

export {registerUser,};
