const express=require("express");
const cors=require("cors");
const mongoose =require("mongoose");
const dotenv=require("dotenv");
const app=express();
const Routes=require ("./route.js");
const port =process.env.PORT || 3000;


dotenv.config();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Erp",{
    useNewUrlParser : true,
    useUnifiedTopology :true
})
.then(console.log("connected to db"))
.catch((err)=> console.log("db error"))

app.use('/',Routes);

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})