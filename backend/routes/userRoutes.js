const express=require('express');
const router= express.Router();

const {login, signUp,logout,updateProfile, sendOTP, verifyOtp, resetPasswordOtp, resetPassword} =require('../controllers/Auth');
const isAuthenticated  = require('../middlewares/isAuthenticated');
const { singleUpload } = require('../middlewares/multer');
router.post('/login', login)
router.post('/signup', singleUpload,signUp)
router.post('/getOtp',sendOTP)
router.post('/verifyOtp',verifyOtp);
router.post('/getResetOtp',resetPasswordOtp);
router.post('/resetPassword',resetPassword);
router.put('/profile/update',isAuthenticated,singleUpload,updateProfile);
router.get('/logout',logout)
module.exports =router;