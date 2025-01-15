import Companay from "../Models/company.js"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import generateToken from "../utils/generateToken.js"
import Job from "../Models/job.js"
import jobApplication from "../Models/jobApplication.js"


// register a new company
export const registerCompany=async(req,res)=>{
    const{name,email,password}=req.body
    const imageFile=req.file
    if (!name || !email || !password || !imageFile) {
        return res.json({success:false,message:"missing Details"})
    }else{
        try {
            const companyExists=await Companay.findOne({email})
            if(companyExists){
                return res.json({success:false,message:"company already exist"})
            }else{
                // bcypt password
                const salt=await bcrypt.genSalt(10)
                const hashPassword=await bcrypt.hash(password,salt)

                const imageUpload=await cloudinary.uploader.upload(imageFile.path)
                const company=await Companay.create({
                    name,
                    email,
                    password:hashPassword,
                    image:imageUpload.secure_url
                })
                res.json({
                    success:true,
                    company:{
                        _id:company._id,
                        name:company.name,
                        email:company.email,
                        image:company.image
                    },
                    token:generateToken(company._id)
                })
            }
        } catch (error) {
            res.json({
                success:false,
                message:error.message
            })
        }
    }
}

// company login
export const loginCompany=async(req,res)=>{
const {email,password}=req.body
try {
    const company=await Companay.findOne({email})
   
    if(await bcrypt.compare(password,company.password)){
        res.json({success:true,company:{
            _id:company._id,
            name:company.name,
            email:company.email,
            image:company.image
        },
        token:generateToken(company._id)
    })
    }else{
        res.json({success:false,message:"invalid email/password"})
    }
} catch (error) {
    res.json({success:false,message:error.message})
}

}

// post jobs
export const postJob=async(req,res)=>{
const{title,description,location,salary,level,category}=req.body
const companyId=req.company._id
// console.log(companyId,title,description,location,salary)
try {
    const newJob=new Job({
        title,
        description,
        location,
        salary,
        companyId,
        date:Date.now(),
        level,
        category,
       
    })
    await newJob.save()
    res.json({success:true,newJob})

} catch (error) {
    res.json({success:false,message:error.message})
}
}

// getcompanydata
export const getCompanyData=async(req,res)=>{
const company=req.company
try {
    res.json({success:true,company})
} catch (error) {
    res.json({success:false,message:error.message})
}
}

// get company job applicants
export const getCompanyJobApplicants=async(req,res)=>{

    try {
        const companyId=req.company._id

        const applications=await jobApplication.find({companyId}).populate('userId','name image resume')
        .populate('jobId','title location category level salary').exec()
        res.json({success:true,applications})
    } catch (error) {
        res.json({success:true,message:error.message})
    }
}

// get Company posted jobs
export const getCompanyPostedJobs=async(req,res)=>{
    try {
        const companyId=req.company._id
        const jobs=await Job.find({companyId})

        //  adding number of applicants
        const jobsData=await Promise.all(jobs.map(async(job)=>{
            const applicants=await jobApplication.find({jobId:job._id})
            return {...job.toObject(),applicants:applicants.length}
        }))
        res.json({success:true,jobsData})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// chage job application status
export const changeJobApplicationsStatus=async(req,res)=>{
   try {
    const{id,status}=req.body
    // findJobApplicationdata and updatestatus
    await jobApplication.findOneAndUpdate({_id:id},{status})
    res.json({success:true,message:'Status changed'})
   } catch (error) {
    res.json({success:false,message:error.message})
   }
}

// chage job Visibility
export const changeVisiblity=async(req,res)=>{
    try {
        const {id}=req.body
        const companyId=req.company._id

        const job=await Job.findById(id)
        
        if(companyId.toString() === job.companyId.toString()){
            job.visible !== job.visible
        }
       
        await job.save()
        res.json({success:true,job})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}