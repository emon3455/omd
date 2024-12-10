import { useEffect, useState } from "react";
// import ProgressSteps from "./Steps";
import Submit from "./Submit";
import Button from "../../component/buttons/Button";
import DependentDemographics from "./DependentDemographics";
import DependentContactInfo from "./DependentContactInfo";
import toast from "react-hot-toast";
import { useUpdateDependentMutation } from "../../redux/features/dependent/dependentApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";
import { errorAlert, successAlert } from "../../utils/allertFunction";
import ProgressBar from "../../component/progresses/ProgressBar";
import { usStates } from "../../utils/us-state";

const DependentInfo = ({
  errors,
  setErrors,
  selectedDependentIdx,
  dependents,
  setDependents,
  percentage,
}) => {
  // const steps = [
  //   { step: 1, stepTitle: "" },
  //   { step: 2, stepTitle: "" },
  //   { step: 3, stepTitle: "" },
  // ];

  const [currentStep, setCurrentStep] = useState(1);
  const [updateDependent, { isLoading }] = useUpdateDependentMutation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);

  const handleGoBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const [primaryCities, setPrimaryCities] = useState(
    dependents[selectedDependentIdx].shipingState?.cities
  );
  const [additionalCities, setAddtionalCities] = useState(
    dependents[selectedDependentIdx].secondaryState?.cities
  );
  // Validate user info
  const validateInfo = () => {
    let formErrors = { ...errors };

    // Validate first name
    formErrors.firstName = !dependents[selectedDependentIdx].firstName
      ? "First name is required."
      : "";

    // Validate last name
    formErrors.lastName = !dependents[selectedDependentIdx].lastName
      ? "Last name is required."
      : "";

    // Validate email
    if (!dependents[selectedDependentIdx].email) {
      formErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(dependents[selectedDependentIdx].email)) {
      formErrors.email = "Email is invalid.";
    } else {
      formErrors.email = "";
    }

    // !dependents[selectedDependentIdx].image
    //   ? (formErrors.image = "Upload an Image")
    //   : (formErrors.image = "");

    const usaPhoneRegex = /^(?:\(\d{3}\)\s?|\d{3}[-.\s]?)\d{3}[-.\s]?\d{4}$/;
    // Validate primary phone number
    formErrors.phone = !dependents[selectedDependentIdx].phone
      ? "Phone number is required."
      : !usaPhoneRegex.test(dependents[selectedDependentIdx].phone)
      ? "Invalid USA phone number format."
      : "";

    // Validate secondary phone number
    formErrors.sPhone = !dependents[selectedDependentIdx].sPhone
      ? "Secondary phone number is required."
      : !usaPhoneRegex.test(dependents[selectedDependentIdx].sPhone)
      ? "Invalid USA phone number format."
      : "";

    // Validate gender
    formErrors.sex = !dependents[selectedDependentIdx].sex
      ? "Gender is required."
      : "";

    // Validate date of birth (DOB)
    formErrors.dob = !dependents[selectedDependentIdx].dob
      ? "Date of birth is required."
      : "";

    // Update the errors state
    setErrors((prev) => ({
      ...prev, // Spread previous errors
      [selectedDependentIdx]: { ...prev[selectedDependentIdx], ...formErrors }, // Merge updated form errors
    }));

    // Check if any field has an error
    if (
      formErrors.firstName ||
      formErrors.lastName ||
      // formErrors.email ||
      // formErrors.image ||
      // formErrors.phone ||
      formErrors.sex ||
      formErrors.dob
    ) {
      return false;
    }
    return true;
  };

  // Validate address fields
  const validateAddresses = () => {
    let formErrors = { ...errors };

    // Validate primary home address (Shipping address 1)
    if (!dependents[selectedDependentIdx].shipingAddress1) {
      formErrors.shipingAddress1 = "Primary home address is required.";
    } else {
      formErrors.shipingAddress1 = "";
    }

    // Validate primary shipping city
    if (
      !dependents[selectedDependentIdx].shipingCity
      //|| !dependents[selectedDependentIdx].shipingCity.value
    ) {
      formErrors.shipingCity = "City is required.";
    } else {
      formErrors.shipingCity = "";
    }

    // Validate primary shipping state
    if (
      !dependents[selectedDependentIdx].shipingState
      // || !dependents[selectedDependentIdx].shipingState.value
    ) {
      formErrors.shipingState = "State is required.";
    } else {
      formErrors.shipingState = "";
    }

    // Validate primary shipping zip
    if (!dependents[selectedDependentIdx].shipingZip) {
      formErrors.shipingZip = "Zipcode is required.";
    } else {
      formErrors.shipingZip = "";
    }

    // Update the errors state
    setErrors((prev) => ({
      ...prev, // Spread previous errors
      [selectedDependentIdx]: { ...prev[selectedDependentIdx], ...formErrors }, // Merge updated form errors for the specific dependent
    }));

    // Check if there are any errors in the address fields
    if (
      formErrors.shipingAddress1 ||
      formErrors.shipingAddress2 ||
      formErrors.shipingCity ||
      formErrors.shipingState ||
      formErrors.shipingZip
    ) {
      return false;
    }

    return true;
  };
  const handleGoNext = () => {
    const activeErrors = errors[selectedDependentIdx] || {}; // Safely access active person's errors
    const { firstName, lastName, dob, sex, phone, image } = activeErrors;

    // Check if all other errors are absent and the image error is present
    if (!firstName && !lastName && !dob && !sex && !phone && image) {
      console.log("scroll to bottom triggered");
      window.scrollTo({
        top: document.body.scrollHeight, // Scroll to the bottom of the page
        behavior: "smooth", // Smooth scrolling
      });
    }
    if (currentStep === 1) {
      const isValid = validateInfo();
      if (!isValid) {
        toast.error("Please fill all required fields");
        validateInfo();
        return;
      }
    }
    if (currentStep === 2) {
      const isValidAddress = validateAddresses();
      if (!isValidAddress) {
        toast.error("Please fill all required fields");
        return;
      }
    }

    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async () => {
    const updatedDependent = {
      dependentId:
        user?.dependents[selectedDependentIdx]?._id ||
        dependents[selectedDependentIdx]?._id,
      firstName: dependents[selectedDependentIdx]?.firstName || "",
      lastName: dependents[selectedDependentIdx]?.lastName || "",
      dob: dependents[selectedDependentIdx]?.dob || "",
      email: dependents[selectedDependentIdx]?.email || "",
      sex: dependents[selectedDependentIdx]?.sex || "",
      phone: dependents[selectedDependentIdx]?.phone || "",
      relation: dependents[selectedDependentIdx]?.relation || "",
      shipingAddress1: dependents[selectedDependentIdx]?.shipingAddress1 || "",
      shipingAddress2: dependents[selectedDependentIdx]?.shipingAddress2 || "",
      shipingCity: dependents[selectedDependentIdx]?.shipingCity || "",
      shipingState: dependents[selectedDependentIdx]?.shipingState.value || "",
      shipingCountry: dependents[selectedDependentIdx]?.shipingCountry || "",
      shipingZip: dependents[selectedDependentIdx]?.shipingZip || "",
      secondaryAddress1: dependents[selectedDependentIdx]?.secondaryAddress1,
      secondaryAddress2: dependents[selectedDependentIdx]?.secondaryAddress2,
      secondaryCity: dependents[selectedDependentIdx]?.secondaryCity,
      secondaryState: dependents[selectedDependentIdx]?.secondaryState.label,
      secondaryZip: dependents[selectedDependentIdx]?.secondaryZip,
      relationShipId: dependents[selectedDependentIdx]?.relationShipId || "",
      primaryUserId: user?._id || "",
      // shipingStateId: shipingState.id,
    };

    try {
      const response = await updateDependent(updatedDependent);
      if (response.data.user) {
        successAlert({
          title: "Updated!",
          text: `${dependents[selectedDependentIdx]?.firstName} ${dependents[selectedDependentIdx]?.lastName}'s information updated successfully!`,
        });
        dispatch(setUser({ user: response.data.user }));
        setCurrentStep(1);
      }
    } catch (e) {
      console.error("Error updating dependent: ", e);
      errorAlert({
        title: "Something Went Wrong!",
        text: "Your Dependent profile has not been completed! Please try again.",
      });
    }
  };

  // console.log("current dependent: ", dependents[selectedDependentIdx]);

  // This is to make the shiping state value an object to be passed for select input
  useEffect(() => {
    setDependents((prev) =>
      prev.map((dependent, i) => {
        if (i === selectedDependentIdx) {
          const currentState = dependent.shipingState;

          // Check if the current shipping state is not an object
          if (typeof currentState !== "object" || currentState === null) {
            // Find the corresponding object from usStates
            const matchingState = usStates.find(
              (state) =>
                state?.label?.trim().toLowerCase() ===
                String(currentState).trim().toLowerCase()
            );

            // If a match is found, update the shipping state
            if (matchingState) {
              return {
                ...dependent,
                // shipingCity: {
                //   value: user.shipingCity,
                //   label: user.dependents[selectedDependentIdx].shipingCity,
                // },
                shipingState: matchingState, // Update to the object
              };
            }
          }
        }

        // Return the dependent unchanged if no match or not the selected index
        return dependent;
      })
    );
  }, [selectedDependentIdx]);

  // This is to make the secondary state value an object to be passed for select input
  useEffect(() => {
    setDependents((prev) =>
      prev.map((dependent, i) => {
        if (i === selectedDependentIdx) {
          const currentState = dependent.secondaryState;

          // Check if the current shipping state is not an object
          if (typeof currentState !== "object" || currentState === null) {
            // Find the corresponding object from usStates
            const matchingState = usStates.find(
              (state) =>
                state?.label?.trim().toLowerCase() ===
                String(currentState).trim().toLowerCase()
            );

            // If a match is found, update the shipping state
            if (matchingState) {
              return {
                ...dependent,
                secondaryCity: {
                  value: user.secondaryCity,
                  label: user.dependents[selectedDependentIdx].secondaryCity,
                },
                secondaryState: matchingState, // Update to the object
              };
            }
          }
        }

        // Return the dependent unchanged if no match or not the selected index
        return dependent;
      })
    );
  }, [selectedDependentIdx]);

  // Convert shipping cities to an array of objects
  useEffect(() => {
    if (dependents[selectedDependentIdx].shipingState?.cities) {
      const transformedCities = dependents[
        selectedDependentIdx
      ].shipingState.cities.map((city) => ({
        value: city,
        label: city,
      }));
      setPrimaryCities(transformedCities);
    } else {
      setPrimaryCities([]);
    }
  }, [dependents[selectedDependentIdx].shipingState]);

  // Convert secondary cities to an array of objects
  useEffect(() => {
    if (dependents[selectedDependentIdx].secondaryState?.cities) {
      const transformedCities = dependents[
        selectedDependentIdx
      ].secondaryState.cities.map((city) => ({
        value: city,
        label: city,
      }));
      setAddtionalCities(transformedCities);
    } else {
      setAddtionalCities([]);
    }
  }, [dependents[selectedDependentIdx].secondaryState]);
  // Set step to 1 on initial render
  useEffect(() => {
    setCurrentStep(1);
  }, [selectedDependentIdx]);

  console.log("percentageFromDependentInfo: ", percentage);
  
  return (
    <div className="w-full p-3 border rounded-lg md:p-5 lg:p-8">
      <div className="mb-2">
        {currentStep === 1 && (
          <h3 className="text-xl">
            Personal Demographics{" "}
            <span className="capitalize">
              {" "}
              ({dependents[selectedDependentIdx].relation})
            </span>
          </h3>
        )}
        {currentStep === 2 && <h3 className="text-xl">Contact Information</h3>}
        {currentStep === 3 && <h3 className="text-xl">Submit Confirmation</h3>}
        <ProgressBar
          percentage={percentage}
          className="mb-8 mt-4"
          image={dependents[selectedDependentIdx].image}
        />
      </div>
      {/* <ProgressSteps
        steps={steps}
        setStep={setCurrentStep}
        currentStep={currentStep}
        validateInfo={validateInfo}
        validateAddresses={validateAddresses}
      /> */}

      <div>
        {currentStep === 1 && (
          <DependentDemographics
            selectedDependentIdx={selectedDependentIdx}
            dependents={dependents}
            setDependents={setDependents}
            errors={errors}
            setErrors={setErrors}
          />
        )}
      </div>
      <div>
        {currentStep === 2 && (
          <DependentContactInfo
            errors={errors}
            setErrors={setErrors}
            dependents={dependents}
            selectedDependentIdx={selectedDependentIdx}
            setDependents={setDependents}
            primaryCities={primaryCities}
            additionalCities={additionalCities}
          />
        )}
      </div>
      <div>
        {currentStep === 3 && (
          <Submit
            onSubmit={handleSubmit}
            onCancel={() => setCurrentStep(1)}
            submitting={isLoading}
          />
        )}
      </div>
      {currentStep < 3 && (
        <div className="flex justify-center w-full gap-3 mt-6 md:mt-8 md:gap-6">
          <Button
            variant="outline"
            className="w-full md:max-w-32"
            disabled={currentStep <= 1}
            onClick={handleGoBack}
          >
            Go Back{" "}
          </Button>
          <Button
            className="w-full md:max-w-32"
            disabled={currentStep >= 3}
            onClick={handleGoNext}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default DependentInfo;
