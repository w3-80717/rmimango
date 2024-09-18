import React, { useEffect, useState } from 'react';
import Card from '../components/Card'; // Import the Card component
import './Home.css'; // Import CSS for styles
import * as productService from '../service/productService'; // Import service for API calls

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await productService.getAllProducts(); // Fetch projects from backend
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <img
          src="/images/rmimango.jpg"
          alt="Hero"
          className="hero-image"
        />
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <h2>Our Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <Card
              key={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
