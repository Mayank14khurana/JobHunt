const User = require('../models/userModel');
const OTP =require('../models/OTP');
const otpGenerator =require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const mailSender = require('../utils/mailSender');
const getDataUri = require('../utils/datauri');
const cloudinary  = require('../utils/cloudinary');

require('dotenv').config();

exports.sendOTP =async (req,res)=>{
    try{
       const {email} =req.body;
       const user = await User.findOne({email});
       if(user){
        return res.status(400).json({
            success:false,
            message:"User already exists"
        })
       }
       var otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
       })
       console.log("OTP",otp);
       let result = await OTP.findOne({otp:otp})
       while(result){
        otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
        })
        result =await OTP.findOne({
            otp:otp
        })
       };
       const otpPayload = {email ,otp};
       const otpBody = await OTP.create(otpPayload);
    //    OTP.create({
    //     email,otp
    //    })
        console.log(otpBody);
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp
        })
    }
    catch(err){
        console.log("Error in sending OTP", err);
        return res.status(401).json({
            success: false,
            message: "Error in sending OTP"
        })
    }
}
exports.signUp = async (req, res) => {
    try {
        const { fullName, email, password, role, otp, phoneNumber } = req.body;
        const file = req.file;

        
        console.log('Received body:', req.body);
        console.log('Received file:', file);

    
        if (!fullName || !email || !password || !role || !otp || !phoneNumber) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Profile photo is required."
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

     
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            });
        } else if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "OTP does not match"
            });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

   
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url
            }
        });

        return res.status(200).json({
            success: true,
            message: 'User Registered Successfully',
            user
        });
    } catch (err) {
        console.error(err, "error is");
        return res.status(500).json({
            success: false,
            message: "Authentication failed"
        });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        
        if (!email || !password || !role) {
            return res.status(403).json({
                success: false,
                message: "All fields are necessary"
            });
        }

       
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            });
        }

       
        if (role !== user.role) {
            return res.status(401).json({
                success: false,
                message: "User does not exist with the current role"
            });
        }

       
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Password Incorrect"
            });
        }

        
        const payload = { id: user._id ,
            role:user.role
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

      
        user.token = token;
        user.password = undefined;

       
        const options = {
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true,           
        };
        console.log(token , "token is ")
        return res.status(200).cookie('login', token, options).json({
            success: true,
            token,
            user,
            id: user._id,
            message: "Logged IN",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed during logging in"
        });
    }
};

exports.logout = async (req,res)=>{
    try{
            return res.status(200).cookie('login',"",{maxAge:0}).json({
                success:true,
                message:"Log Out successfully"
            })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in logging Out"
        })
    }
}
exports.updateProfile = async (req,res)=>{
    try{
     const {fullName,email,phoneNumber ,bio,skills} =req.body;
     const file=req.file;
    
     if(!email || !fullName || !phoneNumber || !bio || !skills ){
        return res.status(403).json({
            success:false,
            message:"All fields are necessary"
        })
       }
       const userId =req.id;
       const fileUri =getDataUri(file)
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content)
       const user = await User.findById(userId);
       
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User does not exist"
        })
    }
    skillsArray =skills.split(',');
    user.fullName= fullName;
    user.email = email;
    user.phoneNumber= phoneNumber,
    user.profile.bio =bio,
    user.profile.skills =skillsArray;
    if(cloudResponse){
        user.profile.resume=cloudResponse.secure_url
        user.profile.resumeOriginalName=file.originalName
        }
    await user.save();

    return res.status(200).json({
        success:true,
        message:"User updated successfully",
        user
    })}catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.resetPasswordOtp= async (req,res)=>{
    try{
     const {email} =req.body;
     
     const user = await User.findOne({email});
     if(!user){
        return res.status(400).json({
            success:false,
            message:"User does not exist"
        })
     }
     var otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
       })
       console.log("OTP",otp);
       let result = await OTP.findOne({otp:otp})
       while(result){
        otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
        })
        result =await OTP.findOne({
            otp:otp
        })
       };
       const otpPayload = {email ,otp};
       const otpBody = await OTP.create(otpPayload);
       OTP.create({
        email,otp
       })
        console.log(otpBody);
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
            email:email
        })
    }catch(err){
        console.log(err);
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "failed to send otp for password reset"
        })
    }
}
exports.verifyOtp = async (req,res)=>{
    try{
     const {otp,email } =req.body;
     const user = await User.findOne({email});
     console.log(otp,email,"mmmm")
     if(!user){
        return res.status(400).json({
            success:false,
            message:"User does not exist"
        })
     }
     const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
     console.log(recentOtp)
     if (recentOtp.length == 0) {
        return res.status(400).json({
            success: false,
            message: "otp not found "
        })
    } else if (otp !== recentOtp[0].otp) {
        return res.status(400).json({
            success: false,
            message: "otp does not match "
        })
    }
    return res.status(200).json({
        success:true,
        message:"Otp verified successfully",
        redirectUrl:'/resetPassword'
    })
    }catch(err){
  console.log(err)
  return res.status(500).json({
    success:false,
    message:"Error in verifying otp"
  })
    }
}
exports.resetPassword = async (req,res)=>{
    try{
        const {password,email} =req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })  
        }
        const hashedPassword= await bcrypt.hash(password,10);
        user.password= hashedPassword;
        await user.save();
        mailSender(email,"Password updated successfully",`The password for ${email} has been updated successfully`)
        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        })
    }catch(err){
        console.log(err);
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Error in reseting password"
        })
    }
}
