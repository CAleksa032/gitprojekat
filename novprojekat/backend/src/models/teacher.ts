import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Teacher = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name:{
        type: String
    },
    lastname:{
        type: String
    },
    gender:{
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
    selectedAgeGroupsList:{
        type: String
    },
    source:{
        type: String
    },
    cvFile:{
        type: Buffer
    },
    approval:{
        type: Number
    }
})

export default mongoose.model('TeacherModel', Teacher, 'teachers')