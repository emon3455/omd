import React from 'react'
import AnimatedSVG from '../../../component/Rotation'

const RoundOrbitcard = ({images}) => {
    return (
        <div className="bg-[#F7F9FF] ml-2 lg:ml-0  p-4 hover:shadow-2xl hover:bg-[#e3efef5e] hover:scale-105 transition-transform cursor-pointer  overflow-hidden grid gap- rounded-lg lg:rounded-3xl  border border-[#E2E3DD]    shadow-md lg:w-full max-w-xl">
            <div className="lg:flex justify-center "> 
                <div className="lg:space-y-4">
                    <h2 className="text-2xl font-semibold text-[#394570]">
                        We Cover Your Health
                    </h2>
                    <p className=" text-[14px] ">
                        Add more dependents and recommend a friend to
                        experience premium services from OptimalMD.
                    </p>
                </div>

                <div className="max-h-40 scale-75 -mr-48 mt-[-40px] lg:mt-0 mb-[60px] lg:mb-[80px]">
                    <AnimatedSVG images={images} />
                </div>
            </div>
        </div>
    )
}

export default RoundOrbitcard