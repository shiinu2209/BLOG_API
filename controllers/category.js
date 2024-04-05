const {Category,User}=require("../models")

const addCategory=async(req,res,next)=>{
try{
    const{title,desc}=req.body;
    const {_id}=req.user;
    
    const isAlready=await Category.findOne({title});
    if(isAlready){
        res.code=400;
        throw new Error("category already exist");
    }

    const user=await User.findById({_id});
    if(!user){
        res.code=400;
        throw new Error("user not found");
    }


    const newCategory=new Category({title,desc,updatedBy:_id});
    await newCategory.save();
    res.status(200).json({code:200,status:true,message:"category created"});
}
catch(err){
    next(err);
}
}

const updateCategoryController=async(req,res,next)=>{
try{
    
    const {id}=req.params;
    
    const {_id}=req.user;
    
    const{title,desc}=req.body;
    
    const category=await Category.findById(id);
    
    if(!category){
        res.code=400;
        throw new Error("category not found for this id");
    }
    const category2=await Category.findOne({title});
    if(category2&&String(category2._id)!==String(id)){
        res.code=400;
        throw new Error("title already exists");
    }
    category.title=title;
    category.desc=desc;
    category.updatedBy=_id;
    await category.save();
    res.status(200).json({code:200,status:true,message:"category updated succesfully"});
}
catch(err){
    next(err);
}
}

const deleteCategoryController=async(req,res,next)=>{
   try{ 
    const {id}=req.params;
    const category=Category.findById(id);
    if(!category){
        res.code=400;
        throw new Error("invalid id");
    }
    await Category.findByIdAndDelete(id);
    res.status(200).json({message:"category deleted successfully"})
}
catch(err){
    next(err);
}

}

const getCategoriesController=async(req,res,next)=>{
    try{
        const {q,size,page}=req.query;
        let query={};
        const sizeNumber=parseInt(size)||10;
        const pageNumber=parseInt(page)||1;
        if(q){
            const search=RegExp(q,"i");
            query={$or:[{title:search},{desc:search}]};
        }
        const total=await Category.countDocuments(query);
        const pages=Math.ceil(total/sizeNumber);
        const categories=await Category.find(query).skip((pageNumber-1)*sizeNumber).limit(sizeNumber);

        res.status(200).json({code:200,status:true,message:"categories loaded successfully",data:{categories}});
    }
    catch(err){
        next(err);
    }
}

const getCategoryController=async(req,res,next)=>{
    const {id}=req.params;
    const category=await Category.findById(id);
    if(!id){
        res.code =404;
        throw new Error("category not found");
    }
    res.status(200).json({code:200,status:true,message:"category found",data:{category}});
}
module.exports={addCategory,updateCategoryController,deleteCategoryController,getCategoriesController,getCategoryController};