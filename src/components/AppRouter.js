import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { menus } from "../utils/constants";
// import MarkdownRenderer from "./MarkdownRenderer";
import NavBar from "./NavBar";
import Cosmania from "../pages/Cosmania";

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <NavBar />
        <Routes>
          {menus.map(({ component, path, subSections }) => {
            const Component = React.lazy(component);
            return (
              <React.Fragment key={path}>
                <Route path={path} element={<Component />} />
                {subSections &&
                  subSections.map(({ path }) => {
                    return (
                      <Route key={path} path={path} element={<Cosmania />} />
                    );
                  })}
              </React.Fragment>
            );
          })}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
