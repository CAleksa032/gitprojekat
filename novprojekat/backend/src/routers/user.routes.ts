import express from "express";
import { UserController } from "../controllers/user.controller"; // D:\etf\pia\projekat\backend\src\server.ts
import multer from 'multer'
const storage = multer.memoryStorage();
const upload = multer({ storage });

const userRouter = express.Router()

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/registerStudent').post(
    upload.single("profilePicture"),
    (req,res) => new UserController().registerStudent(req,res)
)

userRouter.route('/registerTeacherI').post(
    upload.single("profilePicture"),
    (req,res) => new UserController().registerTeacherI(req,res)
)

userRouter.route('/registerTeacherII').post(
    upload.single("cvFile"),
    (req,res) => new UserController().registerTeacherII(req,res)
)
userRouter.route('/passwordChange').patch(
    (req,res)=> new UserController().passwordChange(req, res)
)

userRouter.route('/teachers-info').get(
    (req,res)=> new UserController().teachersInfo(req, res)
)


export default userRouter;