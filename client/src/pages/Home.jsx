import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import AppDownload from '../components/AppDownload'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate=useNavigate()
  return (
    <div>
      <button className='px-4 py-2 bg-black rounded text-white' onClick={(e)=>navigate('/dashboard/add-job')}>recruiter-dashboard-temp</button>
      <button className='px-4 py-2 bg-black rounded text-white' onClick={(e)=>navigate('/adminDashboard')}>Admin-dashboard-temp</button>
      <Navbar/>
      <Hero/>
      <JobListing/>
      <AppDownload/>
      <Footer/>
    </div>
  )
}

export default Home
