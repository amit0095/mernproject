var express=require('express')
import { Router } from "express";
import User from "../../models/userModel";
import authorization from "../../middleware/Authorization";
const router=Router()
router.get('/getdata',authorization, async (req,res )=>{
    const data=req.body
    const userinfo=User.findOne({email:data.email})
    res.send({activeStatus:true,msg:'token authentiation succesfull',userinfo:userinfo})
})
module.exports=router