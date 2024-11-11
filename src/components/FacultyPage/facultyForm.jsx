import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/facultyForm.css";

const URL = "http://localhost:5000";

const FacultyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    parentsName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    education: [{ degree: "", institution: "", year: "", additionalInfo: "" }],
    research: "",
  });
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = formData.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setFormData((prevData) => ({ ...prevData, education: updatedEducation }));
  };
  

  const addEducationField = () => {
    setFormData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        { degree: "", institution: "", year: "", details: "" },
      ],
    }));
  };

  const removeEducationField = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, education: updatedEducation }));
  };

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handlePrevious = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/api/faculty/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(response);
      
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
      <h2>Faculty Application Form</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-section personal-details">
            <h3>Personal Details</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="parentsName"
              value={formData.parentsName}
              onChange={handleChange}
              placeholder="Parent's Name"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
        )}

        {step === 2 && (
          <div className="form-section educational-details">
            <h3>Educational Details</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="education-entry">
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                  placeholder="Degree (e.g., B.Tech, M.Tech, PhD)"
                  required
                />
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    handleEducationChange(index, "institution", e.target.value)
                  }
                  placeholder="Institution"
                  required
                />
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) =>
                    handleEducationChange(index, "year", e.target.value)
                  }
                  placeholder="Year of Completion"
                  required
                />
                <textarea
                  value={edu.additionalInfo}
                  onChange={(e) =>
                    handleEducationChange(
                      index,
                      "additionalInfo",
                      e.target.value
                    )
                  }
                  placeholder="Additional Details"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeEducationField(index)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addEducationField}
              className="add-button"
            >
              Add Another Education
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="form-section research-details">
            <h3>Research Work</h3>
            <textarea
              name="research"
              value={formData.research}
              onChange={handleChange}
              placeholder="Research Work"
              required
            />
          </div>
        )}

        <div className="form-navigation">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="nav-button"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={handleNext} className="nav-button">
              Next
            </button>
          ) : (
            <button type="submit" className="submit-button">
              Submit Application
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FacultyForm;
