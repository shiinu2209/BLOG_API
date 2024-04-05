const {check}=require("express-validator");
const signupValidator=[
    check("name").notEmpty().withMessage("name cant be empty"),
    check("email").isEmail().withMessage("invalid email").notEmpty().withMessage("email cant be empty"),
    check("password").isLength({min:6}).withMessage("password should be atleast 6 charachter long").notEmpty().withMessage("password cant be empty")
];

const signinValidator=[
    check("email").isEmail().withMessage("invalid email").notEmpty().withMessage("email cant be empty"),
    check("password").isLength({min:6}).withMessage("password should be atleast 6 charachter long").notEmpty().withMessage("password cant be empty")
];

const emailValidator=[
    check("email").isEmail().withMessage("invalid email").notEmpty().withMessage("email cant be empty")
];

const verificationValidator=[
    check("email").isEmail().withMessage("invalid email").notEmpty().withMessage("email cant be empty"),
    check("code").notEmpty().withMessage("code cant be empty")

];

const recoveryCodeValidation=[
    check("email").isEmail().withMessage("invalid email").notEmpty().withMessage("email cant be empty"),
    check("code").notEmpty().withMessage("code cant be empty"),
    check("password").isLength({min:6}).withMessage("password should be atleast 6 charachter long").notEmpty().withMessage("password cant be empty")
];

const passchangeValidator=[
    check("oldpass").isLength({min:6}).withMessage("password should be atleast 6 charachter long").notEmpty().withMessage("password cant be empty"),
    check("newpass").isLength({min:6}).withMessage("password should be atleast 6 charachter long").notEmpty().withMessage("password cant be empty")
]

module.exports={signupValidator,signinValidator,emailValidator,verificationValidator,recoveryCodeValidation,passchangeValidator};