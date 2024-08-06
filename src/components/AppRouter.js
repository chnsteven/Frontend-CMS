import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { menus } from "../utils/constants";
import Stub from "../pages/Stub";

const router = "router";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {menus.map(({ path, component: Component, subSections }) => (
          <React.Fragment key={router + path}>
            <Route path={path} element={<Stub title={router + path} />} />
            {subSections &&
              subSections.map(({ path, component: Component }) => (
                <Route
                  key={router + path}
                  path={path}
                  element={<Stub title={router + path} />}
                />
              ))}
          </React.Fragment>
        ))}
      </Routes>
    </Router>
  );
};

export default AppRouter;
