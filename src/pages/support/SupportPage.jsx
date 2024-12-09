import React from 'react'
import SupportCard from './components/SupportCard'
import { Mails, Phone } from 'lucide-react'
import img from "../../assets/undraw_instant_support_re_s7un 1.svg"

const SupportPage = () => {

    return (
        <div className=' pt-[36px] pb-6 bg-white'>
            <div className='max-w-screen-xl px-10 mx-auto'>
                <div className='text-center'>
                    <h3 className='text-[32px] font-regular font-medium'>Support</h3>
                    <div className='flex flex-col lg:grid grid-cols-3  mt-[64px] gap-6'>
                        <SupportCard title="Care Cordination" description="Navigate your healthcare seamlessly.
           Call us for personalized coordination of your care journey." icon={<Phone />} number='(877) 309-0297' />
                        <SupportCard title="Pharmacy Support" description="For assistance with prescriptions and pharmacy inquiries, our experts are just a call away" icon={<Phone />} number='(855) 798-2538' />
                        <SupportCard title="Billing & Technical Support" description="Email us and we will respond within one business day." icon={<Mails />} number='support@optimalmd.com' />
                    </div>
                    <div className=' flex justify-center'>
                        <img className='lg:max-w-xl' src={img} alt="Not Found" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SupportPage