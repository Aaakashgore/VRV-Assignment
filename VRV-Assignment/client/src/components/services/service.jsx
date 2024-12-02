// import React from "react";
import "./service.css";
import axios from "axios";

const ServicesCard = () => {
  const token = localStorage.getItem("token");

  // Generalized handler for service button clicks
  const handleServiceClick = (serviceEndpoint) => {
    console.log(`Requesting service: ${serviceEndpoint}`);
    if (!token) {
      alert("Token not found. Please log in.");
      return;
    }

    axios
      .get(`https://vrv-assignment-a6zw.onrender.com/service/${serviceEndpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error(`Error accessing ${serviceEndpoint}:`, error.response?.data || error.message);
        alert(`Error: ${error.response?.data?.message || "Failed to access the service."}`);
      });
  };

  return (
    <div className="Mainc">
    <h2>🔐 VRV Security Service</h2> 
    Services you can access:
    <div className="card2"> 
      <div className="Container">
      <button onClick={() => handleServiceClick("cctv")} className="Btn1">CCTV Surveillance</button>
      <button onClick={() => handleServiceClick("gdeployed")} className="Btn2">Guards Deployment</button>
      <button onClick={() => handleServiceClick("attendence")} className="Btn3">Attendance Records</button>
      <button onClick={() => handleServiceClick("activeunits")} className="Btn4">Active Units</button>
      </div>
      </div>
    </div>
  );
};

export default ServicesCard;
