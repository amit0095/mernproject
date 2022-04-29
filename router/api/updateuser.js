const express=require('express')
const app=express()
const router=express.Router()
const User=require('../../models/userModel')
const bcrypt=require('bcrypt')
const authorization = require('../../middleware/Authorization')
router.post('/updateuser',authorization,async (req,res)=>{
    const data=req.body
    const result=await User.find({email:data.email})
    const updatedfield=await User.findByIdAndUpdate(result._id,{country:data.updatedcountry})
    if(result){
        if(updatedfield){
            res.status(202).send('field has been updated successfully')
        }
        else{
            res.send('updating field failed')
        }
    }
    else{
        res.send('user not found')
    }

})
router.post('/updatepassword',authorization,async (req,res)=>{
    const data=req.body
    const result=await User.find({email:data.email})
    data.updatedpassword=await bcrypt.hash(data.updatedpassword,7)


    const updateduser=await User.findByIdAndUpdate(result._id,{$set:{password:data.updatedpassword}})
    console.log(updateduser)
    if(result){
        if(updateduser){
            res.status(202).send('new password updated')
        }
        else{
            res.send('updating password failed')
        }
    }
    else{
        res.send('user not found')
    }

})
router.post('/deactivate',authorization,async (req,res)=>{
    const data=req.body
    const result=await User.find({email:data.email})
    const deactiveuser=await User.findByIdAndUpdate(result._id,{active:false})
    console.log(result)
    if(result){
        if(deactiveuser){
            res.status(202).send('deactivated account successfully')
        }
        else{
            res.send('deactivation failed')
        }
    }
    else{
        res.send('user not found')
    }

})
router.post('/activate',authorization,async (req,res)=>{
    const data=req.body
    const result=await User.find({email:data.email})
    const activeuser=await User.findByIdAndUpdate(result._id,{active:true})
    console.log(result)
    if(result){
        if(activeuser){
            res.status(202).send('activated account successfully')
        }
        else{
            res.send('activation failed')
        }
    }
    else{
        res.send('user not found')
    }

}
)

module.exports=router