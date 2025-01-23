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

  // Group by category for Pie chart
  const categoryStats = viewedJobs.reduce((acc, job) => {
    const category = job.category || 'Uncategorized'; // Default category if none exists
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += job.views; // Sum views for each category
    return acc;
  }, {});

  // Convert the category stats into an array for Pie chart
  const categoryData = Object.entries(categoryStats).map(([category, views]) => ({
    name: category,
    jobViews: views,
  }));

  const pieColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347', '#FFD700'];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold mb-6">Dashboard</h1>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bar Chart for Job Views by Job Title */}
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-xl font-medium mb-4">Job Views</h2>
          <ResponsiveContainer width={500} height={300}>
            <BarChart data={viewedJobs}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* Only show the Job Views bar */}
              <Bar dataKey="views" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Job Categories */}
        <div className="mt-5 mr-8 p-0 ml-10 bg-white rounded-lg">
          <ResponsiveContainer width={800} height={400}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="jobViews"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
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
