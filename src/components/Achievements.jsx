import "../App.css";
import { resumeData } from "../data/resumeData";
import { playButtonSound } from "../utils/sound";

function Achievements() {
  const { achievements } = resumeData;

  return (
    <section id="achievements" className="section achievements">
      <div className="container">
        <h2 className="section-title">
          <span className="neon-pink">KEY</span> ACHIEVEMENTS
        </h2>
        <div className="achievements-list">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-header">
                <div className="achievement-title-section">
                  <h3 className="achievement-card-title">{achievement.title}</h3>
                  <p className="achievement-year">{achievement.year}</p>
                </div>
                {achievement.certificateLink && (
                  <div className="achievement-status">
                    <a
                      href={achievement.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-small achievement-cert-btn"
                      onClick={playButtonSound}
                    >
                      VIEW CERTIFICATE
                    </a>
                  </div>
                )}
              </div>
              {achievement.image && (
                <div className="achievement-image-container">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="achievement-image"
                  />
                </div>
              )}
              <p className="achievement-card-description">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;

