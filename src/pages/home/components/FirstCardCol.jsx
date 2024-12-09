import {} from "react";

import image from "../../../assets/home/doctor.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsExternalApiCalling } from "../../../redux/features/rxvalet/rxvaletSlice";
import { useGetLyricLoginMutation } from "../../../redux/features/getLyric/getLyricApiSlice";
import { errorAlert } from "../../../utils/allertFunction";
const ClinicPortal = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.userSlice.user);
  const [getLyricLogin] = useGetLyricLoginMutation();
  const dispatch = useDispatch();

  const handleClinick = async () => {
    if (user.status === "Canceled") {
      errorAlert({
        title: "Your Account Is Deactive!",
        text: "Please activate your account to get Clinic services",
        icon: "warning",
        bg:"bg-primary"
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
      window.location.href = response?.redirectURL;
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setTimeout(() => dispatch(setIsExternalApiCalling(false)), 4000);
    }
  };

  return (
    <div
      className=" hover:shadow-2xl bg-[#F7F9FF] pb-3 space-y-2  hover:bg-[#e3efef5e] hover:scale-105 transition-transform cursor-pointer border gap-2 border-[#E2E3DD] flex  flex-col justify-between lg:gap-0 text-center rounded-md lg:rounded-3xl   shadow-md w-full max-w-xl"
      onClick={handleClinick}
    >
      {/* User Icon */}
      <img
        className="w-full rounded-t-xl max-h-40 object-cover object-top lg:max-h-60"
        src={image}
        alt={image}
      />
      <div className="text-center space-y-2 lg:text-center">
        <h2 className=" lg:text-2xl mt- font-semibold text-[#394570]">
          Clinic Portal
        </h2>
        <p className="text-[#394570] px-4  text-[14px] font- my-">
          Connect in minutes to a doctor, access your{" "}
          <br className="hidden lg:inline" /> medical records.
        </p>
        <button className="transition-all duration-500 border-2 border-primary hover:bg-primary mt-2 text-primary hover:text-white  font-semibold shadow-lg rounded-full  px-8 py-2 ">
          Get started
        </button>
      </div>
    </div>
  );
};

export default ClinicPortal;
