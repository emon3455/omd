import { useState } from "react";
// import ProgressSteps from "./Steps";
import Demographics from "./UserDemographics";
import Submit from "./Submit";
import Button from "../../component/buttons/Button";
import UserContactInfo from "./UserContactInfo";
import { errorAlert, successAlert } from "../../utils/allertFunction";

import { useUpdateProfileMutation } from "../../redux/features/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import ProgressBar from "../../component/progresses/ProgressBar";
import { useNavigate } from "react-router-dom";

const UserInfo = ({
  userInfo,
  setUserInfo,
  errors,
  setErrors,
  validateInfo,
  validateAddresses,
  completionPercentage,
  setAddMoreDependent,
}) => {
  const user = useSelector((state) => state.userSlice.user);
  const [submitting, setSubmitting] = useState(false);
  // const [enrollment] = useEnrollmentMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // const steps = [
  //   { step: 1, stepTitle: "" },
  //   { step: 2, stepTitle: "" },
  //   { step: 3, stepTitle: "" },
  // ];
  const [currentStep, setCurrentStep] = useState(1);

  const handleGoBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoNext = () => {
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
    console.log("user info: ", userInfo);
    setSubmitting(true);

    const myDbData = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      phone: userInfo.phone,
      ...(userInfo.sPhone && {
        sPhone: userInfo.sPhone,
      }),
      sex: userInfo.sex,
      dob: userInfo.dob,
      image: userInfo.image,
      shipingAddress1: userInfo.shipingAddress1,
      shipingAddress2: userInfo.shipingAddress2,
      shipingCity: userInfo.shipingCity,
      shipingState: userInfo.shipingState.value,
      shipingStateId: userInfo.shipingState.id,
      shipingZip: userInfo.shipingZip,
      secondaryAddress1: userInfo.secondaryAddress1,
      secondaryAddress2: userInfo.secondaryAddress2,
      secondaryCity: userInfo?.secondaryCity,
      secondaryState: userInfo?.secondaryState.label,
      secondaryZip: userInfo?.secondaryZip,
      userId: user._id,
    };
    try {
      const response = await updateProfile(myDbData).unwrap();

      if (response.message) {
        dispatch(setUser({ user: response.user }));
        if (response.user.dependents.length < 1) {
          setAddMoreDependent(true);
        } else {
          successAlert({
            title: "Updated!",
            text: "You have successfully updated your profile.",
          });
          navigate("/");
        }
      }
    } catch (error) {
      errorAlert({
        title: "Something Went Wrong..!",
        text: "User profile update failed.",
      });
      console.error("Error while logging in:", error);
    } finally {
      setSubmitting(false);
    }
  };
  console.log("UserInfoPercentage: ", completionPercentage)
  return (
    <div className="w-full p-3 border rounded-lg md:p-4 lg:p-8">
      <div className="mb-6">
        {currentStep === 1 && (
          <h3 className="text-xl">Personal Demographics (Self)</h3>
        )}
        {currentStep === 2 && <h3 className="text-xl">Contact Information</h3>}
        {currentStep === 3 && <h3 className="text-xl">Submit Confirmation</h3>}
      </div>
      {/* <ProgressSteps
        steps={steps}
        setStep={setCurrentStep}
        currentStep={currentStep}
        validateInfo={validateInfo}
        validateAddresses={validateAddresses}
      /> */}

      <ProgressBar
        image={userInfo.image}
        percentage={completionPercentage}
        className="mb-8 mt-4"
      />
      <div>
        {currentStep === 1 && (
          <Demographics
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            errors={errors}
            setErrors={setErrors}
            validateInfo={validateInfo}
            validateAddresses={validateAddresses}
          />
        )}
      </div>
      <div>
        {currentStep === 2 && (
          <UserContactInfo
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            errors={errors}
            setErrors={setErrors}
          />
        )}
      </div>
      <div>
        {currentStep === 3 && (
          <Submit
            onCancel={() => setCurrentStep(1)}
            onSubmit={handleSubmit}
            submitting={submitting}
            setSubmitting={setSubmitting}
          />
        )}
      </div>

      {currentStep < 3 && (
        <div className="flex justify-center gap-4 mt-6 md:mt-8 md:gap-6 ">
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

export default UserInfo;
