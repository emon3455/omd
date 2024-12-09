import { useState } from "react";
import {
  ChevronLeft,
  LayoutDashboard,
  UserCog,
  CreditCard,
  LogOut,
  UserRoundCog,
  DollarSign,
  Menu,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/features/auth/authSlice";
import Button from "../component/buttons/Button";
import { cn } from "../utils/cn";

const MobileSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navLinks = [
    { text: "Manage users", path: "/admin/users", icon: <UserCog size={20} /> },
    {
      text: "Payment report",
      path: "/admin/payment-report",
      icon: <CreditCard size={20} />,
    },
    {
      text: "Manage Plan",
      path: "/admin/pricing",
      icon: <DollarSign size={20} />,
    },
    {
      text: "Change Password",
      path: "/admin/change-password",
      icon: <UserRoundCog size={20} />,
    },
  ];

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "fixed top-4 left-4 bg-primary text-white p-1 rounded-md md:hidden"
        )}
      >
        <Menu size={18} />
      </button>

      <aside
        className={cn(
          `fixed  z-40 h-screen w-64 bg-[#023D33] text-white shadow-md flex flex-col justify-between transition-transform duration-300`,
          isExpanded ? "top-0 left-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div>
          <div className="flex items-center justify-between p-4 border-b">
            <div className="relative flex items-center gap-3 pl-2 h-10">
              <LayoutDashboard size={24} />
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
              <ChevronLeft
                onClick={() => setIsExpanded(false)}
                size={24}
                className={cn(
                  "absolute cursor-pointer  bg-primary rounded-full",
                  isExpanded ? "-right-[3.7rem]" : ""
                )}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={index}
                  to={link.path}
                  onClick={() => setIsExpanded(false)}
                  className={`flex items-center py-2 px-3 cursor-pointer rounded-lg transition-all duration-300 text-nowrap h-10 capitalize ${
                    isActive
                      ? "bg-gray-100 text-black"
                      : "hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  <span className="ml-4">{link.text}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <Button
          variant=""
          onClick={logoutHandler}
          className="border m-4 hover:bg-primary uppercase"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </Button>
      </aside>
    </div>
  );
};

export default MobileSidebar;
