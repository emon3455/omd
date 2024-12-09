import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLinks = ({ link, action }) => {
  const location = useLocation();

  const isActive = location.pathname === link.path;

  return (
    <li
      className={`${link.label === "More" ? "hidden lg:inline" : "inline"}`}
      onClick={action}
    >
      <Link
        to={link.path}
        className={`${
          link.label === "More" ? "hidden" : "grid"
        } text-center lg:grid justify-items-center hover:text-[#51C0BA] text-xs font-bold ${
          isActive ? "text-[#51C0BA] font-bold" : "text-[#79747E]"
        }`}
      >
        {link.icon}
        <div className="inline">{link.label}</div>
      </Link>
    </li>
  );
};

export default NavLinks;
