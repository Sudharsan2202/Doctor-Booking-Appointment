import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
// import dotenv from "dotenv"
import path from "path";




// app config
const app =express()
const port = process.env.PORT || 3000
// dotenv.config()
connectDB()
connectCloudinary()


// middlwares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true })); // for form data
app.use("/uploads", express.static("uploads"));

// api endpoints 

app.use('/api/admin',adminRouter)
// localhost:3000/api/admin/add-doctor

app.get('/',(req,res)=>{
    res.send('API WORKING')
})


app.listen(port,()=> console.log("Server Started",port))