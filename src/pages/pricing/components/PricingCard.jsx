import React from "react";

const PricingCard = ({ data }) => {
    return (

        <div className={`max-w-sm w-full space-y-10 border border-[#D2D2D2] rounded-lg shadow-lg ${data.active ? "bg-[#081B31] " : "bg-green-50 "} p-6`}>
            <h2 className="text-2xl font-semibold "><span className="text-[#00C85C]">{data.title}</span></h2>
            <div className="mt-4 space-y-4">
                <p className={`text-5xl font-semibold  ${data.active ? "text-white " : "text-gray-800 "}`}>
                    ${data.price} <span className={`text-lg font-medium  ${data.active ? "text-white " : "text-gray-500 "}`}>/ {data.duration}</span>
                </p>
                <p className={`mt-2 text-sm  ${data.active ? "text-white " : "text-gray-600"}`}>
                    {data.des}
                </p>
            </div>
            <div className={`mt-6 rounded-lg  p-4 ${data.active ? " " : "bg-white"}`}>
                <h3 className={`text-lg font-semibold  ${data.active ? "text-white " : "text-gray-800"}`}>FEATURES</h3>
                <ul className="mt-4 space-y-2 ">
                    {data.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                            <span className={`mt-1 ${data.active ? "text-white " : "text-green-600"}`}>
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={4}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </span>
                            <span className={` ${data.active ? "text-white " : "text-gray-700"}`}>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <button className={`mt-6 w-full py-3 px-6 rounded-md  ${data.active ? "bg-[#00FF75] text-[#081B31] hover:bg-primary " : "bg-[#2378E0] text-white hover:bg-blue-700 "} font-medium transition`}>
                Buy Now
            </button>
        </div>

    );
};

export default PricingCard;
