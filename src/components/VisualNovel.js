import React, { useState } from "react";
import { getSlides } from "../utils/constants";
import AudioPlayer from "./AudioPlayer";
const VisualNovel = () => {
  const [currentSlideId, setCurrentSlideId] = useState("");
  const [choice, setChoice] = useState({
    prevSlideId: null,
    nextSlideId: null,
  });
  const [userProfile, setUserProfile] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [slides, setSlides] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const currentSlide = slides
    ? slides.find((slide) => slide.id === currentSlideId)
    : {
        text: "Please create a profile to start the story.",
        choices: [],
      };

  const createProfile = (name, gender) => {
    name = name.trim();

    if (!name || !gender) {
      setErrorMessage("*Name must be more than one character.");
      return;
    }

    setUserProfile({ name, gender });
    setShowProfilePopup(false);
    setShowConfirmPopup(true);

    const newSlides = getSlides(name, gender);
    setSlides(newSlides);
    setCurrentSlideId("start");
    setErrorMessage("");
  };

  const goToSlide = (nextSlideId) => {
    if (nextSlideId) {
      setCurrentSlideId(nextSlideId);
    }
  };

  return (
    <div className="visual-novel-container">
      {/* Top Buttons */}
      <div className="visual-novel-top-ui">
        <button
          className="square-button"
          onClick={() => setShowProfilePopup(true)}
        >
          New
        </button>
        <AudioPlayer
          audioPath={"/projects/java-application/Scene of a Street Corner.wav"}
          audioType={"audio/wav"}
        />
        <button
          className="square-button"
          onClick={() => setShowProfile(!showProfile)}
        >
          Profile
        </button>
      </div>
      {userProfile && showProfile && (
        <span className="visual-novel-profile">
          <span className="visual-novel-profile-item">
            Name: {userProfile.name}
          </span>
          <span className="visual-novel-profile-item">
            Gender: {userProfile.gender}
          </span>
        </span>
      )}

      {/* Scene Image */}
      {currentSlideId && (
        <img
          className="visual-novel-background"
          src={`/projects/java-application/${currentSlideId}.jpg`}
          alt="Scene Background"
        />
      )}

      {/* Content and Choices */}
      <div className="visual-novel-choices">
        <p
          dangerouslySetInnerHTML={{
            __html: userProfile
              ? currentSlide.text.replace(
                  userProfile.name,
                  `<strong>${userProfile.name}</strong>`
                )
              : currentSlide.text,
          }}
        ></p>

        {currentSlide.choices.length > 0 && (
          <select
            value={choice.nextSlideId || ""}
            onChange={(e) =>
              setChoice({
                prevSlideId: currentSlide.id,
                nextSlideId: e.target.value,
              })
            }
          >
            <option value="">Choose your path...</option>
            {currentSlide.choices.map((choice, index) => (
              <option key={index} value={choice.nextSlideId}>
                {choice.text}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="visual-novel-bot-ui">
        <button
          className="left-arrow-button"
          onClick={() => goToSlide(choice.prevSlideId)}
          disabled={!choice.prevSlideId}
        >
          Previous
        </button>
        <button
          className="right-arrow-button"
          onClick={() => goToSlide(choice.nextSlideId)}
          disabled={!choice}
        >
          Next
        </button>
      </div>

      {/* Profile Popup */}
      {showProfilePopup && (
        <form
          className="popup"
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2>Create Profile</h2>
          {/* Error Message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <label htmlFor="nameInput">Name</label>
          <input type="text" placeholder="Enter your name" id="nameInput" />
          <label htmlFor="genderSelect">Gender</label>
          <select id="genderSelect">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <button
            type="button"
            onClick={() => {
              const name = document.getElementById("nameInput").value;
              const gender = document.getElementById("genderSelect").value;
              createProfile(name, gender);
            }}
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => {
              setErrorMessage("");
              setShowProfilePopup(false);
            }}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Confirm Popup */}
      {showConfirmPopup && (
        <div className="popup">
          <h2>Profile Created</h2>
          <p>
            Name: {userProfile.name}, Gender: {userProfile.gender}
          </p>

          <button onClick={() => setShowConfirmPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default VisualNovel;
