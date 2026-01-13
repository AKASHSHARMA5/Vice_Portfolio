import { useState } from "react";
import "../App.css";
import { resumeData } from "../data/resumeData";
import { playContactSound, stopContactSound } from "../utils/sound";

function Contact() {
  const { personal } = resumeData;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success"); // 'success' or 'error'
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setModalType("error");
      setModalMessage("Please enter your name.");
      setShowModal(true);
      return false;
    }
    if (!formData.email.trim()) {
      setModalType("error");
      setModalMessage("Please enter your email.");
      setShowModal(true);
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setModalType("error");
      setModalMessage("Please enter a valid email address.");
      setShowModal(true);
      return false;
    }
    if (!formData.message.trim()) {
      setModalType("error");
      setModalMessage("Please enter your message.");
      setShowModal(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Play contact form submission sound
    playContactSound();

    try {
      // API endpoint - uses proxy in development, env variable in production
      const API_URL = import.meta.env.VITE_API_URL || "/api/contact";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setModalType("success");
        setModalMessage(
          data.message ||
            "MISSION PASSED! Your message has been received successfully."
        );
        setShowModal(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setModalType("error");
      setModalMessage(
        error.message ||
          "MISSION FAILED! Unable to send message. Please try again or contact directly at akash12072003@gmail.com"
      );
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    // Stop the contact sound when modal is closed
    stopContactSound();
    setShowModal(false);
  };

  return (
    <>
      <section id="contact" className="section contact">
        <div className="container">
          <h2 className="section-title">
            <span className="neon-yellow">GET IN</span> TOUCH
          </h2>
          <div className="contact-content">
            <div className="contact-info">
              <p className="contact-text">
                Ready to start a project? Let's connect and create something
                amazing together in the neon-lit world of Vice City.
              </p>
              <div className="contact-links">
                <a
                  href={`mailto:${personal.email || "akash12072003@gmail.com"}`}
                  className="contact-link neon-pink"
                  onClick={(e) => {
                    // Just stop propagation to prevent global handler interference
                    // Let the natural href mailto behavior work
                    e.stopPropagation();
                  }}
                >
                  ✉ EMAIL
                </a>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link neon-cyan"
                >
                  💻 GITHUB
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link neon-yellow"
                >
                  🔗 LINKEDIN
                </a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="YOUR NAME"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <input
                type="email"
                name="email"
                placeholder="YOUR EMAIL"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <textarea
                name="message"
                placeholder="YOUR MESSAGE"
                className="form-textarea"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
              ></textarea>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className={`modal-content modal-${modalType}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>
            <div className="modal-icon">
              {modalType === "success" ? "✓" : "✕"}
            </div>
            <h3 className="modal-title">
              {modalType === "success" ? "MISSION PASSED" : "MISSION FAILED"}
            </h3>
            <p className="modal-message">{modalMessage}</p>
            <button
              className="btn btn-primary modal-button"
              onClick={closeModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Contact;
