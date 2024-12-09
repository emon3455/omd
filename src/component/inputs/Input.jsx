import {} from "react";
import { cn } from "../../utils/cn";

const Input = ({
  className,
  label,
  placeholder,
  icon,
  error,
  ...restProps
}) => {
  return (
    <label htmlFor="" className="relative block w-full">
      {label && (
        <span className="block mb-1 font-medium capitalize ">{label}</span>
      )}
      <div className="w-full relative">
        <div className="relative group rounded-lg">
          <label>
            <input
              className={cn(
                "peer select-all px-3 h-10 w-full focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-xl border appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                error ? "border-red-500" : "border-gray-300 ",
                className
              )}
              {...restProps}
            />
            {!label && placeholder && (
              <span
                style={{
                  background:
                    "linear-gradient(180deg, #D9F6DB 0%, #D9F6DB 49%, #fff 50%, #fff 100%)",
                }}
                className="z-2 text-gray-500 pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all text-sm peer-focus:text-sm peer-placeholder-shown:text-lg px-1 peer-focus:px-1 peer-placeholder-shown:px-0 peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0"
              >
                {placeholder}
              </span>
            )}
          </label>
        </div>

        {icon && <span className="absolute right-3 top-2.5">{icon}</span>}
      </div>
      {error && (
        <span className="mt-1 text-sm text-red-500 italic">{error}</span>
      )}
    </label>
  );
};

export default Input;
