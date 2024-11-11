import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/facultyList.css";
import ano from "../../assets/anonymous.png"

const URL = "http://localhost:5000";

const FacultyList = () => {
  const [facultyList, setFacultyList] = useState([]);

  // Fetch faculty list from the backend using Axios
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(`${URL}/api/faculty`);
        setFacultyList(response.data);
      } catch (error) {
        console.error("Error fetching faculty list:", error);
      }
    };
    fetchFaculty();
  }, []);

  return (
    <div>
      <h1>Faculty Members</h1>
      <div className="faculty-list">
        {facultyList.map((faculty) => (
          <div key={faculty._id} className="faculty-card">
            <img
              src={ano}
              alt="Faculty Portrait"
              className="faculty-image"
            />
            <h2>{faculty.name}</h2>
            <p>Phone: {faculty.phone}</p>
            <p>Email: {faculty.email}</p>
            <Link to={`/faculty/${faculty._id}`} className="view-profile-button">
              View Profile
            </Link>
          </div>
        ))}
        
      </div>
      <Link to="/faculty/apply" className="apply-link">Apply here</Link>
    </div>
  );
};

export default FacultyList;
