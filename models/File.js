const mongoose=require("mongoose");

const fileSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    size:Number,
    mimetype:String,
    createdby:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    filename:{
        type:String,
        required:true
    }

    
},{timestamps:true});
const File=mongoose.model("file",fileSchema);
module.exports=File;