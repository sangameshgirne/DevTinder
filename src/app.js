const express=require("express");
const app=express();
app.use("/test",(req,res)=>{
    res.send("namaste sangu don")
});
app.use("/hello",(req,res)=>{
    res.send("namaste hellooo")
});
// app.use("/",(req,res)=>{
//     res.send("namaste sangu ")
// });
app.listen(7777,()=>{
    console.log("server is listening");
});