import jwt from 'jsonwebtoken'
import Companay from '../Models/company.js'

export const protectCompany=async(req,res,next)=>{
const token=req.headers.token
if(!token){
    return res.json({success:false,message:"Not Autharised Login again"})
}else{
    try {
        const decoded=jwt.verify(token,process.env.jwt_secret)
        req.company=await Companay.findById(decoded.id).select('-password')
        next()
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
}