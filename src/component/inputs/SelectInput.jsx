import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

const SelectInput = ({
  options = [],
  selectedOption,
  onSelect,
  label,
  errorMsg,
  renderOption = (option) => option.label,
  placeholder = "Select an option",
  className = "",
}) => {
  const selectRef = useRef();
  const dropdownRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleOptionSelect = (option) => {
    onSelect(option);
    setIsDropdownOpen(false);
    setSearchTerm(""); // Reset search term on selection
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isDropdownOpen) return;

      if (
        selectRef.current &&
        !selectRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setSearchTerm(""); // Reset search term when closing dropdown
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    // Filter options based on the search term
    if (searchTerm) {
      setFilteredOptions(
        options.filter((option) =>
          renderOption(option).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, options, renderOption]);

  return (
    <div>
      <div ref={selectRef} className={cn("relative", className)}>
        <div
          className={cn(
            "flex items-center justify-between px-4 pb-2 pt-1 bg-white border rounded-lg cursor-pointer",
            "transition duration-150",
            errorMsg
              ? "ring-2 ring-rose-500"
              : "hover:ring-2 hover:ring-rose-500",
            isDropdownOpen
              ? "ring-2 ring-primary"
              : "hover:ring-2 hover:ring-primary"
          )}
          onClick={toggleDropdown}
        >
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-1">
              {label && <span className="text-xs text-gray-600">{label}</span>}
              {selectedOption ? (
                <span className="">{selectedOption}</span>
              ) : (
                <span className="text-gray-500">{placeholder}</span>
              )}
            </div>
          </div>
          <ChevronDown
            size={18}
            className={cn(
              "transition-transform duration-300",
              isDropdownOpen ? "-rotate-180" : "rotate-0"
            )}
          />
        </div>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className={cn(
              "absolute z-10 mt-2 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto w-full",
              "divide-y divide-gray-100"
            )}
          >
            {options.length > 5 && (
              <div className="p-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}
            {filteredOptions.length ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "p-3 flex items-center gap-4 cursor-pointer hover:bg-gray-100",
                    "transition duration-150"
                  )}
                  onClick={() => handleOptionSelect(option)}
                >
                  {renderOption(option)}
                </div>
              ))
            ) : (
              <p className="p-6">No options found!</p>
            )}
          </div>
        )}
      </div>
      {errorMsg && (
        <p className="mt-1 text-xs text-rose-500 italic">{errorMsg}</p>
      )}
    </div>
  );
};

export default SelectInput;
