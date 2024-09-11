import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug, faFaceLaughBeam } from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";

const roadmapSteps = [
  // checkpoint 0
  {
    title: "Configure environment and dependencies",
    content: <p>Setup dependencies for working with Typescript </p>,
    media: "",
    location: { x: 0, y: 0 },
  },
  {
    title: "Translate the specification into a test suite",
    content: <p>Follow a modern technique for building software: TDD</p>,
    media: "",
    location: { x: 0, y: 1 },
  },
  {
    title: "Evaluate test suite on AutoTest",
    content: (
      <p>
        Kill the mutants! <FontAwesomeIcon icon={faFaceLaughBeam} />
        <br />
        <FontAwesomeIcon className="bug" icon={faBug} />
      </p>
    ),
    media: "",
    location: { x: 0, y: 2 },
  },
  // checkpoint 1
  {
    title: "Dataset Processor: Zip Parsing",
    content: (
      <p>
        <p>Load and process zip files, convert them into data model(s).</p>
        <em>Parsing + Validation + Data Modelling</em>
      </p>
    ),
    media: "",
    location: { x: 1, y: 0 },
  },
  {
    title: "Query Engine",
    content: (
      <p>
        <p>Find subset that matches a query</p>
        <em>Parsing + Validation + Collecting</em>
      </p>
    ),
    media: "",
    location: { x: 1, y: 1 },
  },
  // checkpoint 2
  {
    title: "Dataset Processor: HTML Parsing",
    content: (
      <p>
        <p>Understand document tree and extract information</p>
        <strike>hard code</strike>
      </p>
    ),
    media: "",
    location: { x: 2, y: 0 },
  },
  {
    title: "Dataset Processor: Geolocation",
    content: (
      <p>
        <p>Sending the Request, encoding the address</p>
      </p>
    ),
    media: "",
    location: { x: 2, y: 1 },
  },
  {
    title: "Query Engine: Aggregation",
    content: (
      <p>
        <p>
          Support aggregated queries like <strong>apply</strong> and{" "}
          <strong>sorting</strong>
        </p>
      </p>
    ),
    media: "",
    location: { x: 2, y: 2 },
  },
  // checkpoint 3
  {
    title: "User Stories & Definition of Dones",
    media: "",
    location: { x: 3, y: 0 },
  },
  {
    title: "Frontend",
    content: (
      <p>
        <p>Implement user stories and REST endpoints</p>
      </p>
    ),
    media: "",
    location: { x: 3, y: 1 },
  },
];

const gridRows = 4; // Define the grid size
const gridColumns = 3;

const Roadmap = () => {
  useEffect(() => {
    gsap.set(".bug", { scale: 1, rotation: 0 });
    gsap.to(".bug", {
      duration: 4,
      scale: 0,
      rotation: 360,
      ease: "power3.in",
      repeat: -1, // Repeat forever
    });
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--grid-rows", gridRows);
    document.documentElement.style.setProperty("--grid-columns", gridColumns);
  }, []);

  // Create a 2D array for the grid
  const grid = Array.from({ length: gridRows }, () =>
    Array(gridColumns).fill(null)
  );

  // Populate the grid with roadmap steps based on coordinates
  roadmapSteps.forEach((step) => {
    if (step.location.x < gridRows && step.location.y < gridColumns) {
      grid[step.location.x][step.location.y] = step; // Assign step to its position
    }
  });

  return (
    <div>
      <h3>Roadmap</h3>
      <div className="roadmap-container">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="grid-cell">
              {cell ? (
                <div className="roadmap-step">
                  <h3>{cell.title}</h3>
                  {cell.content && cell.content}{" "}
                  {/* Proper conditional rendering */}
                  {cell.media && (
                    <img src={cell.media} alt={`Media for ${cell.title}`} />
                  )}
                </div>
              ) : null}{" "}
              {/* Render blank if no step */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Roadmap;