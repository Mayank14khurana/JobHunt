const Application =require('../models/ApplicationModel');
const Job = require('../models/jobModel');
exports.applyJob =async (req,res)=>{
    try{
     const userId =req.id;
     const jobId =req.params.id;
     if(!jobId){
        return res.status(400).json({
            success:false,
            message:"No such job exists to apply"
        })
     }
     const existing = await Application.findOne({job:jobId ,applicant:userId});
     if(existing){
        return res.status(400).json({
            success:false,
            message:"You have already applied to the Job"
        })
     }
     const job =await Job.findById(jobId);
     if(!job){
        return res.status(400).json({
            success:false,
            message:"No such job exist"
        })
     }
     const newApplication =await Application.create({
        job:jobId,
        applicant:userId
     });
     console.log(newApplication._id ,"ye hai id");
     await job.applications.push(newApplication._id);
     await job.save();
     return res.status(200).json({
        success:true,
        newApplication,
        message:"Successfully applied"
    })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.getAppliedJobs =async (req,res)=>{
    try{
     const userId =req.id;
     const application =await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:"job",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"company",
            options:{sort:{createdAt:-1}},
        }
     });
      if(!application){
        return res.status(400).json({
            success:false,
            message:"No application found"
        })
      }
      return res.status(200).json({
        success:true,
        application
    })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.getApplicant =async (req,res)=>{
    try{
        const JobId =req.params.id;
        const job =await Job.findById(JobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant",
                select: '-password'
            }
        })
        if(!job){
            return res.status(400).json({
                success:false,
                message:"JOb not found"
            })
        }
        return res.status(200).json({
            success:true,
            job
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.updateStatus =async (req,res)=>{
    try{
     const {status} =req.body;
     const applicantId =req.params.id;
     if(!status){
        return res.status(400).json({
            success:false,
            message:"Status is missing"
        })
     }
     const application = await Application.findOne({_id:applicantId});
     if(!application){
        return res.status(500).json({
            success:false,
            message:"No application found"
        })
     }
     application.status =status.toLowerCase();
     await application.save();
     return res.status(200).json({
        success:true,
        application
    })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}