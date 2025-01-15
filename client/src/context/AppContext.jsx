import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext=createContext()

export const AppContextProvider=({children})=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const{user}=useUser()
    const{getToken}=useAuth()
    const[searchFilter,setSearchFilter]=useState({
        title:"",
        location:""
    })
    const[isSearched,setIsSearched]=useState(false)
    const[jobs,setJobs]=useState([])
    const[showRecruiterLogin,setShowRecruiterLogin]=useState(false)
    const[showAdminLogin,setShowAdminLogin]=useState(false)
    const[companyToken,setCompanyToken]=useState(null)
    const[companyData,setCompanyData]=useState(null)
    const[userData,setUserData]=useState(null)
    const[userApplications,setUserApplications]=useState([])
    
    // function to fetchData
    const fetchJobs=async()=>{
        try {
            const{data}=await axios.get(backendUrl+'/api/jobs')
            if(data.success){
                setJobs(data.jobs)
                // console.log(data.jobs)

            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
      
    }
// function to fetch companyData
const fetchCompanyData=async()=>{
    try {
        const {data}=await axios.get(backendUrl+'/api/company/company',{headers:{token:companyToken}})
        if(data.success){
            // console.log(data)
            setCompanyData(data.company)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

// fn to fetchUserdata
const fetchUserData=async()=>{
    try {
        const token=await getToken()
        const{data}=await axios.get(backendUrl+'/api/users/user',
            {headers:{Authorization:`Bearer ${token}`}})
            if(data.success){
                setUserData(data.user)
            }else{
                toast.error(data.message)
            }
    } catch (error) {
        toast.error(error.message)
    }
}

// get user applications
const fetchUserApplications=async()=>{
    try {
        const token=await getToken()
        const{data}=await axios.get(backendUrl+'/api/users/applications',
            {headers:{Authorization:`Bearer ${token}`}})
            if(data.success){
                setUserApplications(data.applications)
            }else{
                toast.error(data.message)
            }
    } catch (error) {
        toast.error(error.message)
    }
}

    useEffect(()=>{
        fetchJobs()
      const storedCompanyToken=localStorage.getItem('token')
      if(storedCompanyToken){
        setCompanyToken(storedCompanyToken)
      }
    },[])

    useEffect(()=>{
        if(companyToken){
            fetchCompanyData()
        }
    },[companyToken])
    
    useEffect(()=>{
        if(user){
            fetchUserData()
            fetchUserApplications()
        }
    },[user])

useEffect(()=>{

},[])

    const value={
       searchFilter, setSearchFilter,
       setIsSearched, isSearched,
       jobs,setJobs,showRecruiterLogin,setShowRecruiterLogin,
       showAdminLogin,setShowAdminLogin,companyToken,setCompanyToken,
       companyData,setCompanyData,backendUrl,userData,setUserData,userApplications,
       setUserApplications,fetchUserData,fetchUserApplications
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}