import Job from "../Models/job.js"


// Get all Jobs
export const getJobs=async(req,res)=>{
try {
    const jobs=await Job.find({visible:true}).populate({path:'companyId',select:'-password'})
    res.json({success:true,jobs})
} catch (error) {
    res.json({success:false,message:error.message})
}
}


// get a job by id
export const getJobById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Increment the views field
      await Job.findByIdAndUpdate(id, { $inc: { views: 1 } });
  
      // Fetch the job with populated company details
      const job = await Job.findById(id).populate({
        path: 'companyId',
        select: "-password", // Exclude the password field from the company data
      });
  
      if (!job) {
        return res.json({ success: false, message: 'Job not found' });
      }
  
      res.json({ success: true, job });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  };
  