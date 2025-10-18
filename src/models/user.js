const mongoose=require("mongoose");
const validator=require("validator")
const jwt=require("jsonwebtoken")

const bcrypt = require("bcrypt");
const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:4,
        maxlength:50
    },
    lastName:{
         type:String,
    },
    emailID:{
        type:String,
        required:true,
        unique:true,
        trim:true , 
       // immutable:true
      validate(value){
        if(!validator.isEmail(value))
            throw new Error("Email is not valid" +value)
      }


    },
    password:{
        type:String,
        required:true 
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
           if(!["Male","female","others"].includes(value))
            throw new Error("Gender is not valid");
            
            
        }},
    skills:{
        type:[String]
    },
    photoURL:{
        type:String,
        validate(value){
            if(!validator.isURL(value))
                throw new Error("invalid URL" +value)

        }
    },
    about:{
        type:String

    }    
       
    
           
        
       


}, {
            timestamps:true
        })

UserSchema.methods.getJWT=async function(){
    const user=this
    const token=await jwt.sign({_id:user._id},"DEVTINDER@123")
    return token;
}

UserSchema.methods.validatepassword=async function(password1){
           const user=this;
           const passwordhash=user.password
    const ispasswordvalid=await bcrypt.compare(password1,passwordhash)
      return ispasswordvalid

}
module.exports=mongoose.model("User",UserSchema);