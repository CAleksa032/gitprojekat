"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// data.append('username', usernameForm)
// data.append('password', passwordForm)
// data.append('name', nameForm)
// data.append('lastname', lastnameForm)
// data.append('gender', genderForm)
// data.append('address', addressForm)
// data.append('phone', phoneForm)
// data.append('email', emailForm)
// data.append('profilePicture', profilePicture2)
// data.append('schoolType', schoolTypeForm)
// data.append('currentGrade', currentGrade2)
// data.append('type', typeForm2)
let Student = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    gender: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    schoolType: {
        type: String
    },
    currentGrade: {
        type: String
    },
    profilePicture: {
        type: Buffer
    },
    type: {
        type: String
    }
});
exports.default = mongoose_1.default.model('StudentModel', Student, 'students');
