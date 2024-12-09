import { BadgeDollarSign, Menu, Receipt } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current route
  const user = useSelector((state) => state.userSlice.user);
  // Dropdown links data
  const genaralLink = [
    {
      path: "/reduce-hospital-bills",
      label: "Reduce hospital bills",
      icon: <Receipt size={20} />,
    },
  ];
  const adminOnlyLinks = [
    {
      path: "/pricing-plans",
      label: "Optimal care level plans",
      icon: <BadgeDollarSign size={20} />,
    }
  ];
  const menuItems =
    user?.role === "Admin" ? [...genaralLink, ...adminOnlyLinks] : genaralLink;

  // Function to check if the current link is active
  const isActiveLink = (path) => location.pathname === path;

  // Check if any of the dropdown links are active
  const isAnyLinkActive = menuItems.some((link) => isActiveLink(link.path));

  return (
    <div className="p- hidden lg:inline">
      <div
        className="dropdown inline-block relative"
        onMouseEnter={() => setIsOpen(true)} // Show on hover
        onMouseLeave={() => setIsOpen(false)} // Hide on mouse leave
      >
        {/* Dropdown Button */}
        <button
          className={`text-xs font-semibold py- px-  grid justify-items-center ${
            isOpen || isAnyLinkActive
              ? "text-[#51C0BA] font-bold"
              : "text-[#79747E]"
          }`}
          onClick={() => setIsOpen(!isOpen)} // Toggle on click
        >
          <Menu />
          More
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <ul className="dropdown-menu top-10 -left-4 absolute w-60 shadow-md  font-semibold bg-white pt-1">
            {menuItems.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className={`flex gap-2 py-3 px-4 whitespace-no-wrap  transition-all duration-300 ease-in-out ${
                    isActiveLink(link.path)
                      ? "bg-[#2378E0] text-white" // Active link style
                      : "hover:bg-[#2378E0] hover:text-white"
                  }`}
                >
                  {link.icon}
                  <p>{link.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
