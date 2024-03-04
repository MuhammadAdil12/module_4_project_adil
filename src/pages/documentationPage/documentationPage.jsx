import { useEffect, useState } from "react";
import "./documentationPage.css"; // Import your CSS file here
import { Link } from 'react-router-dom';

import img from "../../img/ad-logo.png"

export const DocumentationPage = () => {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showLogo ? (
        <div className="logo-entry">
          <h1>
            Welcome to your workout tracker App <br /> Made by ADiL and his
            Siblings
          </h1>
          <img src={img} alt="" className="logo-img" />
        </div>
      ) : (
        <div className="main-section">
          <Link to="/home">
            <span className="material-symbols-outlined" id="back-arrow">
              {" "}
              arrow_back
            </span>
          </Link>
          <div className="documentation-title">
            <h1>This page is still under construction</h1>
            <h1>
              Our developer <span className="hero">ADiL</span> is currently working on it
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}


