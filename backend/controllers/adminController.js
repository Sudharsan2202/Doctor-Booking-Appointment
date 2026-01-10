import validator from 'validator'
import bycrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'


// Api for adding doctor 
//  const addDoctor = async (req,res) =>{

//     try {

//         const {name, email, password, speciality,degree, experience, about, fees, address} =req.body


//         // checking for all data to add doctor

//         if (!name|| !email || !password || !speciality|| !degree || !experience || !about || !fees || !address) {
            
//             return res.json({success:false,message:"Missing Details"})
//         } 

//         // validating email format 
//         if (!validator.isEmail(email)) {
//             return res.json({success:false,message:"Please enter a valid email"})
            
//         }
        
//         // validating password 
//         if(password.length < 6){
//             return res.json({success:false,message:"Please enter a strong password"})
//         }

//         // hashing doctor password
//         const salt = await bycrypt.genSalt(10)
//         const hashedPassword =await bycrypt.hash(password,salt)

//         // upload image to cloudinary
        
// const imageFile = req.file

// if (!imageFile) {
//   return res.json({ success: false, message: "Image is required" })
// }

// const imageUpload = await cloudinary.uploader.upload(
//   imageFile.path,
//   { resource_type: "image" }
// )

// const imageUrl = imageUpload.secure_url


//         const doctorData ={
//             name, 
//             email,
//             image:imageUrl, 
//             password:hashedPassword, 
//             speciality,
//             degree, 
//             experience, 
//             about, 
//             fees, 
//             address:JSON.parse(address),
//             date:Date.now()           

//         }

//         const newDoctor =new doctorModel(doctorData) 
//         await newDoctor.save()

//         res.json({success:true,message:"Doctor Added"})

        
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
        
//     }
//  }

const addDoctor = async (req, res) => {
  try {
    // console.log("HEADERS:", req.headers["content-type"])
    // console.log("BODY:", req.body)
    // console.log("FILE:", req.file)

    // if (!req.file) {
    //   return res.json({
    //     success: false,
    //     message: "Image is required"
    //   })
    // }

    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address
    } = req.body || {}

    if (
      !name || !email || !password || !speciality ||
      !degree || !experience || !about || !fees || !address
    ) {
      return res.json({ success: false, message: "Missing Details" })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" })
    }

    if (password.length < 6) {
      return res.json({ success: false, message: "Weak password" })
    }

    const salt = await bycrypt.genSalt(10)
    const hashedPassword = await bycrypt.hash(password, salt)

    // ✅ Cloudinary upload
    const imageFile = req.file
    // const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
    //   resource_type: "image"
    // })

    

if (!imageFile) {
  return res.json({ success: false, message: "Image is required" })
}

const imageUpload = await cloudinary.uploader.upload(
  imageFile.path,
  { resource_type: "image" }
)

const imageUrl = imageUpload.secure_url

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl, // 👈 REQUIRED
      speciality,
      degree,
      experience,
      about,
      fees,
      address: typeof address === "string" ? JSON.parse(address) : address,
      date: Date.now()
    }

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()

    res.json({ success: true, message: "Doctor Added" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// APL FOR Adin login

const loginAdmin =async (req,res) =>{
    try {

        const {email,password} =req.body

        if (email === process.env.ADMIE_EMAIL &&
             password === process.env.ADMIE_PASSWORD) {
                
                const token =jwt.sign(email+password, process.env.JWT_SECRET)
                res.json({ success:true ,token})  
                
        }else{
        res.json({ success: false, message: 'invalid credentials' })        

        }

        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })        
    }
}
 export {addDoctor,loginAdmin}