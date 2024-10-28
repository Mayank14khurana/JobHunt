const express =require('express');
const { registerCompany, getCompany, getompanyById, updateCompany } = require('../controllers/companyController');
const isRecruiter  = require('../middlewares/isRecruiter');
const { singleUpload } = require('../middlewares/multer');

const router =express.Router();
router.post('/register',isRecruiter,registerCompany);
router.get('/get',isRecruiter, getCompany);
router.get('/get/:id',isRecruiter,getompanyById);
router.put('/update/:id', singleUpload ,isRecruiter,updateCompany);

module.exports =router; 