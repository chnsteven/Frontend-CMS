import React from "react";
import { Link } from "react-router-dom";
import { headerLinks } from "../utils/constants";

function NavigationGrid() {
  const buttonsPerRow = 3;
  return (
    <div className="container-fluid">
      {chunk(headerLinks, buttonsPerRow).map((buttonGroup) => (
        <div className="row">
          {buttonGroup.map((link, index) => (
            <div className="col-md-4">
              <Link to={link.path}>
                <button
                  type="button"
                  className="btn btn-primary btn-home hover-box-shadow"
                  id=""
                >
                  {link.title}
                </button>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default NavigationGrid;

function chunk(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, (index + 1) * size)
  );
}
