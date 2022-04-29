const express=require('express')
const app=express()
const router=express.Router()
const User2=require('../models/userModel')
const authorization = require('../middleware/Authorization')
router.get('/fetchApi',async (req,res)=>{
    const body=req.body
    const filteredData1= await User2.find()
    const filteredData= await User2.find({city:"Mumbai"})
    console.log(filteredData)
    res.status(200).send({filteredData})

})
module.exports=router