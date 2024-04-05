const { File,Post,Category,User } = require("../models");




const addpostController=async(req,res,next)=>{
    try{
        const {title,desc,file,category}=req.body;
        const {_id}=req.user;
        if(file){
            const isfileExist=await File.findById(file);
            if(!isfileExist){
                throw new Error("file not found");
            }
        }
        if(category){
            const iscatExist=await Category.findById(category);
            if(!iscatExist){
                throw new Error("category not found");
            }
        }
        const newpost=new Post({
            title,
            desc,
            file,
            category,
            updatedBy: _id
        });
        await newpost.save();
        res.status(200).json({
            code:200,
            status:true,
            message:"post added successfully"
        })
    }
    catch(err){
        next(err);
    }
}

const updatePostController=async(req,res,next)=>{
    try{
        const {title,desc,file,category}=req.body;
        const {id}=req.params;
        
        const post=await Post.findById(id);
        if(!post){
            res.code=400;
            throw new Error("post not found");
        }
        if(file){
            const isfileExist=await File.findById(file);
            if(!isfileExist){
                throw new Error("file not found");
            }
        }
        if(category){
            const iscatExist=await Category.findById(category);
            if(!iscatExist){
                throw new Error("category not found");
            }
        }
        

        post.title=title;
        post.desc=desc;
        post.file=file;
        post.category=category;
        await post.save();
        res.status(200).json({
            code:200,
            status:true,
            message:"post updated successfully"
        })
    }
    catch(err){
        next(err);
    }
}

const deletepostController=async(req,res,next)=>{
    const {id}=req.params;
    const post=await Post.findById(id);
        if(!post){
            res.code=400;
            throw new Error("post not found");
        }
        await Post.findByIdAndDelete(id);
        res.status(200).json({
            code:200,
            status:true,
            message:"post deleted successfully"
        })

}
module.exports={addpostController,updatePostController,deletepostController};