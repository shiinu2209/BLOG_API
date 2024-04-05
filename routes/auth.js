const express=require("express");
const {signupValidator,signinValidator,emailValidator,verificationValidator,recoveryCodeValidation,passchangeValidator}=require("../validators/auth")
const validate=require("../validators/validate")
const isAuth=require("../middlewares/isAuth")
const router=express.Router();
const {authController}=require("../controllers");
// const { verifyCode, verification, sendpasswordcode } = require("../controllers/auth");

router.post("/signup",signupValidator,validate,authController.signup);

router.post("/signin",signinValidator,validate,authController.signin);

router.post("/send-verification-email",emailValidator,validate,authController.verifyCode);

router.post("/verify-email",verificationValidator,validate,authController.verification);

router.post("/send-recovery-code",emailValidator,validate,authController.sendpasswordcode);

router.post("/recover-password",recoveryCodeValidation,validate,authController.recoverpassword)

router.put("/change-password",isAuth,passchangeValidator,validate,authController.changePassword)
module.exports=router;