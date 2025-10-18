const mongoose=require("mongoose");
const connectdb=async()=>{
    await mongoose.connect("mongodb+srv://sangunode:mNvjdCFaSFxCnoid@cluster0.le16lgh.mongodb.net/DEVTINDER");
}
module.exports={connectdb};