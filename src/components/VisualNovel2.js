import React, { useState } from "react";

const slides = [
  {
    id: "start",
    image: "path/to/your/image1.jpg",
    text: "Welcome to the visual novel! This is the starting slide.",
    choices: [
      {
        text: "Start the adventure",
        nextSlide: "adventure",
      },
      {
        text: "Exit",
        nextSlide: "end",
      },
    ],
  },
  {
    id: "adventure",
    image: "path/to/your/image2.jpg",
    text: "You are about to embark on an exciting journey. What do you do?",
    choices: [
      {
        text: "Go to the forest",
        nextSlide: "forest",
      },
      {
        text: "Visit the village",
        nextSlide: "village",
      },
    ],
  },
  {
    id: "forest",
    image: "path/to/your/image3.jpg",
    text: "The forest is dark and mysterious. You hear rustling in the bushes.",
    choices: [
      {
        text: "Investigate the noise",
        nextSlide: "noise",
      },
      {
        text: "Walk away",
        nextSlide: "walkAway",
      },
    ],
  },
  {
    id: "village",
    image: "path/to/your/image4.jpg",
    text: "The village is bustling with activity. You see a market and a tavern.",
    choices: [
      {
        text: "Visit the market",
        nextSlide: "market",
      },
      {
        text: "Go to the tavern",
        nextSlide: "tavern",
      },
    ],
  },
  {
    id: "noise",
    image: "path/to/your/image5.jpg",
    text: "You find a small, injured animal. What do you do?",
    choices: [
      {
        text: "Help the animal",
        nextSlide: "helpAnimal",
      },
      {
        text: "Ignore it",
        nextSlide: "ignoreAnimal",
      },
    ],
  },
  {
    id: "walkAway",
    image: "path/to/your/image6.jpg",
    text: "You walk away from the noise and continue on your path.",
    choices: [
      {
        text: "Go back",
        nextSlide: "forest",
      },
      {
        text: "Move forward",
        nextSlide: "forwardPath",
      },
    ],
  },
  {
    id: "market",
    image: "path/to/your/image7.jpg",
    text: "The market is filled with exotic goods. You can buy items or chat with the vendors.",
    choices: [
      {
        text: "Buy an item",
        nextSlide: "buyItem",
      },
      {
        text: "Chat with a vendor",
        nextSlide: "chatVendor",
      },
    ],
  },
  {
    id: "tavern",
    image: "path/to/your/image8.jpg",
    text: "The tavern is lively. You can join a game of cards or listen to the tales of travelers.",
    choices: [
      {
        text: "Join the card game",
        nextSlide: "cardGame",
      },
      {
        text: "Listen to a tale",
        nextSlide: "tale",
      },
    ],
  },
  {
    id: "end",
    image: "path/to/your/image9.jpg",
    text: "The adventure ends here. Thank you for playing!",
    choices: [],
  },
];
const VisualNovelDemo2 = () => {
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
