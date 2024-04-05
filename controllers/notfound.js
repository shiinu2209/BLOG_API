const notFound=(req,res,next)=>{
res.status(401).json({code:404,status:false,mesage:"api not found"})
}
module.exports=notFound;