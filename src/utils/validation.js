const validator=require("validator")

function validateSignUpData(req){
const {firstName,lastName,emailID,password}=req.body;
if(!firstName||!lastName){
    throw new Error("name is not valid")
}
else if(!validator.isEmail(emailID)){
    throw new Error("Enter valid emaiid")}
else if(!validator.isStrongPassword(password)){
    throw new Error("please enter a strong password")}

}

const validateEditProfile=(req)=>{
    const allowedEditFields=
    ["firstName","lastName","emailID","gender","age","photoURL","about","skills"];
    const isEditAllowed=Object.keys(req.body).every((field)=>allowedEditFields.includes(field))
    return isEditAllowed;
}

module.exports={validateSignUpData,validateEditProfile};