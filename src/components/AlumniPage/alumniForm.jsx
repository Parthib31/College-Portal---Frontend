import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/alumniForm.css";

const URL = "http://localhost:5000";

const AlumniForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    degree: "",
    year: "",
    department: "",
    roll_no: "",
    grade: "",
    profession: ""
  });
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handlePrevious = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/api/alumni/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Application submitted successfully!");
        navigate("/");
      } else {
        alert("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Alumni Application Form</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-section personal-details">
            <h3>Personal Details</h3>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
            <input type="text" name="roll_no" value={formData.roll_no} onChange={handleChange} placeholder="Roll Number" required />
          </div>
        )}

        {step === 2 && (
          <div className="form-section academic-details">
            <h3>Academic Details</h3>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="Degree (e.g., B.Tech, M.Tech)"
              required
            />
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Year of Graduation"
              required
            />
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Department"
              required
            />
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="Grade (e.g., A, B)"
              required
            />
          </div>
        )}

        {step === 3 && (
          <div className="form-section professional-details">
            <h3>Professional Details</h3>
            <textarea
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              placeholder="Current Profession"
              required
            />
          </div>
        )}

        <div className="form-navigation">
          {step > 1 && <button type="button" onClick={handlePrevious} className="nav-button">Previous</button>}
          {step < 3 ? (
            <button type="button" onClick={handleNext} className="nav-button">Next</button>
          ) : (
            <button type="submit" className="submit-button">Submit Application</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AlumniForm;
