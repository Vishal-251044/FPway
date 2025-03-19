import React, { useState, useEffect } from 'react';
import Navbar from '../comp/Navbar';
import Footer from '../comp/Footer';
import ProjectBox from '../comp/ProjectBox';
import '../screensCSS/Explore.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SweetAlert from 'sweetalert2';
import { Circles } from 'react-loader-spinner';

const Explore = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [appliedProjectIds, setAppliedProjectIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const userEmail = localStorage.getItem('userEmail'); 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        SweetAlert.fire({ icon: 'error', title: 'Oops...', text: error.message });
      } finally {
        setLoading(false);
      }
    };

    const fetchAppliedProjects = async () => {
      if (!userEmail) return; // Skip if user is not logged in

      try {
        const response = await fetch(`http://localhost:5000/api/applied-projects?email=${userEmail}`);
        if (!response.ok) throw new Error("Failed to fetch applied projects");
        
        const appliedData = await response.json();
        setAppliedProjectIds(new Set(appliedData.map(proj => proj.projectId)));
      } catch (error) {
        console.error("Error fetching applied projects:", error);
      }
    };

    fetchProjects();
    if (userEmail) fetchAppliedProjects();
  }, [userEmail]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    setFilteredProjects(
      query ? projects.filter(project => project.skills.toLowerCase().includes(query)) : projects
    );
  };

  return (
    <div>
      <Navbar />
      
      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="Search Skills"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          <i className="fa fa-search"></i>
        </button>
      </div>

      {loading ? (
        <div className="loader-container">
          <Circles color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <div className="projects-container">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectBox 
                key={index} 
                project={project} 
                applied={userEmail && appliedProjectIds.has(project._id)}
              />
            ))
          ) : (
            <p className="no-projects-message"><b>No projects available.</b></p>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Explore;
