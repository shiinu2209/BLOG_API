const {User}=require("../models");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const jwtSecret=process.env.jwtSecret;
const generateCode=require("../utils/generateCode")
const sendEmail=require("../utils/sendEmail");
const signup=async(req,res,next)=>{
try{
   
const{name,email,password,role}=req.body;
if(!name){
res.code=400;
throw new Error("name cant be empty");
}
if(!email){
    res.code=400;
throw new Error("email cant be empty");
}
if(!password){
    res.code=400;
throw new Error("password cant be empty");
}
if(password.length<6){
    res.code=400;
    throw new Error("password should be atleast 6 charachter long");
}
const hashedPassword=await bcrypt.hash(req.body.password,10);
const newUser=await User.create({name,email,password:hashedPassword,role});

res.status(201).json({code:201,status:true,message:"user registered successfully"});
}
catch(err){
next(err);
}
};

const signin=async(req,res,next)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            res.code=401;
            throw new Error("Invalid credentials");
        }
        console.log(user);
        const match=await bcrypt.compare(password,user.password);
        if(!match){
            res.code=401;
            throw new Error("Invalid credentials");
        }
        const token=await jwt.sign({_id:user.id,name:user.name,email:user.email,role:user.role},jwtSecret,{expiresIn:"7d"});
        res.status(200).json({"message":"user signed in successfully","data":token});
    }
    catch(err){
        console.log(err);
        next();
    }
}

const verifyCode=async(req,res,next)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({email});
        if(!user){
            res.code=404;
            throw new Error("user not found");
        }
        if(user.isVerified){
            res.code=400;
            throw new Error("user already verified");
        }
        const code=generateCode(6);
        console.log(code);
        user.verificationCode=code;
        await user.save();
        await sendEmail({
            emailTo:user.email,
            subject:"email verification code",
            code,
            content:"verify your account"
        })
        res.status(200).json({code:200,status:true,message:"user verification code sent sucesfully"}); 
    }
    catch(err){
        next(err);
    }
}

const verification=async(req,res,next)=>{
    try{
    const {email,code}=req.body;
    const user=await User.findOne({email});
    if(!user){
        res.code=404;
        throw new Error("user not found");

    }
    if(user.verificationCode!==code){
        res.code=400;
        throw new Error("invalid code");
    }
    user.isVerified=true;
    user.verificationCode=null;
    await user.save();
    res.status(200).json({code:200,status:true,message:"user verified succesfully"});
    }
    catch(err){
        next(err);
    }
}

const sendpasswordcode=async(req,res,next)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({email});
        if(!user){
            res.code=404;
            throw new Error("user not found");
        }
        const code=generateCode(6);
        console.log(code);
        user.passwordRecoveryCode=code;
        await user.save();
        await sendEmail({
            emailTo:user.email,
            subject:"password recovery code",
            code,
            content:"recover you account"
        })
        res.status(200).json({code:200,status:true,message:"password verification code sent sucesfully"}); 
    }
    catch(err){
        next(err);
    }
}

const recoverpassword=async(req,res,next)=>{
    try{
    const {email,code,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        res.code=404;
        throw new Error("user not found");
    }
    if(!user.passwordRecoveryCode===code){
        res.code=400;
        throw new Error("invalid code");
    }
    const hashedPassword=await bcrypt.hash(req.body.password,10);
    user.password=hashedPassword;
    user.passwordRecoveryCode=null;
    await user.save(); 
    res.status(200).json({code:200,status:true,message:"password changed"});
    }
    catch(err){
        next(err);
    }
}

const changePassword=async(req,res,next)=>{
    try{
        console.log(req.user);
        const {oldpass,newpass}=req.body;
        const {_id}=req.user;
        const user=await User.findById(_id);
        if(!user){
            res.code=404;
            throw new Error("user not found");
        }
        const match=await bcrypt.compare(oldpass,user.password);
        if(!match){
            res.code=404;
            throw new Error("invalid oldpass");
        }
        user.password=await bcrypt.hash(newpass,10);
        await user.save();
        res.status(200).json({message:"password changed"});

    }
    catch(err){
        next(err);
    }
}
module.exports={signup,signin,verifyCode,verification,sendpasswordcode,recoverpassword,changePassword}