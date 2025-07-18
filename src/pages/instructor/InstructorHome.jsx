import React, { useState, useEffect } from "react";
import Navbar from "../../components/Basic/Navbar";
import Footer from "../../components/Basic/Footer";
import Dashboard from "../../components/instructor/Dashboard";

const InstructorHome = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default InstructorHome;
