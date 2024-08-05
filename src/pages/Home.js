import React from "react";
import { useNavigate } from "react-router-dom";
import portrait from "../assets/portrait.jpg";

function Home() {
  const navigate = useNavigate();
  function triggerFadeOut() {
    const element = document.querySelector("#fade-out-container");
    element.classList.add("trigger-fade-out");
    element.addEventListener(
      "animationend",
      function () {
        // alert('Animation is complete!');
        navigate("/about");
      },
      { once: true }
    );
  }
  return (
    <div className="homepage-container fade-out" id="fade-out-container">
      <div className="homepage-background fade-in">
        <article className="homepage-content">
          {/* <img
          className="portrait scale-in"
          src={portrait}
          alt="portrait of Steven Chen"
        /> */}
          <blockquote className="homepage-content-quote text-shadow translate-in-y">
            <em>
              Hello, I am Steven Chen. As a recent graduate from UBC with a
              passion for statistics and computer science, I bring a fresh
              perspective for turning ideas into innovative solutions. My
              diverse academic background, coupled with hands-on experience from
              school projects and self-driven initiatives, fuels my commitment
              to excel in the dynamic world of software development. Let's build
              something extraordinary together.
            </em>
          </blockquote>
          <div className="fade-in">
            <button className="homepage-btn glow" onClick={triggerFadeOut}>
              Enter Portfolio
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Home;
