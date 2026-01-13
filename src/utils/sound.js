// Sound utility for button click effects

let audioContext = null;
let soundBuffer = null;
let isLoaded = false;

const SOUND_URL = "https://res.cloudinary.com/di3hezhw1/video/upload/v1768208528/gta-san-andreas-menu-sound-1_bxknf4.mp3";

// Preload the sound
export const preloadSound = () => {
  if (typeof Audio !== "undefined") {
    const audio = new Audio(SOUND_URL);
    audio.preload = "auto";
    audio.volume = 0.5; // Set volume to 50%
    return audio;
  }
  return null;
};

// Play sound function
export const playButtonSound = () => {
  try {
    const audio = new Audio(SOUND_URL);
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch((error) => {
      // Silently handle autoplay restrictions
      console.log("Sound play prevented:", error);
    });
  } catch (error) {
    console.log("Sound error:", error);
  }
};

// Create a single audio instance for better performance
let audioInstance = null;

export const getAudioInstance = () => {
  if (!audioInstance) {
    audioInstance = new Audio(SOUND_URL);
    audioInstance.volume = 0.5;
    audioInstance.preload = "auto";
  }
  return audioInstance;
};

// Play sound for contact form submission
const CONTACT_SOUND_URL = "https://res.cloudinary.com/di3hezhw1/video/upload/v1768219548/gta_san_andreas_y9p7vv.mp3";

// Store the current contact sound instance
let contactSoundInstance = null;

export const playContactSound = () => {
  try {
    // Stop any currently playing contact sound
    if (contactSoundInstance) {
      contactSoundInstance.pause();
      contactSoundInstance.currentTime = 0;
    }
    
    // Create and play new sound
    contactSoundInstance = new Audio(CONTACT_SOUND_URL);
    contactSoundInstance.volume = 0.5; // Set volume to 50%
    contactSoundInstance.play().catch((error) => {
      // Silently handle autoplay restrictions
      console.log("Contact sound play prevented:", error);
    });
    
    return contactSoundInstance;
  } catch (error) {
    console.log("Contact sound error:", error);
    return null;
  }
};

// Stop the contact sound
export const stopContactSound = () => {
  if (contactSoundInstance) {
    contactSoundInstance.pause();
    contactSoundInstance.currentTime = 0;
    contactSoundInstance = null;
  }
};

