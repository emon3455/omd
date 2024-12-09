import React from "react";
import "./CapsuleAnimation.css";

const CapsuleLoading = () => {
  return (
    <div className="capsule-container">
      <div className="capsule-wrapper">
        <div className="capsule">
          {[...Array(20)].map((_, i) => (
            <i key={i}></i>
          ))}
        </div>
        <div className="side"></div>
        <div className="side"></div>
      </div>
    </div>
  );
};

export default CapsuleLoading;
