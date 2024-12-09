import React from "react";
import { cn } from "../../utils/cn";
import toast from "react-hot-toast";

const ProgressSteps = ({
  steps,
  setStep,
  currentStep,
  validateInfo,
  validateAddresses,
}) => {
  const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleClick = (step) => {
    if (step === 1) {
      setStep(step);
    } else if (step === 2) {
      const isValidInfo = validateInfo();
      if (isValidInfo) {
        setStep(step);
      }
    } else if (step === 3) {
      const isValidInfo = validateInfo();
      const isValidAddress = validateAddresses();
      if (isValidInfo && isValidAddress) {
        setStep(step);
      }
    } else {
      validateInfo();
      toast.error("Please fill all required fields.");
    }
  };

  return (
    <div className="relative flex items-center justify-between mx-auto mb-8 md:mb-12 lg:mb-16">
      {/* Progress bar background */}
      <div className="absolute z-0 w-full h-1 bg-gray-300 top-1/2">
        <div
          className="h-full transition-all duration-300 ease-linear bg-primary"
          style={{
            width: `${progressWidth}%`, // Directly apply the computed width
          }}
        ></div>
      </div>

      {/* Circles for steps */}
      {steps.map((s, index) => (
        <React.Fragment key={index}>
          <div
            onClick={() => handleClick(s.step)} // Pass the entire step object
            className={cn(
              "relative flex z-10 items-center justify-center font-bold w-10 h-10 rounded-full border-[3px] bg-white transition-colors delay-300 hover:cursor-pointer",
              currentStep >= s.step ? "border-primary" : "",
              currentStep === s.step ? "bg-green-600 text-white" : ""
            )}
          >
            {s.step}
            <div
              className={cn(
                "absolute top-full text-center hidden lg:block text-nowrap transition font-medium",
                currentStep >= s.step ? "text-primary" : ""
              )}
            >
              {s.stepTitle}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressSteps;
