import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Modal from "../../component/modals/Modal";
import { Link, useNavigate } from "react-router-dom";
import CapsuleAnimation from "../../component/capsuleLoading/CapsuleAnimation";
import bgimg from "../../assets/19146.jpg"
import Checkbox from "../../component/inputs/Checkbox";
import { errorAlert, successAlert } from "../../utils/allertFunction";
import { baseURL } from "../../constant/baseURL";

const RegisterPage = () => {
    const [step, setStep] = useState(1);
    const [value, setValue] = useState({ startDate: null, endDate: null });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [loading, setLoading] = useState(false)
    const naviget = useNavigate()
    const [formData, setFormData] = useState({
        fName: "",
        lName: "",
        email: "",
        phoneNumber: "",
        startDate: null,
        cardNumber: "",
        expiryDate: "",
        cvc: "",
        termsAccepted: false,
        selectedPlan: "",
    });
    const [formErrors, setFormErrors] = useState({});

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update state and format specific inputs
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validation-specific formatting
        if (name === "cardNumber") {
            const formattedValue = value.replace(/\D/g, "").slice(0, 16);
            setFormData((prev) => ({ ...prev, cardNumber: formattedValue }));
        } else if (name === "cvc") {
            const formattedValue = value.replace(/\D/g, "").slice(0, 3);
            setFormData((prev) => ({ ...prev, cvc: formattedValue }));
        }
        else if (name === "phoneNumber") {
            const formattedValue = value.replace(/\D/g, "").slice(0, 10);
            setFormData((prev) => ({ ...prev, cvc: formattedValue }));


    }

    // Clear error for the field
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
};

// Handle expiry date input change
const handleExpiryChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

    // If the user presses backspace and the input is empty, reset the expiry date field
    if (e.key === "Backspace" && inputValue.length === 0) {
        setFormData((prev) => ({ ...prev, expiryDate: "" }));
        return;
    }

    // Limit to 4 digits max (MMYY)
    inputValue = inputValue.slice(0, 4);

    // Restrict the first two digits (MM) to a maximum of "12"
    if (inputValue.length >= 2) {
        const month = inputValue.slice(0, 2);
        if (parseInt(month) > 12) {
            inputValue = "12" + inputValue.slice(2); // Limit month part to 12
        }
    }

    let formattedValue = inputValue;

    // Format as MM/YY
    if (formattedValue.length >= 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
    }

    setFormData((prev) => ({ ...prev, expiryDate: formattedValue }));
    setFormErrors((prev) => ({ ...prev, expiryDate: "" }));
};



// Handle date selection
const handleDateChange = (newValue) => {
    setValue(newValue);
    if (newValue.startDate) {
        setFormData((prev) => ({
            ...prev,
            startDate: newValue.startDate,
        }));
        setFormErrors((prev) => ({ ...prev, startDate: "" }));
    }
};

// Validate email format
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validateUSPhoneNumber = (phoneNumber) => {
    const re = /^(?:\+1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
    return re.test(String(phoneNumber).trim());
};



// Proceed to the next step
const handleNext = () => {
    let errors = {};

    if (!formData.fName) errors.fName = "First name is required.";
    if (!formData.lName) errors.lName = "Last name is required.";
    if (!formData.email || !validateEmail(formData.email)) {
        errors.email = "A valid email is required.";
    }
    if (!formData.phoneNumber || !validateUSPhoneNumber(formData.phoneNumber)) errors.phoneNumber = "A valid phone number with 10 digits is required.";
    if (!formData.startDate) errors.startDate = "Start date is required.";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
        setStep(2);
    }
};

