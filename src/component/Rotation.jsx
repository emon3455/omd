import { Plus } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const AnimatedSVG = ({images}) => {
    return (
        <>

            <div className="">
                <svg width="400" height="400" viewBox="-20 0 500 400" xmlns="http://www.w3.org/2000/svg">
                    <style>
                        {`
            .orbit {
              fill: none;
              stroke: #ccc;
              stroke-width: 2;
            }
            /* Define different animations with unique speeds */
            .circle1 {
              animation: rotate1 10s linear infinite;
              transform-origin: 200px 200px;
            }
            .circle2 {
              animation: rotate2 12s linear infinite;
              transform-origin: 200px 200px;
            }
            .circle3 {
              animation: rotate3 14s linear infinite;
              transform-origin: 200px 200px;
            }
            .circle4 {
              animation: rotate4 16s linear infinite;
              transform-origin: 200px 200px;
            }
            .circle5 {
              animation: rotate5 18s linear infinite;
              transform-origin: 200px 200px;
            }
            
            /* Keyframes for different rotation speeds */
            @keyframes rotate1 {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            @keyframes rotate2 {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            @keyframes rotate3 {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            @keyframes rotate4 {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            @keyframes rotate5 {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}
                    </style>


                    <circle cx="200" cy="200" r="100" className="orbit" />
                    <circle cx="200" cy="200" r="150" className="orbit" />
                    <circle cx="200" cy="200" r="200" className="orbit" />


                    <g>
                        <circle cx="200" cy="100" r="20" className="circle1" fill="url(#img1)" />
                        <circle cx="200" cy="50" r="20" className="circle2" fill="url(#img2)" />
                        <circle cx="200" cy="50" r="20" className="circle2" fill="url(#img6)" />
                        {/* <circle cx="200" cy="0" r="20" className="circle3" fill="url(#img3)" /> */}
                        <circle cx="200" cy="0" r="20" className="circle1" fill="url(#img7)" />
                        {/* <circle cx="200" cy="0" r="20" className="circle4" fill="url(#img5)" /> */}
                        <circle cx="200" cy="0" r="20" className="circle3" fill="url(#img4)" />
                        {/* <circle cx="200" cy="250" r="20" className="circle4" fill="url(#img8)"/>  */}
                        <circle cx="200" cy="300" r="20" className="circle5" fill="url(#img5)"/>
                    </g>


                    <defs>
                        <pattern id="img1" patternUnits="objectBoundingBox" width="1" height="1">
                            <image href={images.ringimage1} x="0" y="0" width="40" height="40" />
                        </pattern>
                        <pattern id="img2" patternUnits="objectBoundingBox" width="1" height="1">
                            <image href={images.ringimage2}  x="0" y="0" width="40" height="40" />
                        </pattern>
                        <pattern id="img3" patternUnits="objectBoundingBox" width="1" height="1">
                            <image href={images.ringimage3}  x="0" y="0" width="40" height="40" />
                        </pattern>
                        <pattern id="img5" patternUnits="objectBoundingBox" width="1" height="1">
                            <image href={images.ringimage4}  x="0" y="0" width="40" height="40" />
                        </pattern>
                        <pattern id="img6" patternUnits="objectBoundingBox" width="1" height="1">
                            <image href={images.ringimage5}  x="0" y="0" width="40" height="40" />
                        </pattern>
                        <pattern id="img7" patternUnits="objectBoundingBox" width="1" height="1">
                            <image href={images.ringimage6}  x="0" y="0" width="40" height="40" />
                        </pattern>
                        <pattern id="img8" patternUnits="objectBoundingBox" width="1" height="1">
                            <image href={images.ringimage7}  x="0" y="0" width="40" height="40" />
                        </pattern>
                        <pattern id="img" patternUnits="objectBoundingBox" width="1" height="1">
                            <image href={images.ringimage8}  x="0" y="0" width="40" height="40" />
                        </pattern>

                    </defs>


                    <foreignObject x="100" y="100" width="200" height="200">
                        <div className="flex justify-center items-center h-full">
                            <Link to="/update-profile" className="cursor-pointer group p-2 border rounded-full border-slate-200/50 bg-primary hover:bg-primary hover:border-slate-200 transition-all">
                                <div className="p-3 border border-white rounded-full shadow-xl group-hover:shadow-2xl group-active:shadow-md transition-all ">
                                    <div className=" border-white rounded-full border-2">
                                        <div className="bg-primary from-slate-100 to-white border border-slate-200/75 group-hover:border-slate-300/50 group-active:border-slate-300/75 transition-all h-16 w-16 flex items-center justify-center rounded-full">
                                            <span className="material-symbols-outlined text-white group-hover:text-white transition-all group-active:text-primary"><Plus size={40} /></span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </foreignObject>
                </svg>
            </div>
        </>
    );
};

export default AnimatedSVG;
