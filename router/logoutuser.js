const express=require('express')
const jwt=require('jsonwebtoken')
const router=express.Router()
const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const authorization = require('../middleware/Authorization')
router.post('/logout',authorization,async (req,res)=>{
    const cookies=req.cookies
    console.log(cookies);
    if (cookies?.jwtrefreshtoken){res.clearCookie('jwtrefreshtoken',{httpOnly:true,maxAge:24*60*60*1000,sameSite:'none'})} 
    else{res.send('unable to logout,"jwtrefreshtoken" in cookie not found.')}
    await User.findOne({jwtrefreshtoken:cookies.jwtrefreshtoken})
    await User.updateOne({jwtrefreshtoken:cookies.jwtrefreshtoken},{$set:{jwtrefreshtoken:''}})

    

}
)


module.exports=router