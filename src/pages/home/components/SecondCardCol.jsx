import {} from "react";
import pharmecy from "../../../assets/home/pharmacy.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setIsExternalApiCalling } from "../../../redux/features/rxvalet/rxvaletSlice";
import { useRxvaletLoginMutation } from "../../../redux/features/rxvalet/rxvaletApiSlice";
import { errorAlert } from "../../../utils/allertFunction";
import { useNavigate } from "react-router-dom";

const Pharmacy = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);

  // Use the login mutation hook from rxvaletApiSlice
  const [rxvaletLogin] = useRxvaletLoginMutation();
  const navigate = useNavigate();

  const handlePharmacy = async () => {
    if (user.status === "Canceled") {
      errorAlert({
        title: "Your Account Is Deactive!",
        text: "Please activate your account to get Pharmacy service!",
        icon: "warning",
        bg:"bg-primary"
      });
      navigate("/upgrade-plan");
      return;
    }
    if (!user?.PrimaryMemberGUID && !user?.lyricsUserId) {
      navigate("/update-profile");
      errorAlert({
        icon:"warning",
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
      window.location.href = response?.Result?.MemberLoginURL;
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setTimeout(() => dispatch(setIsExternalApiCalling(false)), 4000);
    }
  };

  return (

    <div
      className="bg-[#F7F9FF] hover:shadow-2xl hover:bg-[#e3efef5e] hover:scale-105 transition-transform cursor-pointer border  border-[#E2E3DD]  lg:grid gap-2 lg:gap-0 text-center  rounded-md lg:rounded-3xl pb-[10px]  justify-items-center  items-center shadow-md w-full max-w-xl"
      onClick={handlePharmacy}
    >
      {/* User Icon */}
        <img className="rounded-t-xl w-full max-h-60 object-cover" src={pharmecy} alt="" />
      <div className=" text-center space-y-2 lg:text-center">
        <h2 className="text-2xl mt- font-semibold text-[#394570]">
          Pharmacy
        </h2>
        <p className="text-[#394570] px-4  text-[14px] font- my-">
          Get access to free medication at your local{" "}
          <br className="hidden lg:inline" /> pharmacy or delivered right to
          your home.
        </p>
        <button className="transition-all duration-500 border-2  border-primary hover:bg-primary mt-2 text-primary hover:text-white  font-semibold shadow-lg rounded-full  px-8 py-2 " >Get started</button>
      </div>
  
    </div>



  );
};

export default Pharmacy;
