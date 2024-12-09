import React, { useState } from "react";
import profile from "../../../assets/Frame 1597879865.png";
import CircularProgress from "../../../component/CircularProgress";
import AnimatedSVG from "../../../component/Rotation";

import { ArrowUpRight, CircleUserRound, SquareUserRound } from "lucide-react";
import { useSelector } from "react-redux";
import { calculateCompletionPercentage } from "../../profile/calculateCompletionPercentage";
import capitalizeWords from "../../../utils/CapitalizeText";

const ThirdCardColumn = ({ images }) => {
  // const images = { ringimage1, ringimage2, ringimage3 }
  const user = useSelector((state) => state.userSlice.user);
  console.log(user);
  const [userInfo, setUserInfo] = useState({
    firstName: user?.firstName,
    lastName: user?.email,
    image: user?.image,
    sex: user?.sex,
    dob: user?.dob,
    primaryPhone: { number: user?.phone },
    secondaryPhone: { number: user?.sPhone },

    addresses: [
      {
        primaryHomeAddress: user?.shipingAddress1 || "",
        secondaryHomeAddress: user?.shipingAddress2 || "",
        state: { value: user?.state, label: user?.state },
        city: { value: user?.city, label: user?.city },
        zipcode: user?.shipingZip || "",
        primaryAddress: true,
      },
    ],
  });

  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "sex",
    "dob",
    "phone",
    "shipingAddress1",
    "shipingCity",
    "shipingState",
    "shipingZip",
  ];
  const completionPercentage = calculateCompletionPercentage(
    user,
    requiredFields
  );

  return (
    <div className="bg-[#F7F9FF] grid gap- hover:shadow-2xl hover:bg-[#e3efef5e] hover:scale-105 transition-transform cursor-pointer  rounded-3xl p-2 lg:pl-4 lg:pt-2 pl-4  lg:pr-[10px] border border-[#E2E3DD]   items-center shadow-md w-full max-w-xl">
      <div className="flex justify-between  ">
        <div className="grid  gap-4">
          <div>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#394570]">Welcome</h2>
            <p className="text-[#394570] font-semibold ">
            {capitalizeWords( `${user?.firstName}  ${user?.lastName}`)}
            </p>
          </div>
          <div>
            <CircularProgress
              percentage={parseInt(completionPercentage) || 60}
            />
          </div>
        </div>
        <div className="">
        {
              user?.image ? 
                <img
                className="h-28 w-28 lg:h-48 lg:w-48 rounded-xl border-2 object-cover"
                // src={profile}
                src={user?.image}
                alt=""
              />
              :    <SquareUserRound size={150} color="#787878" strokeWidth={1} />
              

             }
         
        </div>
      </div>
      <div className="flex text-[14px] px-4 text-[#3C4A3D] mb-2 mt-4 justify-between items-end">
        <p className="">
          <p>Member ID </p>
          <span className="text-[12px]  font-bold">
            OMD-{user?.omdId}
          </span>
        </p>
        <p className=" gap-1 flex text-black items-end">
          <span className="text-md">Current Plan</span> <br />
          <span className="text-[16px] font-bold text-primary">
            {user?.plan == "Trial" ? "TRIAL" : "ACCESS PLUS"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ThirdCardColumn;
