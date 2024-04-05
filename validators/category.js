const{check,param}=require("express-validator");
const mongoose = require("mongoose");


const addCategoryValidator=[
    check("title").notEmpty().withMessage("title is required")
]

const idValidator=[
    param("id").custom(async(id)=>{
        if(id&&!mongoose.Types.ObjectId.isValid({id})){
            throw "invalid category id";
        }
    })
]
module.exports={addCategoryValidator,idValidator}
