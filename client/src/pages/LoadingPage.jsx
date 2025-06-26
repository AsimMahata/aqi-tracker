import React from "react";
import Lottie from "lottie-react";
import aqiLoader from "../animations/Loading.json";
import "../styles/LoadingPage.css";

export const LoadingPage = () => {
  return (
    <div className="loading-container">
      <p className="loading-text">
        Loading <span className="dot-anim"></span>
      </p>
      <Lottie
        animationData={aqiLoader}
        loop
        style={{ width: 400, height: 400 }}
      />
    </div>
  );
};
