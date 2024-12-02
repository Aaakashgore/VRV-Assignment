/* eslint-disable react/prop-types */
// import React, { useState } from "react";
import "./userProfile.css";
// import axios from "axios";
const ProfileCard = (props) => {

  const handleclick = async () => {
    localStorage.clear();
    props.setIsAuthenticated(false);
  }
  const empid = localStorage.getItem('employee_id');
  const role = localStorage.getItem('role');

  return (
    <div className="card3">
      <h2>Hello...</h2>
      <h3>Employee ID - {empid}</h3>
      <h3>Role - {role}</h3>
      <button onClick={handleclick}>Logout</button>
    </div>
  );
};

export default ProfileCard;