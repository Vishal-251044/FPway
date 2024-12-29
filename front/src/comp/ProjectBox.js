import React from 'react';
import '../compCSS/ProjectBox.css';
import Swal from 'sweetalert2';

const ProjectBox = ({ project }) => {
  const userEmail = localStorage.getItem("userEmail");

  const handleApply = async () => {
    if (!userEmail) {
      Swal.fire({
        icon: 'error',
        title: 'Not Logged In',
        text: 'Please log in to apply for this project.',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          projectId: project._id,
          title: project.title,
          companyName: project.companyName,
          skills: project.skills,
          description: project.description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Application Submitted',
          text: 'You have successfully applied to this project! If you are selected, the company will email you.',
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Already Applied',
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <div className="project-box">
      <h3>{project.title}</h3>
      <p><strong>Company:</strong> {project.companyName}</p>
      <p><strong>Skills:</strong> {project.skills}</p>
      <p><strong>Description:</strong> {project.description}</p>
      <button className="apply-button" onClick={handleApply}>Apply</button>
    </div>
  );
};

export default ProjectBox;
