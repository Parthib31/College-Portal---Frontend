// // FacultyProfile.js
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../../styles/facultyInfo.css";
// import defaultImage from "../../assets/anonymous.png";

// const URL = "http://localhost:5000";

// const FacultyInfo = () => {
//   const { id } = useParams();
//   const [faculty, setFaculty] = useState(null);

//   useEffect(() => {
//     const fetchFacultyDetails = async () => {
//       try {
//         const response = await axios.get(`${URL}/api/faculty/${id}`);
//         setFaculty(response.data);
//       } catch (error) {
//         console.error("Error fetching faculty details:", error);
//       }
//     };

//     fetchFacultyDetails();
//   }, [id]);

//   if (!faculty) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <img
//           src={defaultImage} // Use default image if photoUrl is not provided
//           alt={faculty.name}
//           className="profile-image"
//         />
//         <h2>{faculty.name}</h2>
//       </div>
//       <div className="profile-details">
//         <p><strong>Email:</strong> {faculty.email}</p>
//         <p><strong>Phone:</strong> {faculty.phone}</p>
//         <div>
//           <strong>Education:</strong>
//           <ul>
//             {faculty.education && faculty.education.map((edu, index) => (
//               <li key={index}>{edu}</li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <strong>Research Work:</strong>
//           <p>{faculty.research}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FacultyInfo;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/facultyInfo.css";
import anonymous from "../../assets/anonymous.png"

const URL = "http://localhost:5000";

const FacultyInfo = () => {
  const { id } = useParams();
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(`${URL}/api/faculty/${id}`);
        setFaculty(response.data);
      } catch (error) {
        console.error("Error fetching faculty details:", error);
      }
    };
    fetchFaculty();
  }, [id]);

  if (!faculty) {
    return <p>Loading...</p>;
  }

  return (
    <div className="faculty-profile">
      <h1>{faculty.name}</h1>
      <img src={anonymous} alt={`${faculty.name}`} className="faculty-profile-image" />
      <p>Email: {faculty.email}</p>
      <p>Phone: {faculty.phone}</p>
      
      <h2>Educational Background</h2>
      {faculty.education.map((edu, index) => (
        <div key={edu._id || index} className="education-item">
          <p><strong>Degree:</strong> {edu.degree}</p>
          <p><strong>Institution:</strong> {edu.institution}</p>
          <p><strong>Year:</strong> {edu.year}</p>
          {edu.additionalInfo && <p><strong>Additional Info:</strong> {edu.additionalInfo}</p>}
        </div>
      ))}

      <h2>Research Work</h2>
      <p>{faculty.research}</p>
    </div>
  );
};

export default FacultyInfo;
