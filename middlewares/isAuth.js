const jwt=require("jsonwebtoken");
const isAuth=async(req,res,next)=>{
    try{
        const authorization=req.headers.authorization && req.headers.authorization.split(" ");
        
        const token=authorization.length>1?authorization[1]:null;
        console.log(token);
        if(token){
            const payload=await jwt.verify(token,process.env.jwtSecret);
            console.log(payload);
            if(payload){
                req.user={
                    _id:payload._id,
                    name:payload.name,
                    email:payload.email,
                    role:payload.role
                }
            }
            
            
        }
        else{
            res.code=400;
            throw new Error("token needed");
        }
        next();

    }
    catch(err){
        next(err);
    }
}
module.exports=isAuth;