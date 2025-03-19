import React, { useEffect, useState } from "react";
import { Modal, Upload, Button } from "antd";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import "../compCSS/FreelancerProfile.css";

const FreelancerProfile = ({ userData }) => {
  const [appliedProjects, setAppliedProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  // Handle file selection
  const handleFileChange = (info) => {
    if (info.file.type !== "application/pdf") {
      Swal.fire("Error", "Only PDF files are allowed!", "error");
      return;
    }
    setSelectedFile(info.file);
  };

  // Upload new resume to Cloudinary
  const handleUpload = async () => {
    if (!selectedFile) {
      Swal.fire("Error", "Please select a PDF file!", "error");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("resume", selectedFile);
    formData.append("email", userData.email);

    try {
      const response = await fetch("http://localhost:5000/api/edit-resume", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        Swal.fire("Success", "Resume updated successfully!", "success");
        window.location.reload(); 
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to upload resume", "error");
    } finally {
      setUploading(false);
      setIsModalOpen(false);
    }
  };

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
          <div className="resume-actions">
            <a
              href={userData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-download"
            >
              Download Resume
            </a>
            <EditOutlined className="edit-icon" onClick={() => setIsModalOpen(true)} />
          </div>
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

      {/* Modal for Uploading New Resume */}
      <Modal
        title="Update Resume"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="upload" type="primary" onClick={handleUpload} loading={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>,
        ]}
      >
        <Upload beforeUpload={() => false} onChange={handleFileChange} maxCount={1} accept="application/pdf">
          <Button icon={<UploadOutlined />}>Select PDF</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default FreelancerProfile;
