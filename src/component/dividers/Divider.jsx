import {} from "react";
import { cn } from "../../utils/cn";

const Divider = ({ className, label }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex-grow border-t border-gray-300 "></div>
      {label && <span className="mx-4 text-gray-500">{label}</span>}
      {label && <div className="flex-grow border-t border-gray-300 "></div>}
    </div>
  );
};

export default Divider;
