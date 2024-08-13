import React, { useState } from "react";

const Demo = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [showProfileCreation, setShowProfileCreation] = useState(false);
  const [showChoice, setShowChoice] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const createProfile = (name, gender) => {
    setUserProfile({ name, gender });
    setShowProfileCreation(false);
  };

  const goToSlide = (direction) => {
    const newIndex = currentSlide + direction;
    if (newIndex >= 0 && newIndex < slides.length) {
      setCurrentSlide(newIndex);
      setSelectedChoice(null); // Reset choice when moving to another slide
    }
  };

  const makeChoice = (choiceIndex) => {
    setSelectedChoice(choiceIndex);
    const nextSlideId = slides[currentSlide].choices[choiceIndex].nextSlide;
    const nextIndex = slides.findIndex((slide) => slide.id === nextSlideId);
    if (nextIndex !== -1) setCurrentSlide(nextIndex);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div
      style={{
        width: "800px",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ccc",
      }}
    >
      {/* Top Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
        }}
      >
        <button onClick={() => setShowProfileCreation(true)}>
          New Profile
        </button>
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
          flex: 1,
          backgroundImage: `url(${currentSlideData.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Bottom region: Content and Buttons */}
      <div style={{ padding: "20px", position: "relative" }}>
        <p>{currentSlideData.text}</p>

        {/* Choice dropdown */}
        {currentSlideData.choices && (
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowChoice(!showChoice)}>Choose</button>
            {showChoice && (
              <div
                style={{
                  position: "absolute",
                  background: "white",
                  border: "1px solid #ccc",
                  padding: "5px",
                }}
              >
                {currentSlideData.choices.map((choice, index) => (
                  <div key={index} onClick={() => makeChoice(index)}>
                    {choice.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button onClick={() => goToSlide(-1)}>Previous</button>
          <button onClick={() => goToSlide(1)}>Next</button>
        </div>
      </div>

      {/* Profile Creation Modal */}
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

export default Demo;
