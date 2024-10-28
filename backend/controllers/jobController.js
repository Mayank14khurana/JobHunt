const Job =require('../models/jobModel');

exports.postJob =async (req,res)=>{
    try{
     const {title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;
     const userId =req.id;
     if(!title || !description ||!requirements || !salary || !location || !jobType || !experience || !position || !companyId ){
        return res.status(400).json({
            success:false,
            message:"All fields are reuired"
        })
     }
     const job =await Job.create({
        title,
        description,
        requirements:requirements.split(','),
        salary:Number(salary),
        location,
        jobType,
        position,
        company:companyId,
        created_By:userId,
        experience 
     });
     return res.status(200).json({
        success:true,
        message:"Job cereated successfully" ,
        job
     });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.getAllJobs =async (req,res)=>{
    try{
      const keyword =req.query.keyword ||"";
      const query ={
        $or:[
            {title:{$regex:keyword ,$options:"i"}},
            {description:{$regex:keyword ,$options:"i"}},
        ]
      };
      const jobs =await  Job.find(query).populate({path:"company"}).sort({createdAt:-1});
      if(!jobs){
        return res.status(400).json({
            success:false,
            message:"No jobs found"
        })
      }
      return res.status(200).json({
        success:true,
        jobs
    })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.getJobById =async (req,res)=>{
    try{
     const jobId =req.params.id;
     const job =await Job.findById(jobId).populate({path:"company"}).populate({path:'applications'});
     if(!job){
        return res.status(400).json({
            success:false,
            message:"No Job Found"
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
exports.getAdminJobs =async (req,res)=>{
    try{
       const adminId =req.id;
       const jobs =await Job.find({created_By:adminId}).populate({path:"company"});
       if(!jobs){
        return res.status(400).json({
            success:false,
            message:"No Job Found"
        })
     }
     return res.status(200).json({
        success:true,
        jobs
    })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}