const { File } = require("../models");

File

const uploadFileController=async(req,res,next)=>{
    try{
        const{file}=req;
        const{_id}=req.user;
        const newfile=new File({
            name:file.originalname,
            size:file.size,
            mimetype:file.mimetype,
            createdby:_id,
            filename:req.query
        })
        await newfile.save();
        res.status(200).json({ok:true});
    }
    catch(err){
        next(err);
    }
}
module.exports={uploadFileController};