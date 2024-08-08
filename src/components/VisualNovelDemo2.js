import React, { useState } from "react";

const VisualNovelDemo2 = ({ slides }) => {
  const [currentSlideId, setCurrentSlideId] = useState("start");
  const [userProfile, setUserProfile] = useState(null);
  const [showProfileCreation, setShowProfileCreation] = useState(false);

  // Find the current slide based on ID
  const currentSlide =
    slides.find((slide) => slide.id === currentSlideId) || slides[0];

  const createProfile = (name, gender) => {
    setUserProfile({ name, gender });
    setShowProfileCreation(false);
  };

  const goToSlide = (nextSlideId) => {
    if (nextSlideId) {
      setCurrentSlideId(nextSlideId);
    }
  };

  return (
    <div
      style={{
        width: "800px",
        height: "600px",
        border: "3px solid #000",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <button onClick={() => setShowProfileCreation(true)}>New</button>
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

      {/* Scene Image */}
      <div
        style={{
          flex: "3",
          backgroundImage: `url(${currentSlide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <button
          onClick={() => goToSlide(currentSlide.previous)}
          disabled={!currentSlide.previous}
        >
          Previous
        </button>
        <button onClick={() => goToSlide(currentSlide.next)}>Next</button>
      </div>

      {/* Profile Creation Popup */}
      {showProfileCreation && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <h2>Create Profile</h2>
          <input type="text" placeholder="Enter your name" id="nameInput" />
          <select id="genderSelect">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
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
          <button onClick={() => setShowProfileCreation(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default VisualNovelDemo2;
