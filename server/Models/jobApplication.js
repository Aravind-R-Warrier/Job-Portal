import mongoose from "mongoose";

const jobApplicationSchema=new mongoose.Schema({
    userId:{
        type:String,
        ref:'User',
        required:true
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    }
})

const jobApplication=mongoose.model('JobApplications',jobApplicationSchema)

export default jobApplication