import React from 'react'
import PricingCard from './components/PricingCard'

const Pricing = () => {


    const pricingData = [

        {
            id: 1,
            active: false,
            title: "Access",
            price: 47,
            tag: "",
            duration: "Session",
            des: "$49 Primary + $20 Spouse or $0 Children(And $10 for each parent)",
            features: [
                "Plan Covers the Entire Family",
                "Plan Covers the Entire Family",
                "FREE Annual Bloodwork through Quest (In Person)",
                "Behavioral Health & Talk Therapy Included",
            ],
        },
        {
            id: 2,
            active: true,
            title: "Access Plus",
            price: 97,
            tag: "Popular",
            duration: "Month",
            des: "$97 Primary + $20 Spouse + $10 Child ( $10 for each parent)",
            features: [
                "Plan Covers the Entire Family",
                "Unlimited Urgent Care Visits (Virtual)",
                "FREE Annual Bloodwork through Quest (In Person)",
                "Behavioral Health & Talk Therapy Included",
                "OptimalRx Acute Program",
                "Lab Test (Male/Female Metabolic Panel) ($0 Cost)",
            ],
        },
        {
            id: 3,
            active: false,
            title: "Premiere",
            price: 127,
            tag: "Popular",
            duration: "Month",
            des: "$127 Primary + $20 Spouse + $10 Child ( $10 for each parent)",
            features: [
                "Includes Access plus Plan",
                "Neurodiversity",
                "Precision Medicine - Diagnostics and Care Plan",
                "1 Hour Evaluation - (with 'Lindsey' to establish plan)"
            ],
        },

    ]


    return (
        <>
            <div className='max-w-screen-xl items-center justify-center flex flex-col lg:flex-row p-6  gap-6 lg:gap-3 mb-10 mx-auto'>
                {
                    pricingData.map((data) => (
                        <PricingCard data={data} />
                    ))
                }
            </div>
        </>
    )
}

export default Pricing