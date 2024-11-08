const express =require('express');
const router =express.Router();

const isRecruiter  = require('../middlewares/isRecruiter')
const isAuthenicated =require('../middlewares/isAuthenticated');
const { applyJob, getAppliedJobs, getApplicant, updateStatus } = require('../controllers/ApplicantController');

router.get('/apply/:id',isAuthenicated,applyJob);
router.get('/get', isAuthenicated,getAppliedJobs);
router.get('/:id/applicants',isRecruiter,getApplicant);
router.put('/status/:id/update', isRecruiter,updateStatus);

module.exports= router;