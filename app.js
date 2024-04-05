const express=require("express");
const dotenv=require("dotenv");
const bodyParser=require("body-parser");
const morgan=require("morgan");
const notFound=require("./controllers/notfound")
const {errorHandler}=require("./middlewares");
dotenv.config();
const connectdb=require("./init/mongodb");
const {authRoute,categoryRoute,fileRoute,postRoute}=require("./routes");


const app=express();
connectdb();
app.use(morgan("dev"));
app.use(express.json({limit:"500MB"}));
app.use(bodyParser.urlencoded({limit:"500MB",extended:true}));
app.use("/api/v1/auth/",authRoute);
app.use("/api/v1/category/",categoryRoute);
app.use("/api/v1/file",fileRoute);
app.use("/api/v1/post",postRoute);
app.use("*",notFound);
app.use(errorHandler);
module.exports=app;