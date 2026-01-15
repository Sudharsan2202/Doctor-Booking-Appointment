// import express from 'express'
// import { addDoctor, loginAdmin } from '../controllers/adminController.js'
// import upload from '../middewares/multer.js'
// import authAdmin from '../middewares/authAdmin.js'



// const adminRouter = express.Router()

// adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
// adminRouter.post('/login',loginAdmin)

// export default adminRouter


// // const router = express.Router();
// // router.post(
// //   "/add-doctor",
// //   upload.single("image"), // 🔴 field name MUST be "image"
// //   addDoctor
// // );
// // export default router;

import express from "express";
import upload from "../middlewares/multer.js";
import { addDoctor ,allDoctors,loginAdmin } from "../controllers/adminController.js";
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from "../controllers/doctorController.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailablity)

export default adminRouter;
