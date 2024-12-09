import {} from "react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidabar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex ">
      <div>
        <Sidebar />
        <MobileSidebar />
      </div>
      <div className="w-full  max-h-screen overflow-y-auto md:px-14">
        <main className="max-w-screen-xl mx-auto pt-6 md:pt-0">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
