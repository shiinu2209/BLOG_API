const multer=require("multer");
const path=require("path");
const generateCode = require("../utils/generateCode");
const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        const originalName=file.originalname;
        const extension=path.extname(originalName);
        const filename=originalName.replace(extension,"");
        const comfilename=filename.split(" ").join("_");
        const lowercaseFileName=comfilename.toLocaleLowerCase();
        const code=generateCode(12);
        const date=new Date().toISOString().replace(":","").replace(".","").replace("-","").replace(":","").replace(".","").replace("-","");
        req.query=date;
        const finalfile=`${lowercaseFileName}_${date}_${extension}`;
        callback(null,finalfile);
    }
})

const upload=multer({
    storage,
    fileFilter:(req,file,callback)=>{
        const mimetype=file.mimetype;
        if(mimetype==="image/jpg"||mimetype==="image/jpeg"||mimetype==="image/png"||mimetype==="application/pdf"){
            callback(null,true);
        }
        else{
            callback(new Error("only images or pdfs can be uploaded"));
        }
    }
})

module.exports=upload;