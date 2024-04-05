const {check}=require("express-validator");
const mongoose=require("mongoose");
const postValidator=[
    check("title").notEmpty().withMessage("title cant be empty"),
    check("file").custom(async (file)=>{
        if(file&&!mongoose.Types.ObjectId.isValid(file)){
            throw "invalid file id";
        }
    }),

    check("category")
    .notEmpty()
    .withMessage()
    .custom(async (category)=>{
        if(category&&!mongoose.Types.ObjectId.isValid(category)){
            throw "invalid category id";
        }
    })

]

module.exports=postValidator