const jwt =require('jsonwebtoken');

const isRecruiter = async (req,res,next)=>{
    try{
    console.log(req.cookies);
    const token =req.cookies.login;
    console.log(token);
    if(!token){
        return res.status(400).json({
            success:false,
            message:"User is not Authenticated"
        })
    }
    const decode =await jwt.verify(token , process.env.JWT_SECRET);
    if(!decode){
        return res.status(400).json({
            success:false,
            message:"Invalid Token"
        })
    }
    
    console.log(decode,"Middleware decoded object");
    role =decode.role;
     if(role!='recruiter'){
        return res.status(400).json({
            success:false,
            message:"Protected route for Recruiters"
        })
     }
    req.id = decode.id;
    next();
    }catch(err){
    console.log(err);
    return res.status(400).json({
        success:false,
        message:err.message
    })
    }
}
module.exports = isRecruiter;