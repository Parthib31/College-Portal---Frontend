import React, { useState, useEffect } from "react";
import "../../styles/adminDashboard.css"; // Import the CSS file

const URL = "http://localhost:5000";

const AdminDashboard = ({ token }) => {
  const [facultyApplications, setFacultyApplications] = useState([]);
  const [alumniApplications, setAlumniApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const facultyResponse = await fetch(`${URL}/api/admin/faculty/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const facultyData = await facultyResponse.json();
        setFacultyApplications(facultyData);

        const alumniResponse = await fetch(`${URL}/api/admin/alumni/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const alumniData = await alumniResponse.json();
        setAlumniApplications(alumniData);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, [token]);

  const handleApproval = async (id, approved, type) => {
    try {
      const route = type === "faculty" ? "faculty/applications" : "alumni/applications";
      await fetch(`${URL}/api/admin/${route}/${id}/${approved}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ approved }),
      });

      if (type === "faculty") {
        setFacultyApplications((prev) => prev.filter((app) => app._id !== id));
      } else {
        setAlumniApplications((prev) => prev.filter((app) => app._id !== id));
      }
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Pending Faculty Applications</h2>
      {facultyApplications.length > 0 ? (
        facultyApplications.map((app) => (
          <div key={app._id} className="application-card">
            <p>Name: {app.name}</p>
            <p>Email: {app.email}</p>
            <button
              className="approve-button"
              onClick={() => handleApproval(app._id, true, "faculty")}
            >
              Approve
            </button>
            <button
              className="reject-button"
              onClick={() => handleApproval(app._id, false, "faculty")}
            >
              Reject
            </button>
          </div>
        ))
      ) : (
        <p className="no-applications">No pending faculty applications.</p>
      )}

      <h2>Pending Alumni Applications</h2>
      {alumniApplications.length > 0 ? (
        alumniApplications.map((app) => (
          <div key={app._id} className="application-card">
            <p>Name: {app.name}</p>
            <p>Email: {app.email}</p>
            <button
              className="approve-button"
              onClick={() => handleApproval(app._id, true, "alumni")}
            >
              Approve
            </button>
            <button
              className="reject-button"
              onClick={() => handleApproval(app._id, false, "alumni")}
            >
              Reject
            </button>
          </div>
        ))
      ) : (
        <p className="no-applications">No pending alumni applications.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
