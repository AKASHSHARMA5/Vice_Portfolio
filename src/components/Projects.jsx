import "../App.css";
import { resumeData } from "../data/resumeData";

function Projects() {
  const { projects } = resumeData;

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <h2 className="section-title">
          <span className="neon-pink">FEATURED</span> PROJECTS
        </h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className={`project-card neon-${project.color}`}>
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-footer">
                <a
                  href={project.link || "#"}
                  target={
                    project.link && project.link !== "#" ? "_blank" : "_self"
                  }
                  rel="noopener noreferrer"
                  className="btn-small"
                  onClick={(e) => {
                    if (!project.link || project.link === "#") {
                      e.preventDefault();
                    }
                  }}
                >
                  VIEW PROJECT
                </a>
                <a
                  href={project.codeLink || "#"}
                  target={
                    project.codeLink && project.codeLink !== "#"
                      ? "_blank"
                      : "_self"
                  }
                  rel="noopener noreferrer"
                  className="btn-small btn-outline"
                  onClick={(e) => {
                    if (!project.codeLink || project.codeLink === "#") {
                      e.preventDefault();
                    }
                  }}
                >
                  CODE
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
