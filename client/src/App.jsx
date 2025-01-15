import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RcruiterLogin from './components/RcruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ManageUsers from './pages/ManageUsers'
import ManageRecruiters from './pages/ManageRecruiters'
import AdminHome from './pages/AdminHome'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const { showRecruiterLogin } = useContext(AppContext)
  const { showAdminLogin,companyToken } = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <RcruiterLogin />}
      <ToastContainer/>
      {showAdminLogin && <AdminLogin />}
      {/* applicant-side */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />

        {/* Dashboard route with nested routes recruiter*/}
        <Route path='/dashboard' element={<Dashboard />}>
        { companyToken?<> <Route path='add-job' element={<AddJob />} />
          <Route path='manage-jobs' element={<ManageJobs />} />
          <Route path='view-applications' element={<ViewApplications />} />
          </>:null
        }
        </Route>

        {/* Dashboard route with nested routes Admin*/}
        <Route path='/adminDashboard' element={<AdminDashboard />}>
          <Route path='admin-home' element={<AdminHome />} />
          <Route path='manage-users' element={<ManageUsers />} />
          <Route path='manage-recruiters' element={<ManageRecruiters />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
