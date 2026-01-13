import "../App.css";
import { resumeData } from "../data/resumeData";

function About() {
  const { about } = resumeData;

  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title">
          <span className="neon-yellow">ABOUT</span> ME
        </h2>
        <div className="about-content">
          <div className="about-text">
            {about.description.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
          <div className="about-stats">
            {about.stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className={`stat-number neon-${stat.color}`}>
                  {stat.number}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

