"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const student_1 = __importDefault(require("../models/student"));
const teacher_1 = __importDefault(require("../models/teacher"));
const subject_1 = __importDefault(require("../models/subject"));
const defaultPicture_1 = require("../defaultPic/defaultPicture");
const user_1 = require("../models/user");
class UserController {
    constructor() {
        this.teacher = require('../models/teacher');
        this.student = require('../models/student');
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let username = req.body.username;
            let password = req.body.password;
            let user = new user_1.User();
            this.student = yield student_1.default.findOne({ 'username': username, 'password': password })
                .exec();
            this.teacher = yield teacher_1.default.findOne({ 'username': username, 'password': password })
                .exec();
            if (this.teacher) {
                user.username = this.teacher.username;
                user.type = this.teacher.type;
            }
            if (this.student) {
                user.username = this.student.username;
                user.type = 1;
            }
            res.json(user);
        });
        this.isUsernameTakenStudent = (username) => __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield student_1.default.findOne({ username });
            return !!existingUser;
        });
        this.isEmailTakenStudent = (email) => __awaiter(this, void 0, void 0, function* () {
            const existingEmail = yield student_1.default.findOne({ email });
            return !!existingEmail;
        });
        this.isUsernameTakenTeacher = (username) => __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield teacher_1.default.findOne({ username });
            return !!existingUser;
        });
        this.isEmailTakenTeacher = (email) => __awaiter(this, void 0, void 0, function* () {
            const existingEmail = yield teacher_1.default.findOne({ email });
            return !!existingEmail;
        });
        this.registerStudent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (yield this.isUsernameTakenStudent(req.body.username)) {
                return res.json({ message: 'usernameTaken' });
            }
            if (yield this.isEmailTakenStudent(req.body.email)) {
                return res.json({ message: 'emailTaken' });
            }
            let user = new teacher_1.default({
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                lastname: req.body.lastname,
                gender: req.body.gender,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                profilePicture: req.file ? req.file.buffer : defaultPicture_1.defaultPicture,
                schoolType: req.body.schoolType,
                currentGrade: req.body.currentGrade,
                type: req.body.type
            });
            try {
                yield user.save();
                res.status(200).json({ message: 'ok' });
            }
            catch (error) {
                // Return an error response
                res.status(500).json({ message: 'Registration failed' });
            }
        });
        this.registerTeacherI = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (yield this.isUsernameTakenStudent(req.body.username)) {
                return res.json({ message: 'usernameTaken' });
            }
            if (yield this.isEmailTakenStudent(req.body.email)) {
                return res.json({ message: 'emailTaken' });
            }
            let user = new teacher_1.default({
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                lastname: req.body.lastname,
                gender: req.body.gender,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                profilePicture: req.file ? req.file.buffer : defaultPicture_1.defaultPicture,
                schoolType: req.body.schoolType,
                currentGrade: req.body.currentGrade,
                type: req.body.type
            });
            try {
                yield user.save();
                res.status(200).json({ message: 'ok' });
            }
            catch (error) {
                // Return an error response
                res.status(500).json({ message: 'Registration failed' });
            }
        });
        this.registerTeacherII = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let tmpUser = yield teacher_1.default.findOne({ "username": req.body.username });
            let selectedSubjectsString = req.body.selectedSubjectsList;
            let selectedSubjectsArray = selectedSubjectsString.split(",");
            let selectedAgeGroupsString = req.body.selectedAgeGroupsList;
            let selectedAgeGroupsArray = selectedAgeGroupsString.split(",");
            tmpUser.selectedSubjectsList = selectedSubjectsArray;
            tmpUser.selectedAgeGroupsList = selectedAgeGroupsArray;
            tmpUser.source = req.body.source;
            tmpUser.cvFile = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
            tmpUser.approval = 0;
            try {
                yield tmpUser.save();
                res.status(200).json({ message: 'ok' });
            }
            catch (error) {
                // Return an error response
                res.status(500).json({ message: 'Registration failed' });
            }
        });
        this.passwordsDontMatch = (oldPassword, password) => {
            return oldPassword != password;
        };
        this.passwordChange = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let tmpUser = yield student_1.default.findOne({ username: req.body.username }).exec();
            if (!tmpUser)
                tmpUser = yield teacher_1.default.findOne({ username: req.body.username }).exec();
            if (tmpUser == null) {
                return res.json('Error');
            }
            //Note that in declaration of this method these two are switched because tmpUser.password is a reference to an old password that
            //was stored in database and req.body.oldPassword is a reference to a password user has provided as old one
            let password = tmpUser.password || '';
            if (this.passwordsDontMatch(password, req.body.oldPassword)) {
                return res.json('nomatch');
            }
            try {
                tmpUser.password = req.body.newPassword;
                yield tmpUser.save();
                return res.json('success');
            }
            catch (error) {
                //     // Return an error response
                res.json('Error');
            }
        });
        this.teachersInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const activeTeachers = yield teacher_1.default.countDocuments({ approval: 1 });
            const activeStudents = yield student_1.default.countDocuments();
        });
        this.teachers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const teachers = yield teacher_1.default.find({ approval: 0 });
            res.json(teachers);
        });
        this.teachersApprove = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.email);
            let teacher = yield teacher_1.default.findOne({ 'email': req.body.email });
            console.log(teacher);
            teacher.selectedSubjectsList.forEach((subject) => __awaiter(this, void 0, void 0, function* () {
                let subjectbase = yield subject_1.default.findOne({ subject: subject });
                if (!subjectbase) {
                    let tmpSubject = new subject_1.default({
                        subject: subject,
                        teaching: teacher.username
                    });
                    yield tmpSubject.save();
                }
                else {
                    subjectbase.teaching.push(teacher.username);
                    subjectbase.save();
                }
            }));
            res.json({ message: 'ok' });
        });
    }
}
exports.UserController = UserController;
