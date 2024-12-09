import { useState } from "react";
import {
  ChevronLeft,
  LayoutDashboard,
  UserCog,
  CreditCard,
  LogOut,
  UserRoundCog,
  DollarSign,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/features/auth/authSlice";
import Button from "../component/buttons/Button";
import Tooltip from "../component/tooltips/Tooltip";
import { cn } from "../utils/cn";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

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
    <aside
      className={`hidden  md:flex h-screen  bg-[#023D33] text-white shadow-md  flex-col justify-between transition-all duration-300  z-50 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* Sidebar Header */}
      <div>
        <div className="relative flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3 pl-2 h-10">
            <LayoutDashboard
              size={24}
              className={cn("", !isExpanded && "mx-auto")}
            />
            {isExpanded && (
              <h1 className="text-lg flex items-center font-semibold text-nowrap line-clamp-1 ">
                Admin Dashboard
              </h1>
            )}
          </div>

          <ChevronLeft
            onClick={() => setIsExpanded(!isExpanded)}
            size={28}
            className={cn(
              "transition duration-300 cursor-pointer   bg-primary rounded-full absolute p-1",
              isExpanded
                ? "-rotate-0 -right-[0.85rem] "
                : "-rotate-180 -right-3 "
            )}
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2 p-4">
          {navLinks.map((link, index) => {
            // Check if the current location path matches the link path
            const isActive = location.pathname === link.path;

            return isExpanded ? (
              <Link
                key={index}
                to={link.path}
                className={`flex items-center py-2 px-3 cursor-pointer rounded-lg transition-all duration-300 text-nowrap line-clamp-1 h-10 capitalize ${
                  isActive
                    ? "bg-gray-100 text-black"
                    : "hover:bg-gray-100 hover:text-black"
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                {isExpanded && <span className="ml-4">{link.text}</span>}
              </Link>
            ) : (
              <Tooltip position="right" content={link.text}>
                <Link
                  key={index}
                  to={link.path}
                  className={`h-10 flex items-center py-2 px-3 cursor-pointer rounded-lg transition-all duration-300 capitalize ${
                    isActive
                      ? "bg-gray-100 text-black"
                      : "hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                </Link>
              </Tooltip>
            );
          })}
        </nav>
      </div>
      {!isExpanded ? (
        <Tooltip position="right" content="Logout">
          <Button
            variant=""
            onClick={logoutHandler}
            className="border m-4 hover:bg-primary uppercase "
          >
            <LogOut className="" size={18} />
            {isExpanded && <span>Log Out</span>}
          </Button>
        </Tooltip>
      ) : (
        <Button
          variant=""
          onClick={logoutHandler}
          className="border m-4 hover:bg-primary uppercase "
        >
          <LogOut className="" size={18} />
          <span>Log Out</span>
        </Button>
      )}
    </aside>
  );
};

export default Sidebar;
