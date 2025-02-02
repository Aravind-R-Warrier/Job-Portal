import { Webhook } from "svix";
import User from '../Models/user.js'
;

// APi controller function for Manage clerck user with DB
 export const clerckWebhooks=async(req,res)=>{
    try {
        // create svix instace with webhooksecret
        const wHook=new Webhook(process.env.clerck_webhook_secret)
        // verify header
        await wHook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })
        // getting data from reqBody
        const {data,type}=req.body

        // switchCase form diffrent event
        switch(type){
            case 'user.created':{
                const userData={
                    _id:data.id,
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + " "+ data.last_name,
                    image:data.image_url,
                    resume:""
                }
                await User.create(userData)
                res.json({})
                break;
            }
            case 'user.updated':{
                const userData={
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + " "+ data.last_name,
                    image:data.image_url,
                }
                await User.findByIdAndUpdate(data.id,userData)
                res.json({})
                break;
            }
            case 'user.deleted':{
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
            default:
                break;

            
        }
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:'webHook Error'})
    }
}
