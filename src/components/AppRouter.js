import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { menus } from "../utils/constants";
import NavBar from "./NavBar";

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <NavBar />
        <Routes>
          {menus.map(({ component, path, subSections }) => {
            return (
              <React.Fragment key={path}>
                <Route path={`${path}/`} element={component} />
                {subSections &&
                  subSections.map(({ component, path }) => {
                    return <Route key={path} path={path} element={component} />;
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
