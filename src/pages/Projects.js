// import React from "react";
// import readMoreIcon from "../assets/icons/read-more.svg";
// import youtubeIcon from "../assets/icons/youtube.svg";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { Link } from 'react-router-dom';
// import underConstructionGif from "../assets/underConstruction.gif";
// import ScrollToTopButton from "../components/ScrollToTopButton";
// function Projects({ projects }) {
//   return (
//     <div>
//       <Header />
//       <Footer />
//       <ScrollToTopButton />
//       <div className="project-dashboard-box-container fade-in">
//         <div className="project-card hover-box-shadow">
//           <div className="project-card-header">
//             <img
//               className="project-card-image"
//               src={underConstructionGif}
//               alt={"Under Construction"}
//             />
//           </div>
//         </div>
//         {projects.map((project) => (
//           <div className="project-card hover-box-shadow">
//             <div className="project-card-header">
//               <img
//                 className="project-card-image"
//                 src={project.frontMatter.cover_image}
//                 alt={project.frontMatter.title}
//               />
//             </div>
//             <nav className="project-card-content">
//               <Link
//                 className="no-decoration hover-text-shadow"
//                 to={`/projects/${project.frontMatter.title}`}
//               >
//                 {project.frontMatter.title} {project.frontMatter.start_date}~
//                 {project.frontMatter.end_date}
//               </Link>
//             </nav>
//             <nav className="project-dashboard-action-container">
//               <Link
//                 className="project-action"
//                 to={`/projects/${project.frontMatter.title}`}
//                 title="Read more"
//               >
//                 <img
//                   className="project-action-icon hover-box-shadow"
//                   src={readMoreIcon}
//                   alt="read more icon"
//                 />
//               </Link>
//               {project.frontMatter.video ? (
//                 <a
//                   className="project-action"
//                   href={project.frontMatter.video}
//                   alt={project.frontMatter.video_excerpt}
//                   title="Watch video"
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   <img
//                     className="project-action-icon hover-box-shadow"
//                     src={youtubeIcon}
//                     alt="youtube icon"
//                   />
//                 </a>
//               ) : (
//                 <div className="project-action">
//                   <img
//                     className="project-action-icon hover-box-shadow"
//                     src={youtubeIcon}
//                     alt="youtube icon"
//                     onClick={() => alert(project.frontMatter.video_excerpt)}
//                   ></img>
//                 </div>
//               )}

//             </nav>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }

// export default Projects;
import React from "react";

function Projects() {
  return <div>Projects</div>;
}

export default Projects;
