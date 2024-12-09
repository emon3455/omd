import React from 'react'
import icon3 from "../../../assets/rb_2744.png";
import { smoothScrollTo } from '../../../component/Scroll';

const HealthCard = () => {

    const handleScrollToBlog = () => {
        smoothScrollTo("blog");
      };

    return (
        <div onClick={handleScrollToBlog} className="bg-[#F7F9FF] hover:shadow-2xl hover:bg-[#e3efef5e] hover:scale-105 transition-transform cursor-pointer border border-[#E2E3DD] grid gap-2 lg:gap-0 text-center rounded-md lg:rounded-3xl p-2 lg:p-[0px] xl:p-[0px]  justify-items-center  items-center shadow-md w-full max-w-xl">
            {/* User Icon */}
            <div
                className="rounded-full 
        lg:w-14 lg:h-14 w-[46px] h-[46px] gap-3  flex items-center justify-center "
            >
                {/* <Hospital size={40} className="text-[#21005D] text-2xl" /> */}
                <img src={icon3} alt={icon3} />
            </div>
            <div className="my- p-2 space-y-3 text-center">
                <h2 className=" font-semibold text-[#394570] text-2xl">
                    Health Insights
                </h2>
                <p className="text-[#394570] font- my- text-[14px] ">
                    Discover a curated selection of health articles, tips,{" "}
                  and insights exclusive to
                    OptimalMD members here.
                </p>
            </div>

        </div>
    )
}

export default HealthCard