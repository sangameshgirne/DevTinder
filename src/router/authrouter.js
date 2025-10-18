const express=require("express")
const authRouter=express.Router();

const User=require("../models/user")

const {validateSignUpData}=require("../utils/validation")

const bcrypt = require("bcrypt");

//signing up from the user through postman
authRouter.post("/signup", async(req,res)=>{
   
    
  
    try{
          
        validateSignUpData(req);
       // console.log("Request body:", req.body); // Debugging
        const {firstName,lastName,emailID,password}=req.body;
        const passwordhash=await bcrypt.hash(password,10);
       // console.log(passwordhash)
        const user = new User({
            firstName,
            lastName,
            emailID,
            password: passwordhash
            });
        await  user.save();
        res.send("user added successfully")}

    catch(err){
        res.status(400).send("user not added"+ err.message);
    }
})

//login
authRouter.post("/login", async(req,res)=>{
   
    
  
    try{
    //   //const { emailID: userEmail, password: userPassword } = req.body;
    //   const useremail=req.body.emailID;
    //   const userpassword=req.body.password;
    const { emailID ,password} = req.body;
        const user=await User.findOne({emailID:emailID})
       if(!user){
        throw new Error("invalid credentials")
       }
       const ispasswordvalid=await user.validatepassword(password);
       if(ispasswordvalid)
       {
        const token=await user.getJWT()
        res.cookie("token123",token);
        res.send("login successful")
       }
        else
        throw new Error("invalid credentials")
    }
    catch(err){
        res.status(400).send("ERROR"+ err.message);
    }
})

//logout
authRouter.post("/logout",async(req,res)=>{
    res.cookie("token123",null,{expires:new Date(Date.now())})
    res.send("logout successfully")
})

module.exports=authRouter;
