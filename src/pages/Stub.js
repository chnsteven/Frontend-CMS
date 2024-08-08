import React from "react";
import NavMenu from "../components/NavMenu";
import MarkdownRenderer from "../components/MarkdownRenderer";
import VisualNovelDemo from "../components/VisualNovelDemo";
import VisualNovelDemo2 from "../components/VisualNovelDemo2";
import { projectIds } from "../utils/constants";
function Stub({ title }) {
  return (
    <div>
      {title}
      <NavMenu />
      {projectIds.map((path) => (
        <MarkdownRenderer filePath={`./projects/${path}.md`} />
      ))}

      {/* <VisualNovelDemo slides={slides} /> */}
      {/* <VisualNovelDemo2 slides={slides2} />; */}
    </div>
  );
}

export default Stub;

// const slides = [
//   {
//     id: 1,
//     image: "/cover_imgs/cover-jankbot.png",
//     text: "This is the first scene.",
//     choices: [
//       { text: "Go left", nextSlide: 2 },
//       { text: "Go right", nextSlide: 3 },
//     ],
//   },
//   {
//     id: 2,
//     image: "slideLeft.jpg",
//     text: "You went left.",
//     choices: [{ text: "Continue", nextSlide: 4 }],
//   },
//   {
//     id: 3,
//     image: "slideRight.jpg",
//     text: "You went right.",
//     choices: [{ text: "Keep going", nextSlide: 5 }],
//   },
//   { id: 4, image: "slide4.jpg", text: "This is after going left." },
//   { id: 5, image: "slide5.jpg", text: "This is after going right." },
// ];

// const slides2 = [
//   {
//     id: "start",
//     image: "/cover_imgs/cover-jankbot.png",
//     text: "You wake up in a mysterious room.",
//     choices: [
//       { text: "Look around", nextSlideId: "look_around" },
//       { text: "Try to sleep again", nextSlideId: "sleep" },
//     ],
//   },
//   {
//     id: "look_around",
//     image: "look_around_scene.jpg",
//     text: "You find a key under the bed.",
//     next: "find_key",
//     previous: "start",
//   },
//   {
//     id: "sleep",
//     image: "sleep_scene.jpg",
//     text: "You decide to ignore everything and go back to sleep.",
//     next: "end_1",
//     previous: "start",
//   },
//   // ... more slides with similar structure
//   {
//     id: "end_1",
//     image: "end_scene.jpg",
//     text: "You sleep through an important event. The end.",
//     previous: "sleep",
//   },
// ];
