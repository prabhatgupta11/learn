const express=require("express")
const {connection}=require("./db");
const { postrouter } = require("./routes/postroutes");
const {userrouter}=require("./routes/userroutes")
const {auth}=require("./middleware/auth.middleware")
require('dotenv').config();
const cors=require("cors"); 

const app=express();
app.use(express.json())
app.use(cors());

//
app.use("/user",userrouter)
app.use(auth)
app.use("/post",postrouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")
    }catch(err)
    {
        console.log(err.message)
    }
    console.log("connected to server")
})