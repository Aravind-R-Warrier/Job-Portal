import Job from "../Models/job.js"
import jobApplication from "../Models/jobApplication.js"
import User from "../Models/user.js"
import {v2 as cloudinary} from 'cloudinary'


// get user data
export const getUserData = async (req, res) => {

    const userId = req.auth.userId

    try {
        const user = await User.findById(userId)
        if (!user) {
            res.json({ success: false, message: "user not found" })
        } else {
            res.json({ success: true, user })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// apply for job
export const applyForJob = async (req, res) => {

    const { jobId } = req.body
    const userId = req.auth.userId
    try {
        const isAlreadyApplied = await jobApplication.find({ jobId, userId })
        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: "Already Applied" })
        } else {
            const jobData = await Job.findById(jobId)

            if (!jobData) {
                return res.json({ success: false, message: "Job not found" })
            } else {
                await jobApplication.create({
                    companyId: jobData.companyId,
                    userId,
                    jobId,
                    date: Date.now(),
                })
                res.json({ success: true, message: 'Job application Created successFully' })
            }
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// getuser applied applications
export const getUserJobApplications = async (req, res) => {

    try {
        const userId = req.auth.userId
        const applications = await jobApplication.find({ userId }).populate('companyId','name email image').populate('jobId','title description location category level salary ')
        .exec()
        if(!applications){
            res.json({success:false,message:"no Job application not founded"})
        }else{
            res.json({success:true,applications})
        }
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// update user profile resume
export const updateUserResume = async (req, res) => {
    try {
        const userId=req.auth.userId
        const resumeFile=req.file
        const userData=await User.findById(userId)
        if(resumeFile){
            const resumeUpload=await cloudinary.uploader.upload(resumeFile.path)
            userData.resume=resumeUpload.secure_url
        }

        await userData.save()
        return res.json({success:true,message:"Resume Updated"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
