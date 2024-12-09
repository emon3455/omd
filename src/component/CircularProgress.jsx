import React from 'react';

const CircularProgress = ({ percentage }) => {
  const radius = 60; // Radius of the circle
  const stroke = 8; // Thickness of the stroke
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const maxOffset = circumference * 0.73; // 80% of the circle length

  // Calculate the offset based on the percentage, relative to 80% of the circumference
  const strokeDashoffset = maxOffset - (percentage / 100) * maxOffset;

  return (
    <div className="flex z-0 items-center justify-center w-32 h-32 relative">
      {/* SVG Circle */}
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform rotate-[145deg]" // Rotate to position the start at the bottom left
      >
        {/* Background Circle */}
        <circle
          stroke="#e5e7eb" // Tailwind's gray-200 color for background track
          fill="transparent"
          strokeDasharray={`${maxOffset} ${circumference}`} 
           strokeLinecap="round"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress Circle */}
        <circle
          stroke="#003F62" // Tailwind's teal-700 color for the progress
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${maxOffset} ${circumference}`} // 80% filled, 20% empty
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {/* Text */}
      <div className="flex absolute flex-col items-center">
        <span className="text-2xl font-semibold text-[#949BB7]">{percentage}%</span>
      </div>
      <div className="text-[#00192B] absolute left-7 font-semibold -bottom-1  py-2  bg-[#F7F9FF] leading-3 text-xs">
        Profile <br /> Completed
      </div>
    </div>
  );
};

export default CircularProgress;
