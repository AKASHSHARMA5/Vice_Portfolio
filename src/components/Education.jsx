import "../App.css";
import { resumeData } from "../data/resumeData";

function Education() {
  const { education } = resumeData;

  return (
    <section id="education" className="section education">
      <div className="container">
        <h2 className="section-title">
          <span className="neon-cyan">EDUCATION</span> & LEARNING
        </h2>
        <div className="education-list">
          {education.map((edu, index) => (
            <div key={index} className="education-card">
              <div className="education-header">
                <div className="education-title-section">
                  <h3 className="education-title">{edu.degree}</h3>
                  <p className="education-institution">{edu.institution}</p>
                  <p className="education-period">{edu.period}</p>
                </div>
                <div className="education-status">
                  <span className="status-badge passed">{edu.status}</span>
                </div>
              </div>
              <p className="education-description">{edu.description}</p>
              <div className="education-achievements">
                <h4 className="achievements-title">ACHIEVEMENTS UNLOCKED:</h4>
                <ul className="achievements-list">
                  {edu.achievements.map((achievement, i) => (
                    <li key={i} className="achievement-item">
                      <span className="achievement-icon">✓</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;

