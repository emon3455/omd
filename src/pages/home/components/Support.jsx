import { Headset } from 'lucide-react'
import { } from 'react'
import { Link } from 'react-router-dom'

const Support = () => {
    return (

        <Link to="/support">

            <div className="bg-[#F7F9FF] hover:shadow-2xl hover:bg-[#e3efef5e] hover:scale-105 transition-transform cursor-pointer border py-6 px-2 border-[#E2E3DD]  grid gap-2 lg:gap-0 text-center rounded-md lg:rounded-3xl   justify-items-center  items-center shadow-md w-full max-w-xl">
                {/* User Icon */}

                <div className="space-y-4 text-center">
                    <h2 className="text-2xl mt- font-semibold text-[#394570]">
                        Support
                    </h2>
                    <p className="text-[#394570] text-[14px] font- my-">
                        Questions about your membership, medical care,{" "}
                        or pharmacy benefits? We're here
                        to help!
                    </p>
                </div>

                <button className="transition-all duration-500 border-2 border-primary hover:bg-primary mt-2 text-primary hover:text-white   font-semibold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 lg:gap-3 text-[14px]">
                    <Headset />
                    Contact Support
                </button>
            </div>

        </Link>
    )
}

export default Support