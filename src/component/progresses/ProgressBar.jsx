import {} from "react";
import { cn } from "../../utils/cn";

const ProgressBar = ({ percentage, className }) => {
 
  console.log("parcentage in progressbar: ",percentage);
  
  
  return (
    <div className={cn("w-full bg-gray-200 rounded-full h-2", className)}>
      {/* Progress bar */}
      <div
        className=" bg-primary h-full transition-all duration-500 ease-out flex items-center justify-end rounded-full min-w-9"
        style={{ width: `${percentage}%` }}
      >
        <div
          className={cn(
            "relative items-center  rounded-full flex h-9 w-9 flex-col justify-center bg-primary text-white text-xs font-medium",
            percentage === 0 && "left-0"
          )}
        >
          {parseInt(percentage)}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
