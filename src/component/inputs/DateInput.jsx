import {} from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { cn } from "../../utils/cn";

const DateInput = ({
  label = "Date of Birth",
  value,
  onChange,
  errorMsg,
  placeholder = "Select a Date",
  useRange = false,
  primaryColor = "green",
  className,
  ...restProps
}) => {
  return (
    <div>
      <div
        className={cn(
          "border pl-4 rounded-lg pb-2 focus-within:ring-2 focus-within:ring-primary transition",
          errorMsg ? "ring-2 ring-rose-500" : ""
        )}
      >
        <label htmlFor="" className="text-xs text-gray-600">
          {label}
        </label>
        <Datepicker
          displayFormat="DD/MM/YYYY"
          useRange={useRange}
          asSingle={!useRange}
          inputClassName={cn("w-full focus:outline-none", className)}
          popoverDirection="down"
          primaryColor={primaryColor}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          {...restProps}
        />
      </div>
      {errorMsg && (
        <span className="mt-1 text-xs text-red-500 italic">{errorMsg}</span>
      )}
    </div>
  );
};

export default DateInput;
