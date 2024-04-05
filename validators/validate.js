const {validationResult}=require("express-validator");
const validate=(req,res,next)=>{
    const errors=validationResult(req);
    console.log(errors);
    next();
}
module.exports=validate;