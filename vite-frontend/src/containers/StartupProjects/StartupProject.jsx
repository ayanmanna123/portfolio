import React, { useContext } from "react";
import { Fade } from "react-reveal";
import "./StartupProjects.css";
import { bigProjects } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function StartupProject() {
  const { isDark } = useContext(StyleContext);
  if (!bigProjects.display) {
    return null;
  }
  return (
    <div className="main" id="startupProjects">
      <Fade bottom duration={1000} distance="20px">
        <div className="project-heading">
          <h1
            className={
              isDark
                ? "dark-mode heading project-title"
                : "heading project-title"
            }
          >
            {bigProjects.title}
          </h1>
          <p
            className={
              isDark
                ? "dark-mode project-subtitle"
                : "project-subtitle"
            }
          >
            {bigProjects.subtitle}
          </p>
        </div>
        <div className="projects-container">
          {bigProjects.projects.map((project, i) => {
            return (
              <div key={i} className="project-card">
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.projectName}
                    className="project-img"
                  />
                </div>
                <div className="project-info">
                  <h3
                    className={
                      isDark
                        ? "dark-mode project-card-title"
                        : "project-card-title"
                    }
                  >
                    {project.projectName}
                  </h3>
                  <p
                    className={
                      isDark
                        ? "dark-mode project-card-desc"
                        : "project-card-desc"
                    }
                  >
                    {project.projectDesc}
                  </p>
                  <div className="project-card-footer">
                    {project.footerLink.map((link, i) => {
                      return (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-btn"
                        >
                          {link.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Fade>
    </div>
  );
}