const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.singup=async(req,res)=>{
    try {

        const {name,email,password,role}=req.body;

        const userExisting=await User.findOne({email});

        if(userExisting){
            return res.status(403).json({
                success:false,
                message:"user already exits"
            });
        }

        let hashPassword;

        try {

            hashPassword=await bcrypt.hash(password,10);
            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Erro while hash password"
            });
        }

        //entry create in db

        const user=await User.create(
            {name,email,password:hashPassword,role}
        )

        return res.status(200).json({
            success:true,
            message:"user create successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"user can't signup "
        })
        }

}




exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        
            if(!email || !password){
                return res.status(400).json({
                    success:false,
                    message:"All fields are required"
                });
            }
        const user=await User.findOne({email});
    

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Please first signup"
            });
        }

        const payload={
            name:user.name,
            id:user._id,
            role:user.role
        };

        if(await bcrypt.compare(password,user.password)){
           
            let token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });

            ///add token in the user object
            user.token=token;
            user.password=undefined;

            
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User login successfully",
            });

        }else{
            return res.status(400).json({
                success:false,
                message:"Password is not match"
            });
        }


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User can't login due to some error"
        })
    }
}