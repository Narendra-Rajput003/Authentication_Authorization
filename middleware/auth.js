const jwt=require("jsonwebtoken");
require("dotenv").config();



exports.auth=(req,res,next)=>{
    try {

        console.log("body token",req.body.token);
        console.log("cookie token",req.cookie.token);
        const token=req.body.token;

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token is missig"
            });
        }

        try {
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            console.log("payload",payload);
            req.user=payload;
        } catch (error) {
            return res.status(400).josn({
                success:false,
                message:"Error in token verfy"
            })
        }
        next();
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Authication problem"
        })
    }
}


exports.isStudent=(req,res,next)=>{
    try {
        if(req.user.role !=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected router for student only"
            });
        }
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Student protected router"
        })
    }
}


exports.isAdmin=(req,res,next)=>{
    try {
        if(req.user.role !=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected router for admin only"
            });
        }
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Admin protected router"
        })
    }
}