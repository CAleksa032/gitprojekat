import express from 'express'
import StudentModel from '../models/student'
import TeacherModel from '../models/teacher'
import { defaultPicture } from '../defaultPic/defaultPicture'
import { Request, Response } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { User } from '../models/user'
export class UserController{
    teacher = require('../models/teacher');
    student = require('../models/student')
    
    login = async (req: express.Request, res:express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        let user: User = new User();
        
        this.student = await StudentModel.findOne(
            {'username': username, 'password': password}
            )
        .exec()
        this.teacher = await TeacherModel.findOne(
            {'username': username, 'password': password}
            )
        .exec()
        
        if(this.teacher){
            user.username = this.teacher.username;
            user.type = this.teacher.type;
        }

        if(this.student){
            user.username = this.student.username;
            user.type = 1;
        }
        res.json(user);

    }

    isUsernameTakenStudent = async (username: string) => {
        const existingUser = await StudentModel.findOne({ username });
        return !!existingUser;
    };
      
    isEmailTakenStudent = async (email: string) => {
        const existingEmail = await StudentModel.findOne({ email });
        return !!existingEmail;
    };
    
    isUsernameTakenTeacher = async (username: string) => {
        const existingUser = await TeacherModel.findOne({ username });
        return !!existingUser;
    };
      
    isEmailTakenTeacher = async (email: string) => {
        const existingEmail = await TeacherModel.findOne({ email });
        return !!existingEmail;
    };

    registerStudent = async (req: express.Request, res: express.Response)=>{
        if (await this.isUsernameTakenStudent(req.body.username)) {
            return res.json({ message: 'usernameTaken' });
        }
        if(await this.isEmailTakenStudent(req.body.email)){
            return res.json({ message: 'emailTaken'})
        }
        let user = new TeacherModel({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            lastname: req.body.lastname,
            gender: req.body.gender,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            profilePicture: req.file ? req.file.buffer : defaultPicture,
            schoolType: req.body.schoolType,
            currentGrade: req.body.currentGrade,
            type: req.body.type
        })
        

        try{
            await user.save();

            res.status(200).json({ message: 'ok' });
        }   catch (error) {
            // Return an error response
            res.status(500).json({ message: 'Registration failed'});
        }
        
    }

    registerTeacherI = async (req: express.Request, res: express.Response)=>{
        if (await this.isUsernameTakenStudent(req.body.username)) {
            return res.json({ message: 'usernameTaken' });
        }
        if(await this.isEmailTakenStudent(req.body.email)){
            return res.json({ message: 'emailTaken'})
        }
        let user = new TeacherModel({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            lastname: req.body.lastname,
            gender: req.body.gender,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            profilePicture: req.file ? req.file.buffer : defaultPicture,
            schoolType: req.body.schoolType,
            currentGrade: req.body.currentGrade,
            type: req.body.type
        })
        

        try{
            await user.save();

            res.status(200).json({ message: 'ok' });
        }   catch (error) {
            // Return an error response
            res.status(500).json({ message: 'Registration failed'});
        }
        
    }

    registerTeacherII = async (req: express.Request, res: express.Response)=>{
        let tmpUser = await TeacherModel.findOne({ "username": req.body.username })
        let selectedSubjectsString = req.body.selectedSubjectsList as String;
        let selectedSubjectsArray = selectedSubjectsString.split(",")
        let selectedAgeGroupsString = req.body.selectedAgeGroupsList as String;
        let selectedAgeGroupsArray = selectedAgeGroupsString.split(",")
        console.log(selectedSubjectsArray)
        tmpUser!.selectedSubjectsList = selectedSubjectsArray;
        tmpUser!.selectedAgeGroupsList = selectedAgeGroupsArray;
        tmpUser!.source = req.body.source
        tmpUser!.cvFile = req.file?.buffer 
        tmpUser!.approval = 0;

        try{
            await tmpUser!.save();

            res.status(200).json({ message: 'ok' });
        }   catch (error) {
            // Return an error response
            res.status(500).json({ message: 'Registration failed'});
        }
        
    }


    passwordsDontMatch = (oldPassword: string, password: string) => {
        return oldPassword != password
    };

    passwordChange = async (req: express.Request, res: express.Response)=>{
        let tmpUser = await StudentModel.findOne( {username: req.body.username}).exec();
        if(!tmpUser)  tmpUser = await TeacherModel.findOne( {username: req.body.username}).exec();
        if(tmpUser == null){
            return res.json('Error')
        }
        
        //Note that in declaration of this method these two are switched because tmpUser.password is a reference to an old password that
        //was stored in database and req.body.oldPassword is a reference to a password user has provided as old one
        let password: string = tmpUser.password || '';
        if (this.passwordsDontMatch(password, req.body.oldPassword)) {
            return res.json('nomatch');
        }
        
        try{
            tmpUser.password = req.body.newPassword
            
            await tmpUser.save()
            return res.json('success')
            
        }catch (error) {
        //     // Return an error response
            res.json('Error');
        }
    }
    teachersInfo = async (req: express.Request, res: express.Response)=>{
        const activeTeachers = await TeacherModel.countDocuments({ approval: 1 });
        const activeStudents = await StudentModel.countDocuments();

    }
}