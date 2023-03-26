const express=require("express")
const {UserModel}=require("../model/usermodel")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const userrouter=express.Router();

//register the user

userrouter.post("/register",async(req,res)=>{

    try{
        const payload=req.body
        

        const user= await UserModel.findOne({email:payload.email});
        if(user)
        {
           return  res.status(200).send({msg:"Please login ,You are already exist"});
        }
        else{
            const hashPassword=await bcrypt.hashSync(payload.password,8);
            payload.password=hashPassword;

            const newuser=new UserModel(payload);
            await newuser.save();

            return res.json({msg:"user registerd",user:newuser})
        }
    }
    catch(err)
    {
        res.status(400).send({msg:err.message});
    }
  
})


// userrouter.post("/register",async(req,res)=>{

//     try{
    
//         const {name,email,gender,password,city,age}=req.body

     
//         bcrypt.hash(password, 5, async(err, hash)=> {
//         const user=new UserModel({name,email,gender,password:hash,city,age})
//         await user.save();
//         res.status(200).send({"msg":"Registration sucessfull"})

//         });
//     }
//     catch(err)
//     {
//         res.status(400).send({"msg":err.message})
//     }
  
// })



//login the user
userrouter.post("/login",async(req,res)=>{
    
    try{
        const payload=req.body;
        const user= await UserModel.findOne({email:payload.email});

        if(!user)
        {
            return    res.status(400).send({"msg":"please register first"});
        }
        // password verification

        const ispasswordcorrect=await bcrypt.compareSync(
            payload.password,
            user.password
        );

        if(ispasswordcorrect)
        {
            //jwt generation

             const token= await jwt.sign({email:user.email,userId:user._id},'masai')
             res.status(200).send({"msg":"Login success","token":token});
        }
        else{
            res.status(400).send({"msg":"Wrong password"})
        }
    }catch(err){
        res.status(400).send({"msg":"Something wrong in login section",err})
    }
   
})

// userrouter.post("/login",async(req,res)=>{
//     const {email,password}=req.body;
//     try{

//         const user= await UserModel.findOne({email})
//         // console.log(user)

//         if(user)
//         {
//             bcrypt.compare(password, user.password, (err, result) =>{
//                 // result == true
//                 console.log(result)
//                 if(result)
                
//                 {
//                     const token = jwt.sign({ userId:user._id }, 'masai');
//                     res.status(200).send({"msg":"Login sucessfull","token":token})
//                 }
//                 else{
//                     res.status(400).send({"msg":"Wrong password"})
//                 }
//             });
//         }else
//         {
//             res.status(400).send({"msg":"User not found"})
//         }
//     }catch(err){
//         res.status(400).send({"msg":"Something wrong in login section",err})
//     }
   
// })

module.exports={
    userrouter
}