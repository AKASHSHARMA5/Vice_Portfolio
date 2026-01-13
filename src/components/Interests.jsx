import "../App.css";
import { resumeData } from "../data/resumeData";

function Interests() {
  const { interests } = resumeData;

  return (
    <section id="interests" className="section interests">
      <div className="container">
        <h2 className="section-title">
          <span className="neon-pink">TECHNICAL</span> SKILLS AND INTEREST
        </h2>
        <div className="interests-grid">
          {interests.map((interest, index) => (
            <div key={index} className={`interest-card neon-${interest.color}`}>
              <h3 className="interest-title">{interest.title}</h3>
              <p className="interest-description">{interest.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Interests;
