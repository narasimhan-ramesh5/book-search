import React from "react";
import "./style.css";

/**
 * This is a functional component 
 * for a Bootstrap Jumbotron.
 */
function Jumbotron({ children }) {
  return (
    <div className="jumbotron">
      {children}
    </div>
  );
}

export default Jumbotron;
