import React from 'react'
import img from "../../../assets/Frame 1413374532.png";
import { Link, useNavigate } from 'react-router-dom';

const Supplement = () => {
    const navigate = useNavigate()
    return (
        <Link to="https://nbxwellness.com/store/optimalmd/index" target="_blank" className="bg-[#F7F9FF] border hover:shadow-2xl hover:bg-[#e3efef5e] hover:scale-105 transition-transform cursor-pointer gap-2 border-[#E2E3DD] grid lg:gap-0 text-center rounded-md lg:rounded-3xl  p-3 lg:p-[0px] lg:py-4  justify-items-center  items-center shadow-md w-full max-w-xl">
            {/* User Icon */}
            <div className="  rounded-full  lg:h-14 lg:w-14 w-[46px] h-[46px]  flex lg:flex xl:hidded items-center justify-center ">
                <img src={img} alt="" />

            </div>
            <div className=' space-y-3 text-center'>
                <h2 className='text-2xl mt- font-semibold text-[#394570]'>Supplements & More</h2>
                <p className='text-[#394570] px-2 text-[14px] font- my-'>Jump-start your wellness journey <br className='hidden lg:inline' />  with exclusive savings on quality supplements.</p>
            </div>
        </Link>
    )
}

export default Supplement