const adminauth=(req,res,next)=>{
const token="xyz"
const isadminauthorized=token==="xyz";
if(!isadminauthorized)
   res.status(401).send("Unauthorized access");
else{
    next();
}


}
const userauth=(req,res,next)=>{
const token="xyzabc"
const isadminauthorized=token==="xyz";
if(!isadminauthorized)
   res.status(401).send("user Unauthorized access");
else{
    next();
}


}
module.exports={adminauth,userauth};