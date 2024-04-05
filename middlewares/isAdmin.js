const isAdmin=(req,res,next)=>{
    try{
        if(req.user&&(req.user.role===1||req.user.role===2)){
            next();
        }
        else{
            res.code=400;
            throw new Error("access denied");
        }
    }
    catch(err){
        next(err);
    }
}
module.exports=isAdmin;