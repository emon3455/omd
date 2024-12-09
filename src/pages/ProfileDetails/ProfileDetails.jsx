import { Mails, MapPinned, ShieldCheck } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import capitalizeWords from "../../utils/CapitalizeText";

const ProfileDetails = () => {
  //   const [openSettings, setOpenSettings] = useState(false);

  //   const toggleSettings = () => setOpenSettings(!openSettings);
  //   const closeSettings = () => setOpenSettings(false);
  const user = useSelector((state) => state.userSlice.user);
  console.log(user)
  return (
    <div className="bg-white  pb-8 relative">

      {/* Profile Image and Details */}
      <div className="w-full h-[250px]">
        <img
          src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
          alt="Background"
          className="w-full h-full "
        />
      </div>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-start -mt-32">
          <img
            src={user?.image || "https://i.ibb.co/5nPD3Qg/user.jpg"}
            alt="Profile"
            className="w-52 border-4 border-green-300 rounded-lg"
          />
          <div className="flex items-center font-semibold space-x-2 my-2">
            <p className="text-2xl">{capitalizeWords(`${user?.firstName} ${user?.lastName}`)}</p>
            <span className="text-primary rounded-full p-1" title="Verified">
              <ShieldCheck />
            </span>
          </div>
          <p className="text-gray-700 font-semibold items-center flex gap-2"><Mails size={20} color="#787878" /> {user?.email}</p>
          <p className="text-sm text-gray-500 items-center flex gap-2 my-2"><MapPinned size={20} color="#787878" /> {user?.shipingAddress1}</p>
        </div>
        {/* Action Buttons */}
        <div className="flex-1 bg-white   p-8">
          <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
          <ul className="mt-2 text-gray-700">
            <li className="flex border-y py-2">
              <span className="font-bold w-24">Full name:</span>
              <span className="text-gray-700">Amanda S. Ross</span>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-24">Birthday:</span>
              <span className="text-gray-700">24 Jul, 1991</span>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-24">Joined:</span>
              <span className="text-gray-700">10 Jan 2022 (25 days ago)</span>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-24">Mobile:</span>
              <span className="text-gray-700">(123) 123-1234</span>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-24">Email:</span>
              <span className="text-gray-700">amandaross@example.com</span>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-24">Location:</span>
              <span className="text-gray-700">New York, US</span>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-24">Languages:</span>
              <span className="text-gray-700">English, Spanish</span>
            </li>
            <li className="flex items-center border-b py-2 space-x-2">
              <span className="font-bold w-24">Elsewhere:</span>
              <a href="#" title="Facebook">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 506.86 506.86"
                >
                  <defs>
                    <style>{`.cls-1{fill:#1877f2;}.cls-2{fill:#fff;}`}</style>
                  </defs>
                  <path
                    className="cls-1"
                    d="M506.86,253.43C506.86,113.46,393.39,0,253.43,0S0,113.46,0,253.43C0,379.92,92.68,484.77,213.83,503.78V326.69H149.48V253.43h64.35V197.6c0-63.52,37.84-98.6,95.72-98.6,27.73,0,56.73,5,56.73,5v62.36H334.33c-31.49,0-41.3,19.54-41.3,39.58v47.54h70.28l-11.23,73.26H293V503.78C414.18,484.77,506.86,379.92,506.86,253.43Z"
                  ></path>
                  <path
                    className="cls-2"
                    d="M352.08,326.69l11.23-73.26H293V205.89c0-20,9.81-39.58,41.3-39.58h31.95V104s-29-5-56.73-5c-57.88,0-95.72,35.08-95.72,98.6v55.83H149.48v73.26h64.35V503.78a256.11,256.11,0,0,0,79.2,0V326.69Z"
                  ></path>
                </svg>
              </a>
              <a href="#" title="Twitter">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 333333 333333"
                >
                  <path
                    d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm90493 110539c-6654 2976-13822 4953-21307 5835 7669-4593 13533-11870 16333-20535-7168 4239-15133 7348-23574 9011-6787-7211-16426-11694-27105-11694-20504 0-37104 16610-37104 37101 0 2893 320 5722 949 8450-30852-1564-58204-16333-76513-38806-3285 5666-5022 12109-5022 18661v4c0 12866 6532 24246 16500 30882-6083-180-11804-1876-16828-4626v464c0 17993 12789 33007 29783 36400-3113 845-6400 1313-9786 1313-2398 0-4709-247-7007-665 4746 14736 18448 25478 34673 25791-12722 9967-28700 15902-46120 15902-3006 0-5935-184-8860-534 16466 10565 35972 16684 56928 16684 68271 0 105636-56577 105636-105632 0-1630-36-3209-104-4806 7251-5187 13538-11733 18514-19185l17-17-3 2z"
                    fill="#1da1f2"
                  ></path>
                </svg>
              </a>
              <a href="#" title="LinkedIn">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 333333 333333"
                >
                  <path
                    d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm-18220 138885h28897v14814l418 1c4024-7220 13865-14814 28538-14814 30514-1 36157 18989 36157 43691v50320l-30136 1v-44607c0-10634-221-24322-15670-24322-15691 0-18096 11575-18096 23548v45382h-30109v-94013zm-20892-26114c0 8650-7020 15670-15670 15670s-15672-7020-15672-15670 7022-15670 15672-15670 15670 7020 15670 15670zm-31342 26114h31342v94013H96213v-94013z"
                    fill="#0077b5"
                  ></path>
                </svg>
              </a>
              <a href="#" title="Github">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.693 11.157-34.775 20.27-42.782-71.089-8.057-145.784-35.546-145.784-158.252 0-34.944 12.496-63.495 32.953-85.927-3.308-8.076-14.278-40.581 3.117-84.676 0 0 26.877-8.649 88.029 32.819 25.547-7.11 52.95-10.665 80.149-10.796 27.194.13 54.607 3.686 80.156 10.796 61.125-41.468 87.986-32.819 87.986-32.819 17.424 44.095 6.447 76.6 3.139 84.676 20.457 22.432 32.881 50.982 32.881 85.927 0 122.973-74.808 150.067-145.989 158.004 11.423 9.866 21.671 29.318 21.671 59.072 0 42.663-.384 77.02-.384 87.508 0 8.57 5.832 18.496 21.946 15.394 127.068-42.418 218.602-162.19 218.602-303.526 0-176.717-143.293-320.002-320.007-320.002z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>


    </div>
  );
};

export default ProfileDetails;
