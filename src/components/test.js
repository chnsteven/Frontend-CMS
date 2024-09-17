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
  },
  /* rest of the slides */
  {
    id: "end",
    image: "placeholder_image_path_12.jpg",
    text: "The end",
    choices: [],
  },
];

const VisualNovel = () => {
  const [currentSlideId, setCurrentSlideId] = useState("start");
  const [userProfile, setUserProfile] = useState(null);
  const [showProfileCreation, setShowProfileCreation] = useState(false);

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

  const handleNext = () => {
    const nextSlide = slides.find((slide) => slide.id === currentSlide.id);
    if (nextSlide && nextSlide.choices[0]) {
      goToSlide(nextSlide.choices[0].nextSlideId);
    }
  };

  const handlePrevious = () => {
    // Implement logic to find the previous slide based on the current slide's id and the slide structure
    // For simplicity, let's just go to the "start" slide for previous from the "end" slide
    if (currentSlide.id === "end") {
      setCurrentSlideId("start");
    }
  };

  return (
    <div
      style={
        {
          /* styles */
        }
      }
    >
      {/* Top Buttons */}
      <div
        style={
          {
            /* styles */
          }
        }
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
        style={
          {
            /* styles */
          }
        }
      ></div>

      {/* Content and Choices */}
      <div
        style={
          {
            /* styles */
          }
        }
      >
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
        style={
          {
            /* styles */
          }
        }
      >
        <button onClick={handlePrevious} disabled={currentSlide.id === "start"}>
          Previous
        </button>
        <button onClick={handleNext}>Next</button>
      </div>

      {/* Profile Creation Popup */}
      {showProfileCreation && (
        <div
          style={
            {
              /* styles */
            }
          }
        >
          {/* Profile creation form */}
        </div>
      )}
    </div>
  );
};

export default VisualNovel;
