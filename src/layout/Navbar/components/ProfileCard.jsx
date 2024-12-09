import {} from "react";
import {
  CircleUserRound,
  CreditCard,
  FileText,
  Heart,
  Lock,
  LogOut,
  MoveRight,
  PencilLine,
  TrendingUp,
} from "lucide-react";
import img from "../../../assets/profilebg.png";
import { logoutUser } from "../../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const ProfileCard = ({ setIsVisible }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/login");
    setIsVisible(false);
  };
  const handleChangePassword = () => {
    navigate("/change-password");
    setIsVisible(false);
  };
  const handleMyProfile = () => {
    navigate("/update-profile");
    setIsVisible(false);
  };
  const handleCard = () => {
    navigate("/card");
    setIsVisible(false);
  };
  const handlePaymentReport = () => {
    navigate("/payment-report");
    setIsVisible(false);
  };
  const handleBillSummary = () => {
    navigate("/bill-summary");
    setIsVisible(false);
  };
  const handleUpgradePlan = () => {
    navigate("/upgrade-plan");
    setIsVisible(false);
  };

  const genaralLink = [
    // {
    //   label: "My Profile",
    //   icon: <User className="text-teal-600" />,
    //   action: handleMyProfile,
    // },
    {
      label: "Change Password",
      icon: <Lock className="text-teal-600" />,
      action: handleChangePassword,
    },
    {
      label: "Download OMDRx Card",
      icon: <Heart className="text-teal-600" />,
      action: handleCard,
    },
    {
      label: "Bill Summary",
      icon: <FileText className="text-teal-600" />,
      action: handleBillSummary,
    },
    {
      label: "Plan Upgrade",
      icon: <TrendingUp className="text-teal-600" />,
      action: handleUpgradePlan,
    },
  ];
  const logoutLink = [
    {
      label: "Logout",
      icon: <LogOut className="text-red-500" />,
      textColor: "text-red-500",
      action: logoutHandler,
    },
  ];

  const adminOnlyLinks = [
    {
      label: "Payment Report",
      icon: <CreditCard className="text-teal-600" />,
      action: handlePaymentReport,
    },
  ];

  const menuItems =
    user?.role === "Admin" ? [...genaralLink, ...adminOnlyLinks, ...logoutLink] : [...genaralLink, ...logoutLink];

  const bg = {
    background: `url(${img})`,
    backgroundSize: "cover", // Make the background cover the container
    backgroundPosition: "center", // Center the image
    backgroundRepeat: "no-repeat", // Prevent the image from repeating
    zIndex: 999,
  };

  return (
    <>
      <div className="min-w-72 lg:min-w-96 rounded-xl  bg-[white] shadow-lg lg:pb-8 mx-auto">
        <div
          style={bg}
          className="  lg:grid justify-items-center pt-3 lg:pt-10 pb-24 lg:pb-32 gap-2 rounded-t-xl text-white text-center"
        >
          <p className="">
            {" "}
            {"("} Member ID: {user?.omdId} {")"}
          </p>
          <div className="grid gap-2 lg:gap-6 justify-items-center">
            <Link to="/">
             {
              user?.image ? 
                <img
                className="border-[5px] border-[#ffffff5e] rounded-full h-20 w-20  object-cover"
                // src={profile}
                src={user?.image}
                alt=""
              />
              :     <CircleUserRound size={50}  color="white" />

             }
            </Link>
            <h4 className="text-xl font-semibold">
              {user?.firstName} {user?.lastName}
            </h4>
            <button
              className="flex items-center gap-2 bg-[#51C0BA] py-2 px-4 rounded-md"
              onClick={handleMyProfile}
            >
              <PencilLine />
              Edit Profile
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg -mt-[90px]  max-w-xs mx-auto">
          <ul className=" divide-y overflow-hidden">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between hover:shadow-lg hover:px-[15px] hover:bg-[#e3efef5e] hover:scale-105 transition-transform p-[10px] cursor-pointer text-gray-800 hover:text-blue-600 font-medium"
                onClick={item.action}
              >
                <div className="flex items-center space-x-3">
                  <span>{item.icon}</span>
                  <span className={item.textColor || "text-gray-700"}>
                    {item.label}
                  </span>
                </div>
                <MoveRight size={20} className="text-gray-400" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
