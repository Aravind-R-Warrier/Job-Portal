import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Applications() {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } =
    useContext(AppContext);
  const { user } = useUser();
  const { getToken } = useAuth();

  // Update resume
  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append('resume', resume);
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/users/update-resume`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        await fetchUserData();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setResume(null);
    setIsEdit(false);
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="container p-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>

        <div className="flex gap-2 mb-6 mt-3">
          {isEdit || (userData && userData.resume === '') ? (
            <>
              <label className="flex items-center" htmlFor="resume-upload">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  {resume ? resume.name : 'Select Resume'}
                </p>
                <input
                  id="resume-upload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="" />
                <button
                  onClick={updateResume}
                  className="bg-green-100 text-gray border border-green-600 rounded-lg px-4 py-2 ml-2"
                >
                  Save
                </button>
              </label>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                href={userData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        <table className="min-w-full border rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">Company</th>
              <th className="py-3 px-4 border-b text-left">Job Title</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">
                Location
              </th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">Date</th>
              <th className="py-3 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {userApplications.map((job, index) =>
              job && job.jobId ? (
                <tr key={index}>
                  <td className="py-3 px-4 flex items-center border-b gap-2">
                    <img
                      className="w-8 h-8"
                      src={job.companyId?.image || assets.placeholderImage}
                      alt="Company"
                    />
                    {job.companyId?.name || 'Unknown Company'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {job.jobId.title || 'Unknown Title'}
                  </td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {job.jobId.location || 'Unknown Location'}
                  </td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {job.date ? moment(job.date).format('ll') : 'Unknown Date'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`${
                        job.status === 'Accepted'
                          ? 'bg-green-100'
                          : job.status === 'Rejected'
                          ? 'bg-red-100'
                          : 'bg-blue-100'
                      } px-4 py-1.5 rounded`}
                    >
                      {job.status || 'Unknown Status'}
                    </span>
                  </td>
                </tr>
              ) : (
                null
              )
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default Applications;
