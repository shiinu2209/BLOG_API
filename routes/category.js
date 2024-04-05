const express=require("express");
const {categoryController}=require("../controllers")
const {addCategoryValidator,idValidator}=require("../validators/category")
const validate=require("../validators/validate");
const isAuth=require("../middlewares/isAuth")
const isAdmin=require("../middlewares/isAdmin");
const router=express.Router();

router.post("/",isAuth,isAdmin,addCategoryValidator,validate,categoryController.addCategory);

router.put("/update-category/:id",isAuth,isAdmin,idValidator,validate,categoryController.updateCategoryController);

router.delete("/delete-category/:id",isAuth,isAdmin,idValidator,validate,categoryController.deleteCategoryController)

router.get("/",isAuth,categoryController.getCategoriesController);

router.get("/:id",isAuth,categoryController.getCategoryController);

module.exports=router;