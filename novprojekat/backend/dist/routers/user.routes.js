"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller"); // D:\etf\pia\projekat\backend\src\server.ts
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/registerStudent').post(upload.single("profilePicture"), (req, res) => new user_controller_1.UserController().registerStudent(req, res));
userRouter.route('/registerTeacherI').post(upload.single("profilePicture"), (req, res) => new user_controller_1.UserController().registerTeacherI(req, res));
userRouter.route('/registerTeacherII').post(upload.single("cvFile"), (req, res) => new user_controller_1.UserController().registerTeacherII(req, res));
userRouter.route('/passwordChange').patch((req, res) => new user_controller_1.UserController().passwordChange(req, res));
userRouter.route('/teachers-info').get((req, res) => new user_controller_1.UserController().teachersInfo(req, res));
exports.default = userRouter;
