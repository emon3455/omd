import React from 'react'
import banner from "../../../assets/photo-1657028310103-f53dd49a856a.avif"

const HomeBanner = () => {
    const bg = {
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(${banner})`,
        backgroundSize: "cover",          // Make the background cover the container
        backgroundPosition: "center",     // Center the image
        backgroundRepeat: "no-repeat"     // Prevent the image from repeating
    };
    


    return (
        <>
            <div className='h-40 lg:h-80 justify-self-center rounded-lg  w-full p-10  flex items-end text-white' style={bg}>

                <p className='text-2xl lg:text-4xl font-semibold uppercase'>   Health Insights</p>
            </div>
        </>
    )
}

export default HomeBanner