import jwt from 'jsonwebtoken'

const generateToken=(id)=>{
    return jwt.sign({id},process.env.jwt_secret,{
        expiresIn:"30d"
    })
}

export default generateToken