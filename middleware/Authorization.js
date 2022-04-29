var jwt=require('jsonwebtoken')
const authorization=(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization||req.headers.Authorization
        if(!authHeader?.startsWith("Bearer ")) return res.status(401).send("Token didn't start with 'Bearer'.")
        const reqtoken=authHeader.split(' ')[1]
        const decodedtoeken=jwt.verify(
            reqtoken,"jamesbond",
            // (err,decoded)=>{if(err)return res.status(401).send({msg:`token authentiation failed with err:  ${err}`,activStatus:false})
            // req.user=decoded.email //jis key se jwt.sign me string di thi.
            // next()}
        )
    } catch (err){
        res.send({msg:`token authentiation failed with err:  ${err}`,activStatus:false})
    }
    next()
}
module.exports=authorization