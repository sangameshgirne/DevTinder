const express=require("express");
const app=express();

app.use("/user",
[(req,res,next)=>{
console.log("handle the route user1");
res.send("Response1");
next();
},

(req,res,next)=>{
console.log("handle the route user2");
res.send("Response2");
next();
}],

)



app.listen(7777,()=>{
    console.log("server is listening");
});