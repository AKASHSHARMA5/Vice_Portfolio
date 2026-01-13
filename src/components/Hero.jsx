import { useRef, useEffect } from "react";
import "../App.css";

function Hero({ scrollToSection }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-video-container">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source
            src="https://res.cloudinary.com/di3hezhw1/video/upload/v1768208176/rockstar-games-grand-theft-auto_-vice-city-anniversary-trailer-720p_online-video-cutter.com_gq9l8f.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="neon-pink">WELCOME</span>
            <span className="neon-cyan"> TO</span>
          </h1>
          <h2 className="hero-subtitle">CODE CITY</h2>
          <p className="hero-description">
            A developer's journey through the neon-lit streets of code
          </p>
          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => scrollToSection("experience")}
            >
              VIEW WORK
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => scrollToSection("contact")}
            >
              GET IN TOUCH
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
