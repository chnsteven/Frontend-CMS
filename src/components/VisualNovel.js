import React, { useState } from "react";

const slides = [
  {
    id: "start",
    image: "placeholder_image_path_1.jpg",
    text: "You find yourself in a mysterious forest, the trees seem to whisper secrets as you pass by. What do you do?",
    choices: [
      { text: "Enter the forest", nextSlideId: "forestEntry" },
      { text: "Follow the river", nextSlideId: "riverFollow" },
    ],
  },
  {
    id: "forestEntry",
    image: "placeholder_image_path_2.jpg",
    text: "The forest is filled with the sound of crickets and the distant howl of a wolf. You come across a fork in the path.",
    choices: [
      { text: "Take the left path", nextSlideId: "mysteriousGlade" },
      { text: "Take the right path", nextSlideId: "ancientTree" },
    ],
    previous: "start",
  },
];
const VisualNovel = () => {
  const [currentSlideId, setCurrentSlideId] = useState("start");
  const [userProfile, setUserProfile] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  // Find the current slide based on ID
  const currentSlide =
    slides.find((slide) => slide.id === currentSlideId) || slides[0];

  const createProfile = (name, gender) => {
    setUserProfile({ name, gender });
    setShowProfilePopup(false);
    setShowConfirmPopup(true);
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
        <button onClick={() => setShowProfilePopup(true)}>New</button>
        <button>Play Background Music</button>
        <button>Pause Background Music</button>
        <button
          onClick={() =>
            alert(
              userProfile
                ? `Name: ${userProfile.name}, Gender: ${userProfile.gender}`
                : "No profile created"
            )
          }
        >
          Profile
        </button>
      </div>
      {userProfile && (
        <span className="visual-novel-profile">
          <span>Name: {userProfile.name}</span>
          <span>Gender: {userProfile.gender}</span>
        </span>
      )}

      {/* Scene Image */}
      <div className="visual-novel-background"></div>

      {/* Content and Choices */}
      <div style={{ flex: "2", padding: "15px", backgroundColor: "#f0f0f0" }}>
        <p>{currentSlide.text}</p>
        {currentSlide.choices && (
          <select onChange={(e) => goToSlide(e.target.value)}>
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
          onClick={() => goToSlide(currentSlide.previous)}
          disabled={!currentSlide.previous}
        >
          Previous
        </button>
        <button onClick={() => goToSlide(currentSlide.next)}>Next</button>
      </div>

      {/* Profile Popup */}
      {showProfilePopup && (
        <form className="popup" autoComplete="off">
          <h2>Create Profile</h2>
          <label for="nameInput">Name</label>
          <input type="text" placeholder="Enter your name" id="nameInput" />
          <label for="genderSelect">Gender</label>
          <select id="genderSelect">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button
            onClick={() => {
              const name = document.getElementById("nameInput").value;
              const gender = document.getElementById("genderSelect").value;
              createProfile(name, gender);
            }}
          >
            Create
          </button>
          <button onClick={() => setShowProfilePopup(false)}>Cancel</button>
        </form>
      )}

      {/* Confirm Popup */}
      {showConfirmPopup && (
        <div className="popup">
          {userProfile.name !== "" ? (
            <>
              <h2>Profile Created</h2>
              <p>
                Name: {userProfile.name}, Gender: {userProfile.gender}
              </p>
            </>
          ) : (
            <>
              <h2>Username Invalid</h2>
              <p>Username must contain at least 1 character</p>
              <button
                onClick={() => {
                  setShowConfirmPopup(false);
                  setShowProfilePopup(true);
                }}
              >
                Try Again
              </button>
            </>
          )}

          <button onClick={() => setShowConfirmPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default VisualNovel;
