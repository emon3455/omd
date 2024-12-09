import {} from "react";
import { cn } from "../../utils/cn";

const InputField = ({
  label,
  errorMsg,
  type = "text",
  className = "",
  ...restProps
}) => {
  return (
    <div className="w-full">
      <div
        className={cn(
          "border rounded-lg pb-2 px-4 transition",

          errorMsg
            ? "ring-2 ring-rose-500"
            : "focus-within:ring-2 focus-within:ring-primary",
          restProps.disabled && "opacity-70 cursor-not-allowed",
          className
        )}
      >
        {label && <span className="text-xs text-gray-600">{label}</span>}
        <input
          type={type}
          className="w-full mx-auto focus:outline-none"
          {...restProps}
        />
      </div>
      {errorMsg && (
        <p className="mt-1 text-xs text-rose-500 italic">{errorMsg}</p>
      )}
    </div>
  );
};

export default InputField;
