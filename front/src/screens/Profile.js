import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../comp/Navbar";
import Footer from "../comp/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import "../screensCSS/Profile.css";
import FreelancerProfile from "../comp/FreelancerProfile";
import CompanyProfile from "../comp/CompanyProfile";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profile/${userEmail}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        Swal.fire(
          "Error!",
          error.response?.data?.message ||
            "An error occurred while fetching profile data.",
          "error"
        );
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        {userData ? (
          <div className="profile-details">
            {userData.userType === "freelancer" ? (
              <FreelancerProfile userData={userData} />
            ) : (
              <CompanyProfile userData={userData} />
            )}
          </div>
        ) : (
          <div className="spinner"></div> 
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
