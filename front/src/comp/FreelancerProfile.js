import React, { useEffect, useState } from "react";
import "../compCSS/FreelancerProfile.css";

const FreelancerProfile = ({ userData }) => {
  const [appliedProjects, setAppliedProjects] = useState([]);

  useEffect(() => {
    const fetchAppliedProjects = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/freelancer-applied?email=${userData.email}`);
        const data = await response.json();
        setAppliedProjects(data.appliedProjects);
      } catch (error) {
        console.error("Error fetching applied projects:", error);
      }
    };

    fetchAppliedProjects();
  }, [userData.email]);

  return (
    <div className="freelancer-profile-box">
      <h2 className="profile-title">Freelancer Profile</h2>
      <div className="profile-info">
        <p><strong>Name: </strong> {userData.fullName}</p>
        <p><strong>Education: </strong> <span className="education-text">{userData.education}</span></p>
      </div>
      
      {userData.resume && (
        <div className="resume-section">
          <p><strong>Resume:</strong></p>
          <a
            href={`http://localhost:5000/uploads/${userData.resume}`}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="btn-download"
          >
            Download Resume
          </a>
        </div>
      )}
      
      <div className="applied-projects-section">
        <h3 className="project-form-title">Applied Projects</h3>
        {appliedProjects.length > 0 ? (
          <ul className="applied-projects-list">
            {appliedProjects.map((project) => (
              <li key={project._id} className="project-item">
                <p><strong>Title:</strong> {project.title}</p>
                <p><strong>Company:</strong> {project.companyName}</p>
                <p><strong>Skills:</strong> {project.skills}</p>
                <p><strong>Description:</strong> {project.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No applied projects found.</p>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfile;
