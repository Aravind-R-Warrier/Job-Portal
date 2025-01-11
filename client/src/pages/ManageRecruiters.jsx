import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { manageJobsData } from '../assets/assets'





function ManageRecruiters() {
    const navigate=useNavigate()
  

  return (
    <div className='container p-4 max-w-5xl'>
          <div className='overflor-x-auto'>
            <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
              <thead>
                <tr>
                  <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
                  <th className='py-2 px-4 border-b text-left'>Company</th>
                  <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
                  <th className='py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
                  <th className='py-2 px-4 border-b text-center'>Applicants</th>
                  <th className='py-2 px-4 border-b text-left'>Visible</th>
                </tr>
              </thead>
              <tbody>
                {manageJobsData.map((job,index)=>(
                  <tr key={index} className='text-grey-700'>
                    <td className='py-2 px-4 border-b max-sm:hidden'>{index+1}</td>
                    <td className='py-2 px-4 border-b'>Company name</td>
                    <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                    <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
                    <td className='py-2 px-4 border-b text-center'>{job.applicants}</td>
                    <td className='py-2 px-4 border-b'>
                      <button className='text-red-500 bg-red-100 py-1'>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='mt-4 flex justify-end'>
            <button onClick={(e)=>navigate('/adminDashboard/admin-home')} className='bg-black text-white py-2 px-4 rounded'>Home</button>
          </div>
        </div>
  )
}

export default ManageRecruiters
