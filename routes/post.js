const express=require("express");
const isAuth = require("../middlewares/isAuth");
const postController=require("../controllers/post");
const postValidator = require("../validators/post");
const validate = require("../validators/validate");
const router=express.Router();

router.post("/",isAuth,postValidator,validate,postController.addpostController);

router.put("/:id",isAuth,postValidator,validate,postController.updatePostController);

router.delete("/delete/:id",isAuth,postController.deletepostController);
module.exports=router;