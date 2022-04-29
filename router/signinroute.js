const express=require('express')
const jwt=require('jsonwebtoken')
const router=express.Router()
const User=require('../models/userModel')
const bcrypt=require('bcrypt')
router.post('/signin',async (req,res)=>{
    const data=req.body
    console.log(data);
    try{
        if (data.emailorphone.match(/\d{1,10}/)) {
        data.phoneno=data.emailorphone  
            } else {
        data.email=data.emailorphone}
        console.log(data);
    }catch (err){console.log(err);}
    
    const user=await User.findOne({$or:[{email:data.email},{phoneno:data.phoneno}]})
    console.log(user)
    if(user){
        const authentication=await bcrypt.compare(data.password,user.password)
        if(authentication){
            const accessToken=jwt.sign({email:user.email},"jamesbond",{expiresIn:'30s'})
            const refreshToken=jwt.sign({email:user.email},"jamesbond",{expiresIn:'1d',})
            await User.findByIdAndUpdate(user._id,{jwtrefreshtoken:refreshToken})
            res.cookie('jwtrefreshtoken',refreshToken,{httpOnly:true,maxAge:24*60*60*1000,sameSite:'none'})
            res.status(202).send({
                activeStatus:true,
                msg:'authentication matched successfully',
                accessToken:accessToken})
        }
        else{
            res.send({
                activeStatus:false,
                msg:'authentication failed',
                token:null})
        }
    }
    else{
        res.send('user not found')
    }

}
)


module.exports=router