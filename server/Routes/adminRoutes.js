import express from 'express'
import { changeJobApplicationsStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middlewares/AuthMiddleware.js'
const router=express.Router()

// registerCompany
router.post('/register',upload.single('image'),registerCompany)

// company login
router.post('/login',loginCompany)

// get company Data
router.get('/company',getCompanyData)

// post a Job
router.post('/post-jobs',protectCompany,postJob)

// get Applicants data of a Companay
router.get('/applicants',getCompanyJobApplicants)

// get company job listing
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

// get change application status
router.post('/change-status',changeJobApplicationsStatus)

// get change application status
router.post('/change-visiblity',protectCompany,changeVisiblity)


export default router
