const express=require("express");
const app=express();
const {connectdb}=require("./config/database")

const jwt=require("jsonwebtoken")
const cookieParser = require("cookie-parser");

const authRouter=require("./router/authrouter")
const profileRouter=require("./router/profile")
const requestRouter=require("./router/request")
const userRouter=require("./router/userRouter")

app.use(cookieParser());
app.use(express.json())

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


//connecting server to database
connectdb()
.then(()=>{
    console.log("DB connected successfully");
    app.listen(7777,()=>{
    console.log("server is listening");}
);
})
.catch(err=>{
    console.error("data base not connected")
})

 