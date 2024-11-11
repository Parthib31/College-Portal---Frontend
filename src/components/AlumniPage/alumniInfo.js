import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/alumniInfo.css";
import anonymous from "../../assets/anonymous.png";

const URL = "http://localhost:5000";

const AlumniInfo = () => {
  const { id } = useParams();
  const [alumni, setAlumni] = useState(null);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.get(`${URL}/api/alumni/${id}`);
        setAlumni(response.data);
      } catch (error) {
        console.error("Error fetching alumni details:", error);
      }
    };
    fetchAlumni();
  }, [id]);

  if (!alumni) {
    return <p>Loading...</p>;
  }

  return (
    <div className="alumni-profile">
      <h1>{alumni.name}</h1>
      <img src={anonymous} alt={`${alumni.name}`} className="alumni-profile-image" />
      <p><strong>Email:</strong> {alumni.email}</p>
      <p><strong>Phone:</strong> {alumni.phone}</p>
      <p><strong>Roll No:</strong> {alumni.roll_no}</p>

      <h2>Educational Background</h2>
      <p><strong>Degree:</strong> {alumni.degree}</p>
      <p><strong>Year of Graduation:</strong> {alumni.year}</p>
      <p><strong>Department:</strong> {alumni.department}</p>
      <p><strong>Grade:</strong> {alumni.grade}</p>

      <h2>Current Profession</h2>
      <p>{alumni.profession}</p>
    </div>
  );
};

export default AlumniInfo;