const express=require("express")
const requestRouter=express.Router();
const {userauth}=require("../middleware/userauth")
const ConnectionRequest=require("../models/ConnectionRequest")
const User=require("../models/user");
const { equals } = require("validator");

//sendconnection request
requestRouter.post("/request/send/:status/:toUserId",userauth,async(req,res)=>{
try{
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;

    const allowedStatus=["ignored","interested"];
    if(!allowedStatus.includes(status))
        return res.status(400).json({message:`invalid status type` +status})

    const toUser=await User.findById(toUserId)
    if(!toUser)
        return res.status(400).json({message:`user not found`})

    const existingConnectionRequest=await ConnectionRequest.findOne({
        $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
    ]
    })
    if(existingConnectionRequest)
        return res.status(400).json({message:`connection request already exists`})
    if(fromUserId.equals(toUserId))
        throw new Error("cannot send request yourself")

    
    const ConnectionRequest123=new ConnectionRequest({
         fromUserId,
        toUserId,
        status
    })
    const data=await ConnectionRequest123.save();
    res.json({message:`sent request` })
}

catch(err){
    res.status(400).send("ERROR"  +  err.message);
}

})

//reviewing connection request
requestRouter.post("/request/review/:status/:requestId",userauth,async(req,res)=>{
               try{loggedInUser=req.user;
               const {status,requestId}=req.params;

               const isAllowedStatus=["accepted","rejected"];
               if(!isAllowedStatus.includes(status))
                return res.status(400).json({message:"status not  allowed"});

              const ConnectionRequest123=await ConnectionRequest.findOne({
                _id:requestId,
                toUserId:loggedInUser._id,
                status:"interested"
              })
              if(!ConnectionRequest123)
                return res.status(400).json({message:"Connection request not found"})
             ConnectionRequest123.status=status;
             const data1=await ConnectionRequest123.save();

             res.json({message:"connection request" +status ,data:data1})

               }
               catch(err){
                res.status(400).send("ERROR" +err.message);
               }

})

module.exports=requestRouter;