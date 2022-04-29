const express=require('express')
const jwt=require('jsonwebtoken')
const router=express.Router()
const User=require('../models/userModel')
const authorization = require('../middleware/Authorization')
router.post('/refresh',authorization,async (req,res)=>{
    const cookies=req.cookies
    console.log(cookies);
    if (cookies?.jwtrefreshtoken){
        const refresh=await User.findOne({jwtrefreshtoken:cookies.jwtrefreshtoken})
        if(refresh){
            await jwt.verify(cookies.jwtrefreshtoken,"jamesbond", async (err,decoded)=>{
                let refreshTokenCount=0;
                if(err){res.send(`sent refresh token is not valid with err ${err}`)}
                else{

                    const accessToken=await jwt.sign({email:decoded.email},"jamesbond",{expiresIn:'30s'})
                    res.status(202).send({
                        activeStatus:true,
                        msg:`authentication matched successfully for refreshToken-${refreshTokenCount}`,
                        accessToken:accessToken})
                    refreshTokenCount++;
                }
                
            })
        }else{res.status(403).send("jwtrefreshtoken isn't found in DB.")}
    } 
    else{res.status(403).send('unable to send new accessToken ,"jwtrefreshtoken" in cookie not found.')}
}
)


module.exports=router