


const express=require("express");
const router=express.Router();


const {login,singup}=require("../controllers/Auth");
const {auth,isStudent,isAdmin}=require("../middleware/auth");





router.post("/signup",singup);
router.post("/login",login);

//test route
router.get("/test",auth,(req,res)=>{
   res.json({
    success:true,
    message:"This is protected route for test"
   });
});
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
     success:true,
     message:"This is protected route for student"
    });
 });

 router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
     success:true,
     message:"This is protected route for admin"
    });
 });



 
module.exports=router;