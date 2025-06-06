const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
     fullName:{
        type:String,
        required:true,
        trim:true
     },
     email:{
        type:String,
        required:true,
        unique:true,
        trim:true
     },
     phoneNumber:{
        type:Number,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     role:{
        type:String,
        enum:['student','recruiter'],
        required:true
     },
     profile:{
        bio:{
            type:String
        },
        skills:[ {type:String}],
        resume:{
            type:String
        },
        resumeOriginalName:{
            type:String,
        },
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Company'
        },
        profilePhoto:{
            type:String,
            default:''
        }
     }
},{timestamps:true});
module.exports = mongoose.model("User" ,userSchema)
