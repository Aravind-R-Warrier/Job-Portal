import React, { useContext, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { LineChart, Line } from 'recharts';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

function AdminHome() {
  const { jobs, userApplications, setJobs } = useContext(AppContext);

  // Function to increment job views when a job is clicked
  const incrementJobView = async (jobId) => {
    try {
      const { data } = await axios.get(`/api/jobs/${jobId}`);
      if (data.success) {
        // Update the local job state with the incremented view count
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId ? { ...job, views: (job.views || 0) + 1 } : job
          )
        );
      }
    } catch (error) {
      console.error('Error incrementing job view:', error);
    }
  };

  // Filter jobs with views > 0
  const viewedJobs = jobs.filter((job) => job.views > 0);

  // Sample data for charts (filtered jobs)
  const applicantStats = viewedJobs.map((job) => {
    // Calculate new applicants for each job (you can adjust based on how new applicants are tracked)
    const newApplicants = userApplications.filter(
      (app) => app.jobId === job._id && new Date(app.date).getMonth() === new Date().getMonth() // Assuming new applications are for the current month
    ).length;

    return {
      name: job.title, // Job Title
      newApplicants: newApplicants, // New Applicants
      jobViews: job.views || 0, // Job views
      location: job.location, // Job Location
      level: job.level, // Job Level
    };
  });

  const pieColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold mb-6">Dashboard</h1>

      {/* Grid layout with Tailwind CSS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg">
  <h2 className="text-xl font-medium mb-4">Job Views</h2>
  <ResponsiveContainer width={600} height={300}>
    <BarChart data={applicantStats}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {/* Only show the Job Views bar */}
      <Bar dataKey="jobViews" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
</div>

        {/* Pie Chart */}
        <div className="mt-5 mr-8 p-0 ml-10 bg-white  rounded-lg">
          <ResponsiveContainer width={800} height={400}>
            <PieChart>
              <Pie
                data={applicantStats}
                dataKey="jobViews"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {applicantStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <br />

        {/* Line Chart for Monthly Applications */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-medium mb-4">Monthly Applications</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={Object.values(
                userApplications.reduce((acc, app) => {
                  const month = new Date(app.date).toLocaleString('default', { month: 'short', year: 'numeric' });

                  if (!acc[month]) {
                    acc[month] = { month, newApplications: 0, accepted: 0, rejected: 0 };
                  }

                  // Increment the count for new applications
                  acc[month].newApplications += 1;

                  // Increment based on the status of the application
                  if (app.status === 'Accepted') acc[month].accepted += 1;
                  if (app.status === 'Rejected') acc[month].rejected += 1;

                  return acc;
                }, {})
              )}
            >
              {/* CartesianGrid and Axis */}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />

              {/* Ensure all lines are visible, even with 0 data */}
              <Line 
                type="monotone" 
                dataKey="newApplications" 
                stroke="#8884d8" 
                name="New Applications" 
                dot={false} 
              />
              <Line 
                type="monotone" 
                dataKey="accepted" 
                stroke="#82ca9d" 
                name="Accepted Applications" 
                dot={false} 
              />
              <Line 
                type="monotone" 
                dataKey="rejected" 
                stroke="#FF8042" 
                name="Rejected Applications" 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Displaying Viewed Job Information */}
      <div className="mt-6">
        <h2 className="text-xl font-medium mb-4">Viewed Job Details</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Level</th>
              <th className="py-3 px-6 text-left">Views</th>
            </tr>
          </thead>
          <tbody>
            {viewedJobs.map((job, index) => (
              <tr key={index}>
                <td className="py-3 px-6">{job.title}</td>
                <td className="py-3 px-6">{job.location}</td>
                <td className="py-3 px-6">{job.level}</td>
                <td className="py-3 px-6">{job.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminHome;
