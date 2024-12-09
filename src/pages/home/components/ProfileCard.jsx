import { ArrowUpRight, User } from 'lucide-react';
import {} from 'react'
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
    const navigate = useNavigate();
    const handleUpdateProfile = () => {
        navigate("/update-profile");
    };

    return (
        <div
            className="bg-[#F7F9FF] border hover:shadow-2xl hover:bg-[#e3efef5e] hover:scale-105 transition-transform cursor-pointer border-[#E2E3DD] p-2 rounded-md  lg:rounded-3xl py-4 lg:gap-[80px]  flex justify-center items-center  shadow-md w-full justify-self-center  lg:max-w-sm"
            onClick={handleUpdateProfile}
        >
            {/* User Icon */}
            <div className="rounded-full border border-primary bg-white lg:w-14 lg:h-14 w-[56px] p-4 h-[56px] flex items-center justify-center mr-4">
                <User size={32} className="text-primary  text-2xl" />

            </div>
            {/* Button with Text and Arrow */}
            <button className="transition-all duration-500 border-2 border-primary hover:bg-primary mt-2 text-primary hover:text-white  font-semibold items-center flex   bg-white py-[6px] px-[20px] gap-[10px] rounded-full shadow-lg   transform active:scale-95 ">
                <span className="font-medium">Manage Profile</span>
                <span className="bg-primary ml-3 p-1 border-2 border-white rounded-full">
                    <ArrowUpRight className="text-white " />
                </span>
            </button>
        </div>
    )
}

export default ProfileCard