import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary=async()=>{
cloudinary.config({
    cloud_name:process.env.cloudinay_Name,
    api_key:process.env.cloudinayApi_Key,
    api_secret:process.env.cloudinaySecret_Key
})

}

export default connectCloudinary