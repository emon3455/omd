import { useState, useEffect, useRef } from "react";
import logo from "../../assets/OMD.png";
import { CircleUserRound, Hospital, House, School, ShoppingBag, User } from "lucide-react";
import NavLinks from "./components/NavLinks";
import ProfileCard from "./components/ProfileCard";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { setIsExternalApiCalling } from "../../redux/features/rxvalet/rxvaletSlice";
import { useRxvaletLoginMutation } from "../../redux/features/rxvalet/rxvaletApiSlice";
import { useGetLyricLoginMutation } from "../../redux/features/getLyric/getLyricApiSlice";
import { errorAlert } from "../../utils/allertFunction";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const profileRef = useRef(null);
  const profileCardRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.user);

  // Use the login mutation hook from rxvaletApiSlice
  const [rxvaletLogin] = useRxvaletLoginMutation();
  const [getLyricLogin] = useGetLyricLoginMutation();

  const toggleProfileCard = () => {
    if (!isVisible) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 500);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        profileCardRef.current &&
        !profileCardRef.current.contains(event.target)
      ) {
        setIsAnimating(false);
        setTimeout(() => setIsVisible(false), 500);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClinick = async () => {
    if (user.status === "Canceled") {
      errorAlert({
        title: "Your Account Is Deactive!",
        text: "Please activate your account to get Clinic services",
        icon: "warning",
        bg: "bg-primary",
      });
      navigate("/upgrade-plan");
      return;
    }
    if (!user?.PrimaryMemberGUID && !user?.lyricsUserId) {
      navigate("/update-profile");
      errorAlert({
        icon: "warning",
        title: "Please Complete Your Profile!",
        text: "Complete your profile first to get the clinic service",
      });
      return;
    }
    try {
      dispatch(setIsExternalApiCalling(true));
      const data = {
        memberExternalId: user?._id,
        groupCode: "MTMSTGOPT01",
      };

      const response = await getLyricLogin(data).unwrap();
      window.location.href = response.redirectURL;
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setTimeout(() => dispatch(setIsExternalApiCalling(false)), 4000);
    }
  };

  const handlePharmacy = async () => {
    if (user.status === "Canceled") {
      errorAlert({
        title: "Your Account Is Deactive!",
        text: "Please activate your account to get Pharmacy service!",
        icon: "warning",
        bg:"bg-green-500"
      });
      navigate("/upgrade-plan");
      return;
    }
    if (!user?.PrimaryMemberGUID && !user?.lyricsUserId) {
      navigate("/update-profile");
      errorAlert({
        icon: "warning",
        title: "Please Complete Your Profile!",
        text: "Complete your profile first to get the pharmacy service",
      });
      return;
    }
    try {
      dispatch(setIsExternalApiCalling(true));
      const data = {
        MemberGUID: user?.PrimaryMemberGUID,
        MemberID: user?._id,
        MemberCode: user?.plan === "Trial" ? "OPT125" : "OPT800",
      };
      const response = await rxvaletLogin(data).unwrap();
      window.location.href = response.Result.MemberLoginURL;
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setTimeout(() => dispatch(setIsExternalApiCalling(false)), 4000);
    }
  };

  const mainLinks = [
    { label: "Home", path: "/", icon: <House /> },
    { path: "/update-profile", label: "Manage Profile", icon: <User /> },
    { label: "Clinic", icon: <School />, action: handleClinick },
    { label: "Pharmacy", icon: <Hospital />, action: handlePharmacy },
  ];

  // Filter the links to include only those for Admin
  const adminOnlyLinks = [
    { path: "/pricing-plans", label: "Plans", icon: <ShoppingBag /> },
  ];

  const visibleLinks =
    user?.role === "Admin" ? [...mainLinks, ...adminOnlyLinks] : mainLinks;

  return (
    <nav className="lg:mx-auto mx-4 grid  justify-items-center lg:max-w-screen-xl">
      <div className="lg:hidden">
        <div className="flex items-center justify-center gap-24 fixed left-0 right-0  py-4 z-50 bg-white lg:hidden">
          <div className="w-24 object-cover">
            <img src={logo} alt="Logo" className="" />
          </div>
          <div
            className="relative cursor-pointer items-center justify-center gap-2 flex"
            onClick={toggleProfileCard}
            ref={profileRef}
          >
            <div className="text-right">
              <p className="font-semibold text-[14px] lg:text-md">
                {user?.firstName} {user?.lastName}
              </p>
              {/* <p className="text-[12px] lg:text-md">{user?.email}</p> */}
            </div>

            {user?.image ? (
            <img
              src={user?.image || "https://i.ibb.co/5nPD3Qg/user?.jpg"}
              alt="Profile"
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <CircleUserRound size={35} color="#787878" />
          )}
            {isVisible && (
              <div
                ref={profileCardRef}
                className={`absolute z-50 left-[0%] lg:left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${
                  isAnimating ? "top-16 opacity-100" : "-top-96 opacity-0"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <ProfileCard setIsVisible={setIsVisible} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-white z-50 fixed bottom-0 left-0 right-0 lg:relative lg:justify-between lg:gap-48 items-center py-4 lg:mt-6">
        <Link to="/">
          <div className="hidden lg:inline">
            <img src={logo} alt="Logo" className="h-12" />
          </div>
        </Link>
        <ul className="flex justify-center items-center gap-9 lg:gap-12">
          {visibleLinks.map((link) => (
            <NavLinks key={link.label} link={link} action={link.action} />
          ))}
          <Dropdown />
        </ul>
        <div
          className="relative cursor-pointer items-center justify-center gap-3 hidden lg:flex"
          onClick={toggleProfileCard}
          ref={profileRef}
        >
          <div className="text-right">
            <p className="font-semibold capitalize">
              {user?.firstName} {user?.lastName}
            </p>
            {/* <p className="text-[10px]">{user?.email}</p> */}
          </div>
          {user?.image ? (
            <img
              src={user?.image || "https://i.ibb.co/5nPD3Qg/user?.jpg"}
              alt="Profile"
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <CircleUserRound size={40} color="#787878" />

          )}
          {isVisible && (
            <div
              ref={profileCardRef}
              className={`absolute  z-50 right-0 transform transition-all duration-500 ease-in-out ${
                isAnimating ? "lg:top-16 opacity-100" : "lg:-top-96 opacity-0"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <ProfileCard setIsVisible={setIsVisible} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
