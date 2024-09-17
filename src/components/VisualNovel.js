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
  {
    id: "mysteriousGlade",
    image: "placeholder_image_path_3.jpg",
    text: "You enter a clearing where you see your reflection in a pond. But something is different. Your eyes are a vibrant shade of blue.",
    choices: [
      { text: "Stare into the pond", nextSlideId: "pondStare" },
      { text: "Continue on your journey", nextSlideId: "forestExit" },
    ],
  },
  {
    id: "pondStare",
    image: "placeholder_image_path_4.jpg",
    text: "As you stare into the pond, you realize you can communicate with the trees. They tell you of an ancient artifact hidden somewhere in the forest.",
    choices: [
      { text: "Ask the trees for help", nextSlideId: "treeAssistance" },
      { text: "Ignore the trees and continue", nextSlideId: "forestExit" },
    ],
  },
  {
    id: "treeAssistance",
    image: "placeholder_image_path_5.jpg",
    text: "The trees lead you to a hidden cave, where you find an old, wise hermit. He gives you a map to the artifact, but also a warning.",
    choices: [
      { text: "Follow the map to the artifact", nextSlideId: "artifactQuest" },
      { text: "Thank the hermit and leave", nextSlideId: "forestExit" },
    ],
  },
  {
    id: "artifactQuest",
    image: "placeholder_image_path_6.jpg",
    text: "You follow the map to a ancient, hidden temple, where you must solve a riddle to claim the artifact.",
    choices: [
      { text: "Try to solve the riddle", nextSlideId: "riddleSolution" },
      { text: "Give up and leave", nextSlideId: "forestExit" },
    ],
  },
  {
    id: "riddleSolution",
    image: "placeholder_image_path_7.jpg",
    text: "You successfully solve the riddle and claim the artifact. But as you touch it, you feel a sense of darkness spreading through the forest.",
    choices: [
      {
        text: "Try to use the artifact to reverse the darkness",
        nextSlideId: "artifactUse",
      },
      {
        text: "Destroy the artifact to stop the darkness",
        nextSlideId: "artifactDestroy",
      },
    ],
  },
  {
    id: "artifactUse",
    image: "placeholder_image_path_8.jpg",
    text: "You use the artifact to reverse the darkness, but at a cost. The forest is now in ruins, and you are alone.",
    choices: [
      { text: "Accept your fate and leave the forest", nextSlideId: "end" },
    ],
  },
  {
    id: "artifactDestroy",
    image: "placeholder_image_path_9.jpg",
    text: "You destroy the artifact to stop the darkness, but the forest is still in danger. You must find a way to save it.",
    choices: [
      {
        text: "Try to find a way to restore the forest",
        nextSlideId: "forestRestore",
      },
    ],
  },
  {
    id: "forestRestore",
    image: "placeholder_image_path_10.jpg",
    text: "You decide to restore the forest to its former glory. You work hard to fix the damage, and eventually, the forest is back in its beauty.",
    choices: [
      { text: "Live happily ever after in the forest", nextSlideId: "end" },
    ],
  },
  {
    id: "forestExit",
    image: "placeholder_image_path_11.jpg",
    text: "You decide to leave the forest and never return. But deep down, you know that you will always be connected to it.",
    choices: [{ text: "End your journey", nextSlideId: "end" }],
  },
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

export default VisualNovel;
