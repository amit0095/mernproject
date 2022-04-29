const express=require('express')
const app=express()
const router=express.Router()
const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const authorization = require('../middleware/Authorization')
router.post('/deleteuser',authorization,async (req,res)=>{
    const data=req.body
    // const user=await User.remove({email:data.email},{justone:true})
    // OR
    const result=await User.findOne({email:data.email})
    const user=await User.remove({_id:result._id})
    console.log(user)
    if(result){
        if(user){
            res.status(202).send('deletation successfully')
        }
        else{
            res.send('deletation failed')
        }
    }
    else{
        res.send('user not found')
    }

    }
)
module.exports=router