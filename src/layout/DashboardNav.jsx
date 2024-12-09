import React from "react";
import { Menu } from "lucide-react";

const DashboardNav = () => {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <button className="text-gray-600 focus:outline-none">
        <Menu size={24} />
      </button>
    </header>
  );
};

export default DashboardNav;
