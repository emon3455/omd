import React from "react";
import "./capsuleAnimation.css";

const CapsuleAnimation = () => {
  return (
    <div className="capsule-container mt-[50%] scale-50">
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

export default CapsuleAnimation;
