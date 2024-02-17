"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Teacher = new Schema({
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
    },
    selectedSubjectsList: {
        type: String
    },
    selectedAgeGroupsList: {
        type: String
    },
    source: {
        type: String
    },
    cvFile: {
        type: Buffer
    },
    approval: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('TeacherModel', Teacher, 'teachers');
