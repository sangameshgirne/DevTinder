const express=require("express")

const userRouter=express.Router();
const ConnectionRequest=require("../models/ConnectionRequest")
const {userauth}=require("../middleware/userauth")
const User=require("../models/user")

userRouter.get("/user/requests/recieved",userauth,async(req,res)=>{
      try{
        const loggedInUser=req.user;
        const Connectionrequests=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName"])
        res.json({message:"data fetched success",data:Connectionrequests})
      }
      catch(err){
        res.status(400).send("ERROR" +err.message)
      }

})

userRouter.get("/user/connections",userauth,async(req,res)=>{
  try{
    loggedInUser=req.user;
    const connectionRequests=await ConnectionRequest.find({
      $or:[
        {toUserId:loggedInUser._id,status:"accepted"},
        {fromUserId:loggedInUser._id,status:"accepted"}
      ]

    }).populate("fromUserId",["firstName","lastName"]).populate("toUserId",["firstName","lastName"])
    
    console.log(connectionRequests)
    const data=connectionRequests.map((row)=>{
      if(row.fromUserId._id.toString()===loggedInUser._id.toString())
        return row.toUserId;
      return row.fromUserId
    })
    //const data=connectionRequests
    res.json({data})
  }
  catch(err){
    res.status(400).send("ERROR" +err.message)}
})

userRouter.get("/user/feed",userauth,async(req,res)=>{
try{
  loggedInUser=req.user;
  const page=req.query.page||1;
  let limit=req.query.limit||10;
  limit=limit>50?50:limit
  const skip=(page-1)*limit

  const ConnectionRequests=await ConnectionRequest.find({
    $or:[
      {fromUserId:loggedInUser._id},
      {toUserId:loggedInUser._id}
    ]
  })
  //console.log(ConnectionRequests)

  const hideUsersFromFeed=new Set();
  ConnectionRequests.forEach(req=>{
    hideUsersFromFeed.add(req.fromUserId.toString())
    hideUsersFromFeed.add(req.toUserId.toString())
  })
   
  //console.log(hideUsersFromFeed)


  const users=await User.find({
    $and:[
      {_id:{$nin:Array.from(hideUsersFromFeed)}},
      {_id:{$ne:loggedInUser._id}}
    ]
  }).skip(skip).limit(limit)
  res.send(users)
}

catch(err){
res.status(400).send("ERROR"  +err.message)
}

})
module.exports=userRouter