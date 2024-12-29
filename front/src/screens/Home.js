import React, { useState } from "react";
import Navbar from "../comp/Navbar";
import Footer from "../comp/Footer";
import "../screensCSS/Home.css";
import home1Image from "../img/1.webp";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleClick = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/submitContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: result.message,
        });
        setFormData({ name: "", email: "", message: "" }); 
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.error || "Something went wrong!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to submit the form!",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="home1">
        <div className="home1text">
          <h1>How work should work</h1>
          <p>
            Forget the old rules. You can have the best people. Right now. Right
            here.
          </p>
          <button onClick={handleClick}>Get Started</button>{" "}
        </div>
        <div className="home1img">
          <img src={home1Image} alt="Home1img" />
        </div>
      </div>

      <div className="platform-features">
        <h2>Freelancing Platform Features</h2>
        <div className="feature">
          <h3>Freelance Job Marketplace</h3>
          <p>
            A platform where freelancers can browse and apply for short-term,
            gig, and project-based jobs. Employers can post jobs, set
            requirements, and invite freelancers to apply.
          </p>
        </div>

        <div className="feature">
          <h3>Freelancer Profile & Portfolio Management</h3>
          <p>
            Allows freelancers to create detailed profiles showcasing their
            skills, past experiences, and work portfolios. A rating and review
            system provides feedback on completed projects.
          </p>
        </div>

        <div className="feature">
          <h3>Extensive Search & Analytics</h3>
          <p>
            AI-driven search functionality for both freelancers and employers to
            find suitable matches. AI-enabled insights and recommendations to
            improve job matches and performance tracking.
          </p>
        </div>

        <div className="feature">
          <h3>Escrow Account & Secure Payments</h3>
          <p>
            An escrow system holds payments until the job is delivered, and
            secure payment gateways ensure smooth transactions.
          </p>
        </div>

        <div className="how-to-use">
          <h2>How to Use</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <button className="step-button">Login</button>
                <p>Access your account or create a new profile.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <button className="step-button">Make Profile Strong</button>
                <p>
                  Complete your profile with relevant information and showcase
                  your skills.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <button className="step-button">Apply for Project</button>
                <p>
                  Browse available projects and apply to the ones that match
                  your skills and interests.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <button className="step-button">Complete Project</button>
                <p>
                  Work on the project as per the requirements and deliver
                  quality results.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">5</div>
              <div className="step-content">
                <button className="step-button">Make Payment</button>
                <p>
                  Secure payment through the platform after project completion.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-us">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
