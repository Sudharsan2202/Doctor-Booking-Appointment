import { v2 as cloudinary } from 'cloudinary'
import bcrypt from 'bcrypt'
import doctorModel from '../models/doctorModel.js'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const addDoctor = async (req, res) => {
    try {
       
        console.log("FILE:", req.file);
console.log("BODY:", req.body);

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file.path

        // Checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // Validating strong password
        if (password.length < 6) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // Hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(
      imageFile.path,
      { resource_type: "image" }
    );

    const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address), // Parsing the stringified address from frontend
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: "Doctor Added Successfully" })

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