const express=require("express")
const profileRouter=express.Router();
const {userauth}=require("../middleware/userauth")
const {validateSignUpData,validateEditProfile}=require("../utils/validation")

//get profile view
profileRouter.get("/profile/view",userauth,async(req,res)=>{
   try{
        user=req.user;
        res.send(user)
   }
   catch(err){
   res.status(400).send("ERROR" +err.message)}

})

//edit profile
profileRouter.post("/profile/edit",userauth,async(req,res)=>{
   try{
       if(!validateEditProfile(req)){
         throw new Error("invalid edit request")}
      const loggedinuser=req.user;
      console.log(loggedinuser)
      Object.keys(req.body).forEach((fields)=>loggedinuser[fields]=req.body[fields])
        console.log(loggedinuser)
      res.send(`${loggedinuser.firstName} ,profile updated suucess`)
      await loggedinuser.save()
   }
   catch(err){
      res.status(400).send("ERROR" +err.message)
   }
})

module.exports=profileRouter;