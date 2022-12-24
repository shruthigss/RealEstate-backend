const express=require('express');
const sceretKey="abcdefghijk";
const router = require('express').Router();
const jwt= require('jsonwebtoken');
const cors=require('cors');
router.use(express.json());
router.use(cors());
const auth=require('../middleware/auth');
const User=require('../models/registerSchema');

//generate token
// const createtoken=async()=>{
//     const token=await jwt.sign({_id:"6329a65ea5274f54d2f6e9d8"},"secretkey123");
//     console.log(token);
//     const userVerify=jwt.verify(token,"secretkey123");
//     console.log(userVerify);
// }
// createtoken();
//login user....
router.post("/login",async (req,res)=>{

    const {email,password}=req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password === user.password){
                const token = jwt.sign(
                    {
                      exp: Math.floor(Date.now() / 1000) + 60 * 60,
                      user: user._id,
                    } , sceretKey
                  );
                res.send({
                    message:"login successfull",
                    user:user,
                    token:token
                })
            }
            else{
                res.send({message: "check userId or password"})
            }
            
        }else{
            res.send({message:"user not register"})
        }
    })
})


//register user...
router.post("/register", (req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    User.findOne({email:email}, async(err,user)=>{
        if(user){
            res.send({message:"user already registered"})
        }else{
            const user= new User({
                email:email,
                password:password
            })
            console.log(`the success part ${user}`);
             await user.save(
                err=>{
                    if(err){
                        res.send(err);
                    }else{
                        res.send({message: "Successfully Registered"})
                    }
                }
            )
        }
    })
    
})

// router.get("/register",async(req,res)=>{
//     try{
//         const data= await User.find();
//         res.status(200).json({
//             status:"success",
//             user:data
//         })
//     }catch(e){
//         res.status(400).json({
//             status:"failed",
//             message:e.message
//         })
//     }
// })

module.exports=router