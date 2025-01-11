import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

function JobListing() {
    // contextApi
    const { isSearched, searchFilter,setSearchFilter,jobs } = useContext(AppContext)
    //show close or filter option in sm screen
    const[showFilter,setShowFilter]=useState(true)
    // state for pagination
    const[currentPage,setCurrentPage]=useState(1)
    //filterd data for catagories
    const[selectedCatagories,setSelectedCatagories]=useState([])
     //filterd data for location
    const[selectedLocation,setSelectedLocation]=useState([])
     //filterd jobs
    const[filteredJobs,setFilteredJobs]=useState(jobs)

    const handleCatagoriesChange=(catagory)=>{
        setSelectedCatagories(
            prev=>prev.includes(catagory)?prev.filter(c=>c!==catagory):[...prev,catagory]
        )
    }

    const handleLocationChange=(location)=>{
        setSelectedLocation(
            prev=>prev.includes(location)?prev.filter(c=>c!==location):[...prev,location]
        )
    }

    useEffect(()=>{
        const matchingCatagories=jobs=>selectedCatagories.length===0 || selectedCatagories.includes(jobs.category)
        const matchingLocations=jobs=>selectedLocation.length===0 || selectedLocation.includes(jobs.location)
        const matchingTitle=jobs=>searchFilter.title==='' || jobs.title.toLowerCase().includes(searchFilter.title.toLowerCase())
        const matchSearchLocation=jobs=>searchFilter.location==='' || jobs.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs=jobs.slice().reverse().filter(
            job=>matchingCatagories(job)&&matchSearchLocation(job)&&matchingLocations(job)&&matchingTitle(job)
        )
        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)
    },[jobs,searchFilter,selectedCatagories,selectedLocation])

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
            {/* sidebar */}
            <div className='w-full lg:w-1/4 bg-white px-4'>
                {/* searchFilter from hero component */}
                {
                    isSearched && (searchFilter.location !== "") && (
                        <>
                            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                            <div className='mb-4 text-grey-600'>
                                {searchFilter.title && (
                                    <span className='inline-flex items-center gap-2.5 bg-blue-50 border-blue-200 px-4 py-1.5 rounded'>
                                        {searchFilter.title}
                                        <img onClick={e=>setSearchFilter(prev=>({...prev,title:''}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                                {searchFilter.location && (
                                    <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50  border-red-200 px-4 py-1.5 rounded'>
                                        {searchFilter.location}
                                        <img onClick={e=>setSearchFilter(prev=>({...prev,location:''}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                            </div>
                        </>
                    )
                }
                <button onClick={e=>setShowFilter(prev=>!prev)} className='px-6 py-1.5 rounded border border-grey-400 lg:hidden'>
                    {showFilter?"Close":"Filters"}
                </button>
                {/* catagory filter */}
                <div className={showFilter?"":"max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4'>Search by Catagories</h4>
                    <ul className='space-y-4 text-grey-600'>
                    {
                        JobCategories.map((catagory,i)=>(
                            <li className='flex gap-3 items-center' key={i}>
                                <input className='scale-125'
                                 type="checkbox"
                                 onChange={()=>handleCatagoriesChange(catagory)}
                                 checked={selectedCatagories.includes(catagory)} />
                                {catagory}
                            </li>
                        ))
                    }
                    </ul>
                </div>
                  {/* Location filter */}
                <div  className={showFilter?"":"max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4 pt-14'>Search by Locations</h4>
                    <ul className='space-y-4 text-grey-600'>
                    {
                        JobLocations.map((location,i)=>(
                            <li className='flex gap-3 items-center' key={i}>
                                <input className='scale-125'
                                 type="checkbox"
                                 onChange={()=>handleLocationChange(location)}
                                 checked={selectedLocation.includes(location)} />
                                {location}
                            </li>
                        ))
                    }
                    </ul>
                </div>
            </div>

            {/* Joblistings */}
            <section className='w-full lg:3/4 text-gray-800 max-lg:px-4'>
                <h3 className='font-medium text-3xl py-2'id='job-list' >Latest Jobs</h3>
                <p className='mb-8 '>Get your desired job from top companies</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                   {filteredJobs.slice((currentPage-1)*6,currentPage*6).map((job,index)=>(
                    <JobCard key={index} job={job}/>
                   ))}
                </div>
                {/* pagination */}
                {filteredJobs.length>0 &&(
                    <div className='flex items-center justify-center space-x-2 mt-10'>
                        <a href="#job-list">
                            <img onClick={()=>setCurrentPage(Math.max(currentPage-1),1)} src={assets.left_arrow_icon} alt="" />
                        </a>
                        {Array.from({length:Math.ceil(filteredJobs.length/6)}).map((_,index)=>(
                            <a key={index} href="#job-list">
                              <button onClick={()=>setCurrentPage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-grey-300 rounded ${currentPage===index+1?'bg-blue-100 text-blue-500':'text-grey-500'}`}>{index+1}</button>
                            </a>
                        ))}
                        <a href="#job-list">
                            <img onClick={()=>setCurrentPage(Math.min(currentPage+1),1)} src={assets.right_arrow_icon} alt="" />
                        </a>
                    </div>
                )}
            </section>
        </div>
    )
}

export default JobListing
