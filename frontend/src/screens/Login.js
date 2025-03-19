import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../comp/Navbar";
import Footer from "../comp/Footer";
import Swal from "sweetalert2";
import axios from "axios";
import "../screensCSS/Login.css";

const Login = () => {
  const [userType, setUserType] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle user type selection
  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setIsRegistering(false);
  };

  // Handle form switch (login/register)
  const handleFormSwitch = () => {
    setIsRegistering(!isRegistering);
  };

  // Handle file input change for freelancer resume upload
  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
  };

  // Handle company registration
  const handleCompanyRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { companyName, companyEmail, companyPassword } = event.target;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/company/register",
        {
          name: companyName.value,
          email: companyEmail.value,
          password: companyPassword.value,
        }
      );
      Swal.fire("Success!", response.data.message, "success");
      setIsRegistering(false);
    } catch (error) {
      console.error("Error during company registration:", error);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "An error occurred",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle freelancer registration
  const handleFreelancerRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", event.target.fullName.value);
    formData.append("education", event.target.education.value);
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);
    formData.append("resume", resume); // Send PDF file

    try {
      const response = await axios.post(
        "http://localhost:5000/api/freelancer/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire("Success!", "Freelancer registered successfully", "success");

      // Log the Cloudinary PDF URL
      console.log("Uploaded Resume URL:", response.data.resumeUrl);

      setIsRegistering(false);
    } catch (error) {
      console.error("Error during freelancer registration:", error);
      Swal.fire("Error!", error.response?.data?.message || "An error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle login for both company and freelancer
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { email, password } = event.target;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/${userType}/login`,
        {
          email: email.value,
          password: password.value,
        }
      );

      Swal.fire("Success!", response.data.message, "success");

      // Store email and token in local storage
      localStorage.setItem("userEmail", email.value);
      localStorage.setItem("token", response.data.token);

      // Redirect to the profile page after 3 seconds
      setTimeout(() => {
        navigate(`/profile`);
      }, 1500);
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "An error occurred",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        {!userType && (
          <div className="user-type-selection">
            <button
              className="btn-select"
              onClick={() => handleUserTypeSelect("company")}
            >
              Company
            </button>
            <button
              className="btn-select"
              onClick={() => handleUserTypeSelect("freelancer")}
            >
              Freelancer
            </button>
          </div>
        )}

        {userType && (
          <div className="login-register-container">
            {!isRegistering ? (
              <form className="login-form" onSubmit={handleLogin}>
                <h2 className="form-title">
                  {userType === "company"
                    ? "Company Login"
                    : "Freelancer Login"}
                </h2>
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <input
                  className="input-field"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <button className="btn-login" type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>

                <button
                  className="btn-switch"
                  type="button"
                  onClick={handleFormSwitch}
                >
                  {isRegistering
                    ? "Already registered? Login"
                    : "New? Register here"}
                </button>
              </form>
            ) : (
              <form
                className="registration-form"
                onSubmit={
                  userType === "company"
                    ? handleCompanyRegister
                    : handleFreelancerRegister
                }
              >
                <h2 className="form-title">
                  {userType === "company"
                    ? "Company Registration"
                    : "Freelancer Registration"}
                </h2>
                {userType === "company" ? (
                  <>
                    <input
                      className="input-field"
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      required
                    />
                    <input
                      className="input-field"
                      type="email"
                      name="companyEmail"
                      placeholder="Email"
                      required
                    />
                    <input
                      className="input-field"
                      type="password"
                      name="companyPassword"
                      placeholder="Password"
                      required
                    />
                  </>
                ) : (
                  <>
                    <input
                      className="input-field"
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      required
                    />
                    <select className="input-field" name="education" required>
                      <option value="">Select Education</option>
                      <option value="12th">12th</option>
                      <option value="graduation">Graduation</option>
                      <option value="under-graduation">Under Graduation</option>
                      <option value="post-graduation">Post Graduation</option>
                      <option value="other">Other</option>
                    </select>
                    <label htmlFor="pdfUpload" className="pdf-label">
                      Upload Resume (PDF):
                    </label>
                    <input
                      type="file"
                      id="pdfUpload"
                      className="pdf-input"
                      accept="application/pdf"
                      onChange={handleResumeChange}
                      required
                    />
                    <input
                      className="input-field"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                    />
                    <input
                      className="input-field"
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                    />
                  </>
                )}
                <button className="btn-register" type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
                <button
                  className="btn-switch"
                  type="button"
                  onClick={handleFormSwitch}
                >
                  {isRegistering
                    ? "Already registered? Login"
                    : "New? Register here"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
