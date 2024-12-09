import {} from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 md:p-6 lg:p-16 gap-4">
      <Link to="/my-profile">
        <div className="shadow-[0px_0px_3px_1px_rgba(0,0,0,0.15)] p-2 md:p-3 lg:p-5 rounded-md cursor-pointer hover:bg-gray-100 transition">
          <h1 className="text-center mb-6 text-xl font-medium">My Profile</h1>
          <p className="text-center">
            Activate or manage your family&apos;s healthcare benefits here.
          </p>
        </div>
      </Link>
      <Link to="/pharmacy">
        <div className="shadow-[0px_0px_3px_1px_rgba(0,0,0,0.15)] p-2 md:p-3 lg:p-5 rounded-md cursor-pointer hover:bg-gray-100 transition">
          <h1 className="text-center mb-6 text-xl font-medium">Pharmacy</h1>
          <p className="text-center">
            Activate or manage your family&apos;s healthcare benefits here.
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProfilePage;
