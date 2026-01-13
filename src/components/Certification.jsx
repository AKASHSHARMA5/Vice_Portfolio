import "../App.css";
import { resumeData } from "../data/resumeData";
import { playButtonSound } from "../utils/sound";

function Certification() {
  const { certifications } = resumeData;

  return (
    <section id="certification" className="section certification">
      <div className="container">
        <h2 className="section-title">
          <span className="neon-cyan">CERTIFICATIONS</span> & BADGES
        </h2>
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div key={index} className={`cert-card neon-${cert.color}`}>
              <div className="cert-header">
                <h3 className="cert-name">{cert.name}</h3>
                <span className="cert-badge">VERIFIED</span>
              </div>
              <div className="cert-details">
                <p className="cert-issuer">
                  <span className="cert-label">Issuer:</span> {cert.issuer}
                </p>
                <p className="cert-date">
                  <span className="cert-label">Date:</span> {cert.date}
                </p>
                {cert.credential && (
                  <p className="cert-credential">
                    <span className="cert-label">Credential ID:</span>{" "}
                    {cert.credential}
                  </p>
                )}
              </div>
              <div className="cert-footer">
                {cert.pdfLink ? (
                  <a
                    href={cert.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-small cert-pdf-btn neon-${cert.color}`}
                    onClick={playButtonSound}
                  >
                    VIEW CERTIFICATE
                  </a>
                ) : (
                  <button
                    className={`btn-small cert-pdf-btn neon-${cert.color} disabled`}
                    disabled
                  >
                    CERTIFICATE UNAVAILABLE
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certification;
