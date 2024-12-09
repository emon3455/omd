import { Share2 } from "lucide-react";
import React from "react";

const BlogCards = ({ title, bgimg, date }) => {
  const bg = {
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),url(${bgimg})`,
    backgroundSize: "cover", // Make the background cover the container
    backgroundPosition: "center", // Center the image
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <div
        className="h-72 max-w-sm lg:max-w-md  rounded-md px-6 lg:px-6  py-6  grid  justify-between  "
        style={bg}
      >
        <div className="flex items-start justify-between">
          <span className="bg-primary justify-self-start px-3 text-white font-semibold py-1 rounded-full">{date}</span>
          <Share2
            size={35}
            className="[text-shadow:_0_4px_8px_#505054] rounded-full p-2 bg-[#0000003f] cursor-pointer justify-self-end"
            color="white"
          />
        </div>
        <div className="flex flex-col gap-3 justify-end items-start">
          <p className="text-white text-md  lg:text-xl self-end alignt  font-semibold ">
            <span style={{ maxWidth: "300px" }}>{title}</span>
          </p>
          <button className="border text-white border-white px-4 py-1 rounded-full">Read more</button>
        </div>
      </div>
    </>
  );
};

export default BlogCards;
