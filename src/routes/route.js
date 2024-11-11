import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../components/Homepage/Homepage";
import FacultyList from "../components/FacultyPage/facultyList";
import FacultyForm from "../components/FacultyPage/facultyForm";
import AdminLogin from "../components/adminPage/adminLogin";
import AdminDashboard from "../components/adminPage/adminDashboard";
import { useState } from "react";
import FacultyInfo from "../components/FacultyPage/facultyInfo";
import AlumniInfo from "../components/AlumniPage/alumniInfo";
import AlumniForm from "../components/AlumniPage/alumniForm";
import AlumniList from "../components/AlumniPage/alumniList";

export default function Myroutes() {
    const [token, setToken] = useState(null);

    const handleLogin = (receivedToken) => {
        setToken(receivedToken);
    };

    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/faculty" element={<FacultyList />} />
            <Route path="/faculty/:id" element={<FacultyInfo />} />
            <Route path="/faculty/apply" element={<FacultyForm />} />
            <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
            <Route path="/admin/applications" element={<AdminDashboard token={token}/>} />
            <Route path="/alumni" element={<AlumniList/>} />
            <Route path="/alumni/apply" element={<AlumniForm />} />
            <Route path="/alumni/:id" element={<AlumniInfo />} />
        </Routes>
    );
}