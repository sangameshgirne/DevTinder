const express=require("express");
const app=express();
app.get("/use+r",(req,res)=>{
res.send("HI");

})

app.listen(7777,()=>{
    console.log("server is listening");})