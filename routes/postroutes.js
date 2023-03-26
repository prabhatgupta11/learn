const express=require("express")
const {PostModel}=require("../model/postmodel")

 const postrouter=express.Router();


 ///

 postrouter.get("/",async(req,res)=>{
    try{
        const post=await PostModel.find()
        res.status(200).json(post)
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
 })

 ////////////////////
 postrouter.get("/search",async(req,res)=>{
    try{
        const {userId}=req.body;
        const {device=["Tablet","Laptop","Mobile"]}=req.query;

        const post=await PostModel.find({$and:[{userId},{device:{$in:device}}]});
        res.status(200).json(post)
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
 })



////////////////////////////////////////////////////////
//get route for particular post

postrouter.get("/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        
        const post=await PostModel.findById(id);

        res.status(200).json(post)
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
 })

 ///////////////////////////////////////////
//creating the new post
 postrouter.post("/add",async(req,res)=>{
    try{
        const payload=req.body;
        
        const post=new PostModel(payload)
        await post.save();

        res.status(200).send({msg:"post created",data:post})
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
 })

 ////////////////////////////////////////
 //patch the post
 postrouter.patch("/update/:id",async(req,res)=>{
    try{
        const payload=req.body;
        const id=req.params.id;
        const post=await  PostModel.findByIdAndUpdate(id,payload);
   
        res.status(200).send({msg:"post updated"})
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
 })

 ///detete the post


 postrouter.delete("/delete/:id",async(req,res)=>{
    try{

        const id=req.params.id;
        const deleted=await  PostModel.findByIdAndDelete(id);
        if(deleted)
        {
            res.status(200).send({msg:"post deleted",data:deleted})
        }
        else{
            res.status(200).send({msg:"post not found"})
        }
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
 })
 module.exports={
    postrouter
 }
