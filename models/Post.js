const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    title:{type:String,required:true},
    dsc:String,
    file:{type:mongoose.Types.ObjectId,ref:"file"},
    category:{type:mongoose.Types.ObjectId,ref:"category",required:true},
    updatedBy:{type:mongoose.Types.ObjectId,required:true,ref:"user"}
},{timestamps:true});
const Post=mongoose.model("post",postSchema);
module.exports=Post;