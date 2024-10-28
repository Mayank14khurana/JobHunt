const Company =require('../models/companyModel');
const getDataUri = require('../utils/datauri');
const cloudinary  = require('../utils/cloudinary');
exports.registerCompany= async (req,res)=>{
    try{
    const {companyName}= req.body;
    if(!companyName){
        return res.status(400).json({
            success:false,
            message:"All fields are necessary"
        })  
    }
    let company = await Company.findOne({name:companyName});
    if(company){
         return res.status(400).json({
            success:false,
            message:"Company is already registered"
         })
    }
    company = await Company.create({
        name:companyName,
        userId:req.id
    })

    return res.status(200).json({
        success:true,
        message:"Company is registered successfully",
        company
    })
    }catch(err){
        console.log("catch chala hai",err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.getCompany= async (req,res)=>{
    try{
        const userId =req.id;
        const company = await Company.find({userId});
        if(!company){
            return res.status(400).json({
                success:false,
                message:"Company Not Found"
            })
        } 
        return res.status(200).json({
            success:true,
            company
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.getompanyById =async (req,res)=>{
    try{
       const companyId =req.params.id;
       const company =await Company.findById(companyId);
       if(!company){
        return res.status(400).json({
            success:false,
            message:"Company not found"
        })
       }
       return res.status(200).json({
        success:true,
        company,
       })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.updateCompany =async (req,res)=>{
    try{
     const {name,description ,website ,location}=req.body;
     if(!name || !description || !location || !website){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        }) 
     }
     const file =req.file;
     const fileUri=getDataUri(file);
     const cloudResponse= await cloudinary.uploader.upload(fileUri.content);
     const logo =cloudResponse.secure_url;
     const company =await Company.findByIdAndUpdate(req.params.id,{
        name:name,
        description:description,
        website:website,
        location:location,
        logo
     },{new:true})
     return res.status(200).json({
        success:true,
        company,
       message:"Company updated successfully"
     })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
