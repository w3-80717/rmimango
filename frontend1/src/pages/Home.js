import React from "react";
import "./Home.css"; // Import CSS for styles

// Sample project data
const projects = [
  {
    id: 1,
    title: "Project One",
    description: "This is a brief description of project one.",
    imageUrl: "",
  },
  {
    id: 2,
    title: "Project Two",
    description: "This is a brief description of project two.",
    imageUrl: "./public/images/mangob.jpeg",
  },
  {
    id: 3,
    title: "Project Three",
    description: "This is a brief description of project three.",
    imageUrl: "https://via.placeholder.com/300x200",
  },
];

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <img
          src="https://via.placeholder.com/1200x400"
          alt="Hero"
          className="hero-image"
        />
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <h2>Our Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="project-image"
              />
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