// Submit the form
const handleSubmit = async () => {
    let errors = {};

    if (!formData.selectedPlan) errors.selectedPlan = "Please select a plan.";
    if (!formData.cardNumber || formData.cardNumber.length !== 16) {
        errors.cardNumber = "Card number must be 16 digits.";
    }
    if (!formData.expiryDate || formData.expiryDate.length !== 5) {
        errors.expiryDate = "Expiry date must be in MM/YY format.";
    }
    if (!formData.cvc || formData.cvc.length !== 3) {
        errors.cvc = "CVC must be 3 digits.";
    }
    if (!formData.termsAccepted) {
        errors.termsAccepted = "You must accept the terms and conditions.";
    }

    setFormErrors(errors);



    if (Object.keys(errors).length === 0) {
        setLoading(true)
        const apiUrl = `${baseURL}/api/auth/register`; // Replace with your actual API endpoint URL

        const data = {
            firstName: formData.fName,
            lastName: formData.lName,
            email: formData.email,
            phone: formData.phoneNumber,
            dob: formData.startDate,
            plan: formData.selectedPlan.charAt(0).toUpperCase() + formData.selectedPlan.slice(1).toLowerCase(),
            paymentOption: "card",
            cardNumber: formData.cardNumber,
            expiration: formData.expiryDate,
            cvc: formData.cvc
        };

        try {
            const response = await fetch(apiUrl, {
                method: "POST", // HTTP method
                headers: {
                    "Content-Type": "application/json", // Telling the server that we are sending JSON data
                },
                body: JSON.stringify(data), // Convert the JavaScript object to JSON string
            });




            const responseData = await response.json(); // Parse the JSON response from the server
            console.log("Data posted successfully:", responseData);
            if (!responseData.error) {
                setLoading(false)
                successAlert({
                    timer: 50000,
                    title: "Congratulations!",
                    text: "Your profile has been completed. Pleace check your email for temp password",
                });
                naviget("/login")
                // If response status is not OK (e.g., 404, 500, etc.)


            }
            else {
                setLoading(false)
                errorAlert({
                    title: "Opps! Registation faild ",
                    text: `${responseData.error || "Something went wrong please try again!"}`,
                });
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
            // Catch any errors, including network issues, invalid JSON, etc.
            errorAlert({
                title: "Opps! Registation faild ",
                text: error.message,
            });
            console.error("Error posting data:", error.message);
        }

        // console.log("Form submitted successfully:", formData);
        // alert("Form submitted successfully!");
    }
};

// Open modal

if (loading) {
    return (

        <div className="flex justify-center items-center">
            <CapsuleAnimation />
        </div>
    )
}



const openModal = (planType) => {
    if (planType === "trial") {
        setModalContent(
            `
                <h2 class="text-lg font-bold mb-2">10-Day Trial Plan</h2>
                <p>Give us a try! For only $10, unlock MANY of the benefits of our Access Plus Plan for 10 days!</p>
                <h3 class="font-bold mt-4">What's Included?</h3>
                <ul class="list-disc pl-5">
                    <li>Unlimited Primary and Urgent Care Virtual Doctor Visits - Available 24/7/365</li>
                    <li>125 Acute Care Prescriptions available at $0 copay.</li>
                    <li>Discount Rx Card for additional medications! Save on prescriptions at over 70k pharmacies.</li>
                    <li>"Message a Specialist": Over 13 specialists give expert answers to your health questions!</li>
                    <li>Access talk therapy, behavioral and mental health support at no additional cost.</li>
                    <li>Dermatologist consults included!</li>
                </ul>
                <p class="mt-4">⭐ To unlock even MORE value, check out our Access Plus membership below. ⬇️</p>
                <p class="mt-4 text-gray-600">
                    No long-term commitment required. Cancel the trial before Day 11 if you wish to discontinue service and end billing. 
                    For continuity of service on Day 11, your payment method on file will be charged $97 and your plan will be upgraded to 
                    the Access Plus plan and its additional benefits. See those benefits below.
                </p>

                `
        );
    } else if (planType === "plus") {
        setModalContent(
            `
                <h2 class="text-lg font-bold mb-2">Access Plus Monthly Membership</h2>
                <p>Get access to all benefits from Day 1! Your Access Plus monthly membership includes ALL of the services below:</p>
                <ul class="list-disc pl-5 mt-4">
                    <li>Unlimited Primary and Urgent Care Virtual Doctor Visits - Available 24/7/365</li>
                    <li>125 Acute Care Prescriptions available at $0 copay.</li>
                    <li>Discount Rx Card for additional medications! Save on prescriptions at over 70k pharmacies.</li>
                    <li>"Message a Specialist": Over 13 specialists give expert answers to your health questions!</li>
                    <li>Access talk therapy, behavioral and mental health support at no additional cost.</li>
                    <li>Dermatologist consults included!</li>
                    <li>Additional 1100+ of the most prescribed acute and routine medications for $0 extra.</li>
                    <li>Prescriptions can be filled at over 70k pharmacies nationwide.</li>
                    <li>Access to GLP-1 Weight Loss & Management programs - lowest pricing you can find!</li>
                    <li>Pre-negotiated & deeply discounted rates on labs, imaging, and other diagnostic testing!</li>
                </ul>
                <p class="mt-4 text-gray-600">
                    No long-term commitment required. Cancel anytime within the billing cycle to avoid being charged the $97 monthly membership fee.
                </p>
                `
        );
    }
    setIsModalOpen(true);
};

const steps = [
    { step: 1, stepTitle: "Member Information" },
    { step: 2, stepTitle: "Plan Selection & Payment" },
];

const progressWidth = (step / steps.length) * 100;

const bg = {
    backgroundImage: `url(${bgimg})`,
    backgroundSize: "cover", // Make the background cover the container
    backgroundPosition: "center", // Center the image
    backgroundRepeat: "no-repeat"

}

return (
    <div style={bg} className="min-h-screen flex items-center justify-center ">
        <div className="bg-white w-full max-w-sm lg:max-w-3xl border shadow-lg rounded-lg">
            {/* Tabs for navigation */}
            <div className="relative flex items-center mt-6 justify-between max-w-xs lg:max-w-lg mx-auto mb-8 md:mb-12 lg:mb-16">
                {/* Progress bar background */}
                <div className="absolute z-0 w-full h-1 bg-gray-300 top-1/2">
                    <div
                        className="h-full transition-all duration-300 ease-linear bg-primary"
                        style={{ width: `${progressWidth}%` }}
                    ></div>
                </div>

                {/* Circles for steps */}
                {steps.map((s, index) => (
                    <div
                        key={index}
                        onClick={() => setStep(1)}
                        className={`relative flex z-10 items-center justify-center font-bold w-10 h-10 rounded-full border-[3px]  transition-colors delay-300 hover:cursor-pointer ${step >= s.step ? "border-primary " : ""
                            } ${step === s.step ? "bg-primary text-white" : "bg-white"}`}
                    >
                        {s.step}
                        <div
                            className={`absolute top-full text-center mt-3 hidden lg:block text-nowrap transition font-medium ${step >= s.step ? "text-white px-3 py-1 bg-primary rounded-full" : ""
                                }`}
                        >
                            {s.stepTitle}
                        </div>
                    </div>
                ))}
            </div>

            {/* Step 1 */}
            {step === 1 && (
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Member Information</h2>
                    <form>
                        <div className="grid grid-cols-2 items-center  gap-4">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="fName"
                                    placeholder="First Name"
                                    value={formData.fName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:shadow-lg focus:shadow-green-200 outline-none border-gray-300"
                                />
                                {formErrors.fName && (
                                    <p className="text-red-500 text-sm">{formErrors.fName}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="lName"
                                    value={formData.lName}
                                    placeholder="Last Name"
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:shadow-lg focus:shadow-green-200 outline-none border-gray-300"
                                />
                                {formErrors.lName && (
                                    <p className="text-red-500 text-sm">{formErrors.lName}</p>
                                )}
                            </div>
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Email Address"
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:shadow-lg focus:shadow-green-200 outline-none border-gray-300"
                            />
                            {formErrors.email && (
                                <p className="text-red-500  text-sm">{formErrors.email}</p>
                            )}
                        </div>
                        <div className="mb-4 gap-3 items-start flex">
                            <div className="relative py-3 flex items-center justify-center gap-2 px-5 bg-white border-gray-300 border rounded-l-lg cursor-pointer w-fit max-h-[58px]  ">
                                <img
                                    src='https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg'
                                    alt="Flag of USA"
                                    className="object-cover w-6 h-4 rounded "
                                />
                                <p className="text-xs text-gray-500">+1</p>
                            </div>
                            <div className="w-full">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    placeholder="Phone Number"
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2  border rounded-md focus:ring-2 focus:ring-green-500 focus:shadow-lg focus:shadow-green-200 outline-none border-gray-300"
                                />
                                {formErrors.phoneNumber && (
                                    <p className="text-red-500 text-sm mt-2">{formErrors.phoneNumber}</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <Datepicker
                                useRange={false}
                                asSingle={true}
                                value={value}
                                displayFormat="MM/DD/YYYY"
                                onChange={handleDateChange}
                                inputClassName="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:shadow-lg focus:shadow-green-200 outline-none border-gray-300"
                            />
                            {formErrors.startDate && (
                                <p className="text-red-500 text-sm">{formErrors.startDate}</p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={handleNext}
                            className="w-full bg-primary font-semibold text-white py-2 rounded-md"
                        >
                            Next: Plan + Payment Details ➡
                        </button>
                    </form>
                </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-6 text-center">Choose Your Plan</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div
                            onClick={() => {
                                setFormData((prev) => ({ ...prev, selectedPlan: "trial" }));
                                openModal("trial");
                            }}
                            className={`cursor-pointer border-2 hover:border-primary rounded-lg p-4 text-center ${formData.selectedPlan === "trial"
                                ? "border-primary"
                                : "border-gray-300"
                                }`}
                        >
                            <h3 className="text-lg font-semibold">10-Day Trial</h3>
                            <p className="text-sm text-gray-600">
                                $10 setup fee with 10 day trial and $97 per month after the trial period
                            </p>
                        </div>
                        <div
                            onClick={() => {
                                setFormData((prev) => ({ ...prev, selectedPlan: "plus" }));
                                openModal("plus");
                            }}

                            className={`cursor-pointer border-2 hover:border-primary  rounded-lg p-2 text-center ${formData.selectedPlan === "plus"
                                ? "border-primary"
                                : "border-gray-300"
                                }`}
                        >
                            <h3 className="text-lg font-semibold">Access Plus Plan - <br />Monthly Membership</h3>
                            <p className="text-sm text-gray-600">
                                Full features, monthly billing $97 per month.
                            </p>
                        </div>
                    </div>
                    {formErrors.selectedPlan && (
                        <p className="text-red-500 text-center text-sm mt-2">{formErrors.selectedPlan}</p>
                    )}

                    <h2 className="text-xl font-bold mt-8 mb-6 text-center">
                        Payment Details
                    </h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            onChange={handleInputChange}
                            maxLength={16}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                        {formErrors.cardNumber && (
                            <p className="text-red-500 text-sm">{formErrors.cardNumber}</p>
                        )}
                    </div>
                    <div className="flex gap-4 mb-4">
                        <div className="w-1/2">
                            <input
                                type="text"
                                name="expiryDate"
                                placeholder="MM/YY"
                                onChange={handleExpiryChange}
                                value={formData.expiryDate}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                            {formErrors.expiryDate && (
                                <p className="text-red-500 text-sm">{formErrors.expiryDate}</p>
                            )}
                        </div>
                        <div className="w-1/2">
                            <input
                                type="text"
                                name="cvc"
                                placeholder="CVC"
                                onChange={handleInputChange}
                                maxLength={3}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                            {formErrors.cvc && (
                                <p className="text-red-500 text-sm">{formErrors.cvc}</p>
                            )}
                        </div>
                    </div>
                    <div className="mb-4">
                        <Checkbox label={<span>I agree to the <Link className="underline" to="https://optimalmd.com/terms-of-use">Terms and Conditions</Link></span>} checked={formData.termsAccepted}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    termsAccepted: e.target.checked,
                                }))
                            } />
                        {formErrors.termsAccepted && (
                            <p className="text-red-500 text-sm">{formErrors.termsAccepted}</p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full bg-primary font-semibold text-white py-2 rounded-md"
                    >
                        Complete Order & Send Login Instructions
                    </button>
                </div>
            )}

            <div className="text-primary font-semibold text-center mb-4">
                Already have an account? <Link className="underline" to="/login">Go to login</Link>
            </div>
        </div>
        {isModalOpen && (
            <Modal className="p-6 max-w-xl" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div dangerouslySetInnerHTML={{ __html: modalContent }} />

                {/* Add a button to close the modal */}
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 w-full font-semibold bg-primary text-white py-2 rounded-md hover:bg-green-600"
                >
                    Select Plane
                </button>
            </Modal>

        )}
    </div>
);
};

export default RegisterPage;