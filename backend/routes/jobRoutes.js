const express =require('express');
const router =express.Router();


const isRecruiter  = require('../middlewares/isRecruiter');
const isAuthenicated =require('../middlewares/isAuthenticated');
const { postJob, getAllJobs, getAdminJobs, getJobById } = require('../controllers/jobController');

router.post('/post',isRecruiter,postJob);
router.get('/getAll', isAuthenicated,getAllJobs);
router.get('/get/AdminJobs', isRecruiter,getAdminJobs);
router.get('/get/:id',isAuthenicated,getJobById); 

module.exports= router;