import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Subject = new Schema({
    subject: {
        type: String
    },
    teaching: {
        type: Array
    }
})

export default mongoose.model('SubjectModel', Subject, 'subjects')