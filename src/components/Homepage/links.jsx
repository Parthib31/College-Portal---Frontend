import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

const NavigationLinks = () => {
  const navContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px"
  };

  const linkStyle = {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    borderRadius: "5px",
    textDecoration: "none",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s"
  };

  return (
    <div style={navContainerStyle}>
      <Link to="/faculty" style={linkStyle}>Faculty</Link>
      <Link to="/alumni" style={linkStyle}>Alumni</Link>
    </div>
  );
};

export default NavigationLinks;
