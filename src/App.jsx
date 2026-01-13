import { useState, useEffect } from "react";
import "./App.css";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Certification from "./components/Certification";
import Interests from "./components/Interests";
import Contact from "./components/Contact";
import { playButtonSound } from "./utils/sound";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Update active section based on scroll position
      const sections = [
        "home",
        "about",
        "education",
        "experience",
        "projects",
        "achievements",
        "certification",
        "interests",
        "contact",
      ];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global button click handler for sound effect
  useEffect(() => {
    const handleButtonClick = (e) => {
      // Check if the clicked element is a button or interactive link
      const target = e.target;

      // Exclude modal buttons (OK button and close X button)
      const isModalButton =
        target.classList.contains("modal-button") ||
        target.classList.contains("modal-close") ||
        target.closest(".modal-button") !== null ||
        target.closest(".modal-close") !== null;

      if (isModalButton) {
        return; // Don't play sound for modal buttons
      }

      // Find the closest button or link element
      const buttonElement = target.closest("button");
      const linkElement = target.closest("a");

      // Exclude mailto links completely - let them work without interference
      const isMailtoLink = linkElement
        ?.getAttribute("href")
        ?.startsWith("mailto:");
      if (isMailtoLink) {
        return; // Don't interfere with mailto links
      }

      // Check for button elements (including hero buttons)
      const isButtonElement = buttonElement !== null && !buttonElement.disabled;

      // Check for interactive links (navigation, contact links, project buttons, etc.)
      const isInteractiveLink =
        linkElement !== null &&
        (linkElement.classList.contains("contact-link") ||
          linkElement.classList.contains("btn") ||
          linkElement.classList.contains("btn-small") ||
          linkElement.classList.contains("btn-primary") ||
          linkElement.classList.contains("btn-secondary") ||
          linkElement.classList.contains("btn-outline") ||
          linkElement.closest(".nav-menu") !== null ||
          linkElement.getAttribute("href")?.startsWith("#") ||
          linkElement.closest(".logo") !== null ||
          linkElement.closest(".project-footer") !== null ||
          linkElement.closest(".hero-buttons") !== null);

      if (isButtonElement || isInteractiveLink) {
        playButtonSound();
      }
    };

    // Add event listener to document for all clicks (capture phase)
    document.addEventListener("click", handleButtonClick, true);

    return () => {
      document.removeEventListener("click", handleButtonClick, true);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app">
      {/* Scanline overlay for retro effect */}
      <div className="scanlines"></div>

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div
            className="logo"
            onClick={() => {
              playButtonSound();
              scrollToSection("home");
            }}
          >
            <span className="logo-text">VICE</span>
            <span className="logo-subtitle">PORTFOLIO</span>
          </div>
          <ul className="nav-menu">
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  playButtonSound();
                  scrollToSection("home");
                }}
                className={activeSection === "home" ? "active" : ""}
              >
                HOME
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  playButtonSound();
                  scrollToSection("about");
                }}
                className={activeSection === "about" ? "active" : ""}
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                href="#education"
                onClick={(e) => {
                  e.preventDefault();
                  playButtonSound();
                  scrollToSection("education");
                }}
                className={activeSection === "education" ? "active" : ""}
              >
                EDUCATION
              </a>
            </li>
            <li>
              <a
                href="#experience"
                onClick={(e) => {
                  e.preventDefault();
                  playButtonSound();
                  scrollToSection("experience");
                }}
                className={activeSection === "experience" ? "active" : ""}
              >
                EXPERIENCE
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  playButtonSound();
                  scrollToSection("projects");
                }}
                className={activeSection === "projects" ? "active" : ""}
              >
                PROJECTS
              </a>
            </li>
            <li>
              <a
                href="#achievements"
                onClick={(e) => {
                  e.preventDefault();
                  playButtonSound();
                  scrollToSection("achievements");
                }}
                className={activeSection === "achievements" ? "active" : ""}
              >
                ACHIEVEMENTS
              </a>
            </li>
            <li>
              <a
                href="#certification"
                onClick={(e) => {
                  e.preventDefault();
                  playButtonSound();
                  scrollToSection("certification");
                }}
                className={activeSection === "certification" ? "active" : ""}
              >
                CERTIFICATION
              </a>
            </li>
            <li>
              <a
                href="#interests"
                onClick={(e) => {
                  e.preventDefault();
                  playButtonSound();
                  scrollToSection("interests");
                }}
                className={activeSection === "interests" ? "active" : ""}
              >
                INTERESTS
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  playButtonSound();
                  scrollToSection("contact");
                }}
                className={activeSection === "contact" ? "active" : ""}
              >
                CONTACT
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero scrollToSection={scrollToSection} />

      {/* About Section */}
      <About />

      {/* Education Section */}
      <Education />

      {/* Experience Section */}
      <Experience />

      {/* Projects Section */}
      <Projects />

      {/* Achievements Section */}
      <Achievements />

      {/* Certification Section */}
      <Certification />

      {/* Area of Interest Section */}
      <Interests />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            <span className="neon-pink">VICE</span> CITY PORTFOLIO © 2026
          </p>
          <p className="footer-subtext">Designed & Developed by AKASH SHARMA</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
