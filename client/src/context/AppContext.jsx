import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext=createContext()

export const AppContextProvider=({children})=>{
    const[searchFilter,setSearchFilter]=useState({
        title:"",
        location:""
    })
    const[isSearched,setIsSearched]=useState(false)
    const[jobs,setJobs]=useState([])
    const[showRecruiterLogin,setShowRecruiterLogin]=useState(false)
    const[showAdminLogin,setShowAdminLogin]=useState(false)
    
    // function to fetchData
    const fetchJobs=async()=>{
        setJobs(jobsData)
    }

  
    useEffect(()=>{
        fetchJobs()
      
    },[])
    
    const value={
       searchFilter, setSearchFilter,
       setIsSearched, isSearched,
       jobs,setJobs,showRecruiterLogin,setShowRecruiterLogin,
       showAdminLogin,setShowAdminLogin
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}