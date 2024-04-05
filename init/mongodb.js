const mongoose=require("mongoose");
const {connectionstring}=require("../config/keys")
const connectdb=async()=>{
    try{
        const connect=await mongoose.connect(connectionstring);
        console.log("database connected");
    }
    catch(err){
        console.log(err.message);
    }
};
module.exports=connectdb;