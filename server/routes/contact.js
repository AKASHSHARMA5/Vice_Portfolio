import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contact - Create a new contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, email, and message",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Create new contact message
    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "MISSION PASSED! Your message has been received successfully.",
      data: {
        id: newContact._id,
        name: newContact.name,
        email: newContact.email,
        createdAt: newContact.createdAt,
      },
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({
      success: false,
      message:
        "MISSION FAILED! Unable to send message. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// GET /api/contact - Get all contact messages (optional, for admin use)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

export default router;
