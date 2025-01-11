import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function Navbar() {
  // to signIn
  const { openSignIn } = useClerk()
  // to get userData if userLoggedIn
  const { user } = useUser()

  const navigate = useNavigate()

  const { setShowRecruiterLogin } = useContext(AppContext)

  const {setShowAdminLogin}=useContext(AppContext)

  // State to toggle the dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Function to toggle the dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  return (
    <div className='shadow py-4'>
      <div className='container px-2 2xl:px-20 mx-auto flex justify-between items-center'>
        <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.logo} alt="logo" />
        {
          user ? 
          <div className='flex items-center gap-3'>
            <Link to={'/applications'}>Applied Jobs</Link>
            <p>||</p>
            <p className='max-sm:hidden'>Hi, {user.firstName + " " + user.lastName}</p>
            <UserButton />
          </div> :
          <div className='relative'>
            {/* Dropdown Button */}
            <button 
              onClick={toggleDropdown} 
              className='bg-blue-600 text-white px-2 sm:px-10 py-2 rounded-full max-sm:px-4 max-sm:py-2 max-sm:w-full'>
              Login
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 sm:w-56 bg-white shadow-lg rounded-md z-10 max-sm:w-full'>
                <div 
                  onClick={e => setShowRecruiterLogin(true)} 
                  className='px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer text-sm max-sm:px-3'>
                  Recruiter Login
                </div>
                <div 
                  onClick={e => setShowAdminLogin(true)} 
                  className='px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer text-sm max-sm:px-3'>
                  Admin Login
                </div>
                <div 
                  onClick={e => openSignIn()} 
                  className='px-4 py-2 text-gray-600 hover:bg-gray-100 text-sm cursor-pointer max-sm:px-3'>
                  User Login
                </div>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar
