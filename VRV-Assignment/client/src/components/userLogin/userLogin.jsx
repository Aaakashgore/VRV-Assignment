/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./userLogin.css";
import axios from "axios";

const FlipCard = (props) => {
  const toggleForm = () => setIsRegister(!isRegister);

  const [isRegister, setIsRegister] = useState(false);

  const [registerData, setRegisterData] = useState({
    employee_id: "",
    role: "",
    phone: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    employee_id: "",
    password: "",
  });
  const [loading, setLoading] =useState(false)

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handelSignin = async (e) => {
    setLoading(true);
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value })
    e.preventDefault();
    try {
      const response = await axios.post("https://vrv-assignment-a6zw.onrender.com/signin", loginData)
        .then((response) => {
          const { token, role, employee_id } = response.data;

          localStorage.setItem('token', token);
          props.setIsAuthenticated(token);
          localStorage.setItem('role', role);
          localStorage.setItem('employee_id', employee_id);

          console.log('Login successful, token stored in localStorage');
        });
      // alert(response.data.message);
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally{
      setLoading(false)
    }
  }

  const handelSignup = async (e) => {
    setLoading(true);
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
    e.preventDefault();
    try {
      const response = await axios.post("https://vrv-assignment-a6zw.onrender.com/signup", registerData)
        .then((response) => {
          const { token, role, employee_id } = response.data;

          localStorage.setItem('token', token);
          props.setIsAuthenticated(token);
          localStorage.setItem('role', role);
          localStorage.setItem('employee_id', employee_id);

          console.log('Login successful, token stored in localStorage');
        });
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="card">
      {isRegister ? (
        <div className="form-container">
          <h2>Register</h2>
          <form onSubmit={handelSignup}>
            <input onChange={handleRegisterChange} name="employee_id" type="text" placeholder="Employee ID" />
            <select onChange={handleRegisterChange} name="role">
              <option value="" disabled selected>Role</option>
              <option value="Gaurd">Gaurd</option>
              <option value="Manager">Manager</option>
              <option value="Authority">Authority</option>
            </select>

            <input onChange={handleRegisterChange} name="phone" type="text" placeholder="Phone" />
            <input onChange={handleRegisterChange} name="password" type="password" placeholder="Password" />
            <button type="submit">
              {
                loading ? "Loading..." : "Register"
              }
              </button>
            <p>
              Have an account? <span onClick={toggleForm}>Login</span>
            </p>
          </form>
        </div>
      ) : (
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handelSignin}>
            <input onChange={handleLoginChange} name="employee_id" type="text" placeholder="Employee ID" />
            <input onChange={handleLoginChange} name="password" type="password" placeholder="Password" />
            <button type="submit">
              {
                loading ? "Loading..." : "Login"
              }
              </button>
            <p>
              No account? <span onClick={toggleForm}>Register</span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default FlipCard;