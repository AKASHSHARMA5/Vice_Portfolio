import "../App.css";
import { resumeData } from "../data/resumeData";

function Experience() {
  const { experience } = resumeData;

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <h2 className="section-title">
          <span className="neon-pink">PROFESSIONAL</span> EXPERIENCE
        </h2>
        <div className="missions-list">
          {experience.map((mission, index) => (
            <div key={index} className="mission-card">
              <div className="mission-header">
                <div className="mission-title-section">
                  <h3 className="mission-title">{mission.title}</h3>
                  <p className="mission-company">{mission.company}</p>
                  <p className="mission-period">{mission.period}</p>
                </div>
                <div className="mission-status">
                  <span className="status-badge passed">MISSION PASSED</span>
                </div>
              </div>
              <p className="mission-description">{mission.description}</p>
              <div className="mission-achievements">
                <h4 className="achievements-title">ACHIEVEMENTS UNLOCKED:</h4>
                <ul className="achievements-list">
                  {mission.achievements.map((achievement, i) => (
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

export default Experience;

