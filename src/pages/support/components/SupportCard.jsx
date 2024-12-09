import React from 'react'



const SupportCard = ({ title, description, icon, number }) => {
    const shadow = {
        boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.2)'
     
    }
    return (
        <div  className='py-[43px] px-4 border hover:scale-105 transition-transform cursor-pointer shadow-xl bg-white  flex flex-col justify-center items-center text-center rounded-2xl shadow-custom'>
            <h4 className='text-2xl text-[#00192B] font-normal leading-8 capitalize'>{title}</h4>
            <p className='text-sm font-normal leading-4 pt-3 pb-9 '>{description}</p>
            <p className='text-base font-medium leading-4 flex  gap-[12px]'><span className='text-[18px] text-[#00836C]'>{icon}</span>{number}</p>
        </div>
    )
}

export default SupportCard