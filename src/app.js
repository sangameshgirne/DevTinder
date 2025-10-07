const express=require("express");
const app=express();

app.get("/user",(req,res)=>{
    res.send({
        firstname:"sangu",
        lastname:"girne"
    })
})


app.post("/user",(req,res)=>{
    res.send("data send success to db")
})


app.delete("/user",(req,res)=>{
    res.send("data deleted")
})

app.listen(7777,()=>{
    console.log("server is listening");
});