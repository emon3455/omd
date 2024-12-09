import {} from "react";
import { cn } from "../../utils/cn";
import { Check } from "lucide-react";

const Checkbox = ({
  label = "",
  disabled,
  checked = false,
  className,
  ...restProps
}) => {
  return (
    <div className="flex items-center  space-x-2 ">
      <div
        className={cn(
          " border-2 rounded transition-all duration-100 ease-in relative disabled:opacity-50",
          checked
            ? "bg-primary border-primary "
            : "border-gray-400 hover:border-primary",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          className,
          "w-4 h-4"
        )}
      >
        <Check
          className={cn(
            "w-3 h-3 text-white transition-all  duration-200 absolute inset-0 ",
            checked
              ? "scale-100 opacity-100 translate-y-0 translate-x-0 "
              : "scale-50 opacity-0 translate-y-2 -translate-x-2"
          )}
          strokeWidth={6}
        />
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          {...restProps}
          className="opacity-0  h-5 w-5 -top-1 -left-1 cursor-pointer relative "
        />
      </div>
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
