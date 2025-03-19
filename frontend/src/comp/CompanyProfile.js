import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Form, Input, Button, Card, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
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
  const [submitting, setSubmitting] = useState(false);
  const [applicantCounts, setApplicantCounts] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = async () => {
    setSubmitting(true); // Set submitting state

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
    } finally {
      setSubmitting(false);
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

  const deleteProject = async (projectId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/projects/delete/${projectId}`,
            {
              method: "DELETE",
            }
          );
          const result = await response.json();
          if (result.success) {
            Swal.fire("Deleted!", "Project deleted successfully.", "success");
            fetchProjects();
          } else {
            Swal.fire("Error", result.message, "error");
          }
        } catch (error) {
          Swal.fire("Error", "Could not delete project", "error");
        }
      }
    });
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

  const fetchApplicantCounts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/applicant-counts");
      const result = await response.json();
      if (result.success) {
        setApplicantCounts(result.counts);
      }
    } catch (error) {
      console.error("Error fetching applicant counts:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchApplicantCounts();
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
          <Button type="primary" htmlType="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>

        </Form>
      </Card>

      <div className="projects-list">
        <h3>Your Projects</h3>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Card
              key={project._id}
              className="project-item"
              title={project.title}
              extra={
                <DeleteOutlined
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => deleteProject(project._id)}
                />
              }
            >
              <p>
                <strong>Skills:</strong> {project.skills}
              </p>
              <p>
                <strong>Description:</strong> {project.description}
              </p>
              <Button type="link" onClick={() => viewApplicants(project._id)}>
                View Applicants ({applicantCounts[project._id] || 0})
              </Button>
            </Card>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "gray" }}>No projects available</p>
        )}
      </div>

      {/* Modal for showing applicants */}
      <Modal
        title={projects.find((p) => p._id === selectedProjectId)?.title
          }
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
                  <p><strong>Resume:</strong></p>
                  <a
                    href={applicant.resume} // Cloudinary URL
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