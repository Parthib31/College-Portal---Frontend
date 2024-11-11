import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/alumniList.css";
import ano from "../../assets/anonymous.png";

const URL = "http://localhost:5000";

const AlumniList = () => {
  const [alumniList, setAlumniList] = useState([]);

  // Fetch alumni list from the backend using Axios
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.get(`${URL}/api/alumni`);
        setAlumniList(response.data);
      } catch (error) {
        console.error("Error fetching alumni list:", error);
      }
    };
    fetchAlumni();
  }, []);

  return (
    <div>
      <h1>Alumni Members</h1>
      <div className="alumni-list">
        {alumniList.map((alumni) => (
          <div key={alumni._id} className="alumni-card">
            <img src={ano} alt="Alumni Portrait" className="alumni-image" />
            <h2>{alumni.name}</h2>
            <p>Email: {alumni.email}</p>
            <p>Phone: {alumni.phone}</p>
            <Link to={`/alumni/${alumni._id}`} className="view-profile-button">
              View Profile
            </Link>
          </div>
        ))}
      </div>
      <Link to="/alumni/apply" className="apply-link">Apply here</Link>
    </div>
  );
};

export default AlumniList;
