const mongoose=require("mongoose");

const ConnectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    
     toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },

    status:{
    type:String,
    enum:{
        values:["ignored","interested","accepted","rejected"],
        message:`{VALUE} is incorrect status type`
    }

    }

})
ConnectionRequestSchema.index({fromUserId:1,toUserId:1})
const ConnectionRequestModel=new mongoose.model("connectionrequest",ConnectionRequestSchema)
module.exports=ConnectionRequestModel;