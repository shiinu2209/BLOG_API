const express=require("express");
const router=express.Router();
const {fileController}=require("../controllers");
const isAuth=require("../middlewares/isAuth");
const multer=require("multer");
const upload=require("../middlewares/upload");


router.post("/upload",isAuth,upload.single("image"),fileController.uploadFileController)

module.exports=router;