import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

function ManageUsers() {
  return (
    <div className='min-h-screen'>
      <div className='container mx-auto p-4'>
        <div>
          <table className='w-full max-w-4xl bg-white border-gray-200'>
            <thead>
              <tr className='border-b'>
                <th className='py-2 px-4 text-left text-sm sm:text-base'>#</th>
                <th className='py-2 px-4 text-left text-sm sm:text-base'>User name</th>
                <th className='py-2 px-4 text-left text-sm sm:text-base'>Job title</th>
                <th className='py-2 px-4 text-left text-sm sm:text-base max-sm:hidden'>Location</th>
                <th className='py-2 px-4 text-left text-sm sm:text-base'>Action</th>
              </tr>
            </thead>
            <tbody>
              {viewApplicationsPageData.map((application, index) => (
                <tr key={index} className='text-gray-700'>
                  <td className='py-2 px-4 border-b text-center'>{index + 1}</td>
                  <td className='py-2 px-4 border-b text-center flex items-center'>
                    <img className='w-10 h-10 rounded-full mr-3 sm:hidden' src={application.imgSrc} alt="" />
                    <span className='flex items-center'>{application.name}</span>
                  </td>
                  <td className='py-2 px-4 border-b text-center sm:text-left'>{application.jobTitle}</td>
                  <td className='py-2 px-4 border-b text-center sm:text-left max-sm:hidden'>{application.location}</td>
                  <td className='py-2 px-4 border-b text-center'>
                    <div className='relative inline-block text-left group'>
                      <button className='text-red-500 action-button rounded bg-red-100 py-1 sm:text-base'>
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageUsers;
