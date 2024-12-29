import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Form, Input, Button, Card, Modal } from "antd";
import "../compCSS/CompanyProfile.css";

const CompanyProfile = ({ userData }) => {
  const [projectData, setProjectData] = useState({
    title: "",
    companyName: userData.name || "",
    skills: "",
    description: "",
  });
  const [projects, setProjects] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = async () => {
    const userEmail = localStorage.getItem("userEmail");

    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...projectData, email: userEmail }),
      });
      const result = await response.json();

      if (result.success) {
        Swal.fire("Success", "Project created successfully", "success");
        setProjectData({
          title: "",
          companyName: userData.name || "",
          skills: "",
          description: "",
        });
        fetchProjects();
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const fetchProjects = async () => {
    const userEmail = localStorage.getItem("userEmail");
    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/${userEmail}`
      );
      const result = await response.json();
      if (result.success) {
        setProjects(result.projects);
      }
    } catch (error) {
      Swal.fire("Error", "Could not load projects", "error");
    }
  };

  const viewApplicants = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/applicants/${projectId}`
      );
      const result = await response.json();
      if (result.success) {
        setApplicants(result.applicants);
        setSelectedProjectId(projectId);
        setIsModalVisible(true);
      }
    } catch (error) {
      Swal.fire("Error", "Could not load applicants", "error");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="company-profile">
      <h2>Company Profile</h2>
      <p>
        <strong>Company Name:</strong> {userData.name}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>

      <Card title="Create New Project" className="project-form">
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Project Title" required>
            <Input
              name="title"
              value={projectData.title}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Company Name">
            <Input
              name="companyName"
              value={projectData.companyName}
              readOnly
            />
          </Form.Item>
          <Form.Item label="Skills" required>
            <Input
              name="skills"
              value={projectData.skills}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Description" required>
            <Input.TextArea
              name="description"
              value={projectData.description}
              onChange={handleChange}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Card>

      <div className="projects-list">
        <h3>Your Projects</h3>
        {projects.map((project) => (
          <Card
            key={project._id}
            className="project-item"
            title={project.title}
          >
            <p>
              <strong>Skills:</strong> {project.skills}
            </p>
            <p>
              <strong>Description:</strong> {project.description}
            </p>
            <Button type="link" onClick={() => viewApplicants(project._id)}>
              View Applicants
            </Button>
          </Card>
        ))}
      </div>

      {/* Modal for showing applicants */}
      <Modal
        title={`Applicants for ${
          projects.find((p) => p._id === selectedProjectId)?.title
        }`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {applicants.length > 0 ? (
          applicants.map((applicant) => (
            <div key={applicant.email} className="applicant-item">
              <p>
                <strong>Name:</strong> {applicant.fullName}
              </p>
              <p>
                <strong>Education:</strong> {applicant.education}
              </p>
              {applicant.resume && (
                <div>
                  <p>
                    <strong>Resume:</strong>
                  </p>
                  <a
                    href={`http://localhost:5000/uploads/${applicant.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    Download Resume
                  </a>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No one has applied for this project.</p>
        )}
      </Modal>
    </div>
  );
};

export default CompanyProfile;
