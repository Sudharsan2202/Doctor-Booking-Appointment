import express from 'express'
import { addDoctor, loginAdmin } from '../controllers/adminController.js'
import upload from '../middewares/multer.js'
import authAdmin from '../middewares/authAdmin.js'



const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)

export default adminRouter


// const router = express.Router();
// router.post(
//   "/add-doctor",
//   upload.single("image"), // 🔴 field name MUST be "image"
//   addDoctor
// );
// export default router;
