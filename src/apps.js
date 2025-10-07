const express=require("express");
const app=express();
const {adminauth,userauth}=require("./middleware/auth");

//app.use("/admin",adminauth);
app.get("/user",userauth,(req,res)=>{
    res.send("user data sent");
})
app.get("/admin/getalldata",adminauth,(req,res)=>{
 res.send("send all data");
})

app.get("/admin/deleteuser",adminauth,(req,res)=>{
   res.send("deleted user");}
)




app.listen(7777,()=>{
    console.log("server is listening");
});