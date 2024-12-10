import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import ProfileProgressCard from "./ProfileProgressCard";
import UserInfo from "./UserInfo";
import DependentInfo from "./DependentInfo";
import Modal from "../../component/modals/Modal";
import parentsImg from "../../assets/parents.png";
import childrenImg from "../../assets/children.png";
import spouseImg from "../../assets/spouse.png";
import otherImg from "../../assets/other.png";
import { useDispatch, useSelector } from "react-redux";
import { calculateCompletionPercentage } from "./calculateCompletionPercentage";
import DependentsGraph from "./DependentsGraph";
import FeeBreakdown from "./FeeBreakdown";
import { usStates } from "../../utils/us-state";
import { useAddDependentMutation } from "../../redux/features/dependent/dependentApiSlice";
import { setUser } from "../../redux/features/auth/authSlice";
import Button from "../../component/buttons/Button";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";
import CapsuleAnimation from "../../component/capsuleLoading/CapsuleAnimation";

const UpdateProfilePage = () => {
  const user = useSelector((state) => state.userSlice.user);

  const shippingState = usStates.filter(
    (state) =>
      state?.value?.trim().toLowerCase() ===
      user?.shipingState?.trim().toLowerCase()
  );
  const secondaryState = usStates.filter(
    (state) =>
      state?.value?.trim().toLowerCase() ===
      user?.secondaryState?.trim().toLowerCase()
  );

  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    // "image",
    "sex",
    "dob",
    "phone",
    "shipingAddress1",
    "shipingCity",
    {
      shipingState: ["value", "label"],
    },
    "shipingZip",
  ];

  const [userInfo, setUserInfo] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || " ",
    email: user?.email || "",
    image: user?.image || "",
    sex: user?.sex || "",
    dob: user?.dob || "",
    phone: user?.phone || "",
    sPhone: user?.sPhone || "",
    shipingAddress1: user?.shipingAddress1,
    shipingAddress2: user?.shipingAddress2,
    shipingCity: user?.shipingCity || "",

    shipingState: {
      id: shippingState[0]?.id,
      value: shippingState[0]?.value || "",
      label: shippingState[0]?.label || "",
      cities: shippingState[0]?.cities,
    },
    shipingZip: user?.shipingZip,

    secondaryAddress1: user?.secondaryAddress1 || "",
    secondaryAddress2: user?.secondaryAddress2 || "",
    secondaryState: {
      value: secondaryState[0]?.value || "",
      label: secondaryState[0]?.label || "",
    },
    secondaryCity: user?.secondaryCity || "",
    secondaryZip: user?.secondaryZip,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    sex: "",
    dob: "",
    phone: "",
    sPhone: "",
    shipingAddress1: "",
    shipingAddress2: "",
    shipingCity: "",
    shipingState: "",
    shipingZip: "",
    secondaryAddress1: "",
    secondaryAddress2: "",
    secondaryState: "",
    secondaryCity: "",
    secondaryZip: "",
  });
  const [dependentsErrors, setDependentsErrors] = useState([]);

  const [dependents, setDependents] = useState(user?.dependents);
  const [activePerson, setActivePerson] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [addMoreDependent, setAddMoreDependent] = useState(false);
  const [pendingDependent, setPendingDependent] = useState(null);
  const [addDependent, { isLoading }] = useAddDependentMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  console.log("updateProfile dependents", dependents);

  const handleAddDependent = () => {
    // setActivePerson(dependents.length);
    if (!user?.lyricsUserId && !user?.PrimaryMemberGUID) {
      toast.error("Please complete your profile first. ");
      return;
    }
    if (dependents?.length >= 7) {
      toast.error("You can't have more than 7 dependents");
      return;
    }
    const storedUser = JSON.parse(
      localStorage.getItem("OPTIMALMD_USER") ||
        sessionStorage.getItem("OPTIMALMD_USER")
    );

    if (storedUser?.dependents?.length) {
      const currentDependents = [...storedUser.dependents];
      const lastDependent = currentDependents[currentDependents.length - 1];

      // This is for calculating complition rate from ls properly
      const updatedRequiredFields = [...requiredFields, "relation"].map(
        (field) => {
          if (typeof field === "object" && field.shipingState) {
            return { shipingState: "" }; // Replace shipingState value with an empty string
          }
          return field; // Keep other fields as is
        }
      );

      // Check if the last dependent in the local/session storage is incomplete
      const completionPercentageFromLS = calculateCompletionPercentage(
        lastDependent,
        updatedRequiredFields
      );

      if (completionPercentageFromLS < 100) {
        setActivePerson(currentDependents.length); // Set focus to the last dependent
        toast.error(
          "Please complete the required fields for the last dependent, before adding a new dependent."
        );
        return;
      }

      // Check if the last dependent in the current state is not saved
      const completionPercentageFromState = calculateCompletionPercentage(
        dependents[dependents.length - 1],
        [...requiredFields, "relation"]
      );

      if (completionPercentageFromState === 100) {
        toast.error(
          "Please save the last dependent before adding a new dependent."
        );
        return;
      }
    }
    // else{
    //   toast.error(
    //     "You Cannot Add more than 5 Dependent."
    //   );
    //   return;
    // }

    setShowConfirmationModal(true);
  };

  const completionPercentage = calculateCompletionPercentage(
    userInfo,
    requiredFields
  );

  const handleConfirmAddDependent = () => {
    console.log(user?.lyricsUserId);
    console.log(user?.PrimaryMemberGUID);

    if (!user?.lyricsUserId && !user?.PrimaryMemberGUID) {
      toast.error("Please complete your profile first. ");
      return;
    }
    if (dependents?.length >= 7) {
      toast.error("You can't have more than 7 dependents");
      return;
    }

    setPendingDependent({
      primaryUser: user?._id,
      firstName: "",
      lastName: "",
      email: "",
      sex: "",
      dob: "",
      phone: "",
      sPhone: "",
      shipingAddress1: "",
      shipingAddress2: "",
      shipingCity: "",
      shipingState: { value: "", label: "" },
      shipingZip: "",
      secondaryAddress1: "",
      secondaryAddress2: "",
      secondaryState: { value: "", label: "" },
      secondaryCity: "",
      secondaryZip: "",
    });
    setShowConfirmationModal(false);
    setShowModal(true);
  };

  const handleSelectrelation = async (relation) => {
    if (pendingDependent) {
      // Create the new dependent object
      const newDependent = { ...pendingDependent, relation };

      try {
        // Call the API to add the dependent
        const res = await addDependent(newDependent).unwrap();

        // If successful, update the state
        setDependents((prev) => [...prev, newDependent]);
        setPendingDependent(null);
        setActivePerson(dependents.length + 1);
        setShowModal(false);
        setDependents(res.user.dependents);
        dispatch(setUser({ user: res.user }));

        // Optionally, show a success message
        toast.success("Dependent added successfully!");
      } catch (error) {
        console.error("Error adding dependent:", error);
        // Optionally, show an error message
        toast.error("Failed to add dependent. Please try again.");
      }
    }
  };

  // Validate user info
  const validateInfo = () => {
    let formErrors = { ...errors };

    // Validate first name
    formErrors.firstName = !userInfo.firstName ? "First name is required." : "";

    // Validate last name
    formErrors.lastName = !userInfo.lastName ? "Last name is required." : "";

    // Validate email
    if (!userInfo.email) {
      formErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      formErrors.email = "Email is invalid.";
    } else {
      formErrors.email = "";
    }

    // !userInfo.image
    //   ? (formErrors.image = "Image is required.")
    //   : (formErrors.image = "");

    // Validate primary phone numbers
    const usaPhoneRegex = /^(?:\(\d{3}\)\s?|\d{3}[-.\s]?)\d{3}[-.\s]?\d{4}$/;
    formErrors.phone = !userInfo.phone
      ? "Phone number is required."
      : !usaPhoneRegex.test(userInfo.phone)
      ? "Invalid USA phone number format."
      : "";

    formErrors.sPhone = !userInfo.sPhone
      ? "Secondary phone number is required."
      : !usaPhoneRegex.test(userInfo.phone)
      ? "Invalid USA phone number format."
      : "";

    // Validate gender
    formErrors.sex = !userInfo.sex ? "Gender is required." : "";

    // Validate date of birth (DOB)
    formErrors.dob = !userInfo.dob ? "Date of birth is required." : "";

    // Update the errors state
    setErrors((prev) => ({
      ...prev, // Spread previous errors
      ...formErrors, // Merge updated form errors
    }));

    // Check if any field has an error
    if (
      // formErrors.image ||
      formErrors.firstName ||
      formErrors.lastName ||
      formErrors.email ||
      formErrors.phone ||
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
    if (!userInfo.shipingAddress1) {
      formErrors.shipingAddress1 = "Primary home address is required.";
    } else {
      formErrors.shipingAddress1 = "";
    }

    // Validate secondary home address (Shipping address 2)
    if (!userInfo.shipingAddress2) {
      formErrors.shipingAddress2 = "Secondary home address is required.";
    } else {
      formErrors.shipingAddress2 = "";
    }

    // Validate primary shipping city
    if (!userInfo.shipingCity) {
      formErrors.shipingCity = "City is required.";
    } else {
      formErrors.shipingCity = "";
    }

    // Validate primary shipping state
    if (!userInfo.shipingState || !userInfo.shipingState.value) {
      formErrors.shipingState = "State is required.";
    } else {
      formErrors.shipingState = "";
    }

    // Validate primary shipping zip
    if (!userInfo.shipingZip) {
      formErrors.shipingZip = "Zipcode is required.";
    } else {
      formErrors.shipingZip = "";
    }

    // Validate secondary city
    if (!userInfo.secondaryCity) {
      formErrors.secondaryCity = "City is required.";
    } else {
      formErrors.secondaryCity = "";
    }

    // Validate secondary state
    if (!userInfo.secondaryState || !userInfo.secondaryState.value) {
      formErrors.secondaryState = "State is required.";
    } else {
      formErrors.secondaryState = "";
    }

    // Validate secondary zip
    if (!userInfo.secondaryZip) {
      formErrors.secondaryZip = "Zipcode is required.";
    } else {
      formErrors.secondaryZip = "";
    }

    // Update the errors state
    setErrors((prev) => ({ ...prev, ...formErrors }));

    // Check if there are any errors in the address fields
    if (
      formErrors.shipingAddress1 ||
      formErrors.shipingCity ||
      formErrors.shipingState ||
      formErrors.shipingZip
    ) {
      return false;
    }

    return true;
  };
  useEffect(() => {
    window.scrollTo({
      top: 0, // Scroll to the top
      left: 0, // Optional, for horizontal scrolling
      behavior: "smooth", // Smooth scrolling
    });
  }, [activePerson]);

  console.log("percentegeFromUpdateProfile", completionPercentage);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_12fr_4fr] w-full max-w-screen-xl gap-6 px-3 mx-auto mt-6 mb-8 h-fit lg:px-16 md:mb-12 lg:mb-16">
      {/* Left Section */}
      <div className=" p-2  rounded-lg md:block grid grid-cols-4 md:grid-cols-1 gap-2 border  ">
        <div
          onClick={() => setActivePerson(0)}
          className={`rounded-md overflow-hidden p-2 border  ${
            activePerson === 0
              ? "ring-2  ring-primary md:ring-0 shadow-[0px_0px_3px_1px_rgba(0,200,92,0.3)]"
              : ""
          }`}
        >
          <ProfileProgressCard
            resetImgErr={() => setErrors((prev) => ({ ...prev, image: "" }))}
            imgError={errors.image}
            isActive={activePerson === 0}
            percentage={completionPercentage}
            initialImgUrl={userInfo.image}
            setDependents={setDependents}
            setUserInfo={setUserInfo}
          />

          <p
            className={cn(
              "md:-mt-3 mb-2 text-xs font-medium leading-3 text-center",
              "  ",
              {
                "max-h-full opacity-100": activePerson === 0,
                "max-h-0 opacity-0": activePerson !== 0,
              }
            )}
          >
            {parseInt(completionPercentage)} %
            <br /> <span className="hidden md:inline">Complete</span>
          </p>

          <p className="font-semibold text-center text-xs  capitalize text-green-800">
            {user?.firstName}{" "}
            <span className="hidden md:inline line-clamp-1">
              {user?.lastName}
            </span>
          </p>
        </div>
        {/* <div className=" "> */}
        <p className="text-xs hidden md:block mb-3 md:text-lg font-medium md:text-center md:mt-7 ">
          Your Dependents
        </p>
        {/* <div className="md:my-7 md:space-y-4 lg:space-y-6 grid grid-cols-5 gap-2 md:grid-cols-1 md:gap-4 lg:gap-6 h-full"> */}
        {dependents.map((dependent, index) => (
          <div
            key={index}
            onClick={() => setActivePerson(index + 1)}
            className={`rounded-md overflow-hidden p-2 md:mb-2 border  ${
              activePerson === index + 1
                ? "ring-2 ring-primary md:ring-0 md:shadow-[0px_0px_3px_1px_rgba(0,200,92,0.3)]"
                : ""
            }`}
          >
            <ProfileProgressCard
              imgError={dependentsErrors[index]?.image}
              resetImgErr={() =>
                setDependentsErrors((prev) => ({
                  ...prev,
                  [activePerson - 1]: {
                    ...prev[activePerson - 1],
                    image: "",
                  },
                }))
              }
              isActive={activePerson === index + 1}
              percentage={calculateCompletionPercentage(dependents[index], [
                ...requiredFields,
                "relation",
              ])}
              dependentId={dependent?._id}
              initialImgUrl={
                dependent?.image || "https://via.placeholder.com/150"
              }
              setDependents={setDependents}
              setUserInfo={setUserInfo}
            />

            <p
              className={cn(
                "md:-mt-3 mb-2 text-xs font-medium leading-3 text-center",
                "  ",
                {
                  "max-h-full opacity-100": activePerson - 1 === index,
                  "max-h-0 opacity-0": activePerson - 1 !== index,
                }
              )}
            >
              {parseInt(
                calculateCompletionPercentage(dependents[index], [
                  ...requiredFields,
                  "relation",
                ])
              )}
              {" %"}
              <br /> <span className="hidden md:inline">Complete</span>
            </p>

            <p className=" mt-2 text-center text-green-900">
              <span className="line-clamp-1 text-ellipsis text-xs font-medium">
                {dependent.firstName}
                <span className="hidden md:inline"> {dependent.lastName}</span>
              </span>

              <span className="line-clamp-1 text-ellipsis text-xs">
                {(dependent.firstName || dependent.lastName) && "("}
                {dependent.relation==="Children"?"Child":dependent.relation}
                {(dependent.firstName || dependent.lastName) && ")"}
              </span>
            </p>
          </div>
        ))}
        {dependents.length < 7 && (
          <Button
            onClick={handleAddDependent}
            className="h-full md:h-fit  text-xs flex flex-col md:flex-row"
          >
            <Plus size={18} className="" /> Add Dependent
          </Button>
        )}
        {/* </div> */}
        {/* </div> */}
      </div>

      {/* Middle Section */}
      {activePerson === 0 ? (
        <UserInfo
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          errors={errors}
          setErrors={setErrors}
          validateInfo={validateInfo}
          validateAddresses={validateAddresses}
          completionPercentage={completionPercentage}
          setAddMoreDependent={setAddMoreDependent}
        />
      ) : (
        <DependentInfo
          errors={dependentsErrors}
          setErrors={setDependentsErrors}
          selectedDependentIdx={activePerson - 1}
          setSelectedDependent={setActivePerson}
          dependents={dependents}
          setDependents={setDependents}
          setAddMoreDependent={setAddMoreDependent}
          // percentage={calculateCompletionPercentage(
          //   dependents[activePerson - 1],
          //   [[
          //     "firstName",
          //     "lastName",
          //     "sex",
          //     "dob",
          //     "shipingAddress1",
          //     "shipingCity",
          //     {
          //       shipingState: ["value", "label"],
          //     },
          //     "shipingZip",
          //   ], "relation"]
          // )}
          percentage={calculateCompletionPercentage(dependents[activePerson - 1], [
            ...requiredFields,
            "relation",
          ])}
        />
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        className="p-8 shadow-[0px_0px_50px_5px_rgba(0,0,0,0.2)] max-w-lg text-center"
      >
        <h3 className="pb-3 text-xl font-medium text-center uppercase mb-4">
          Add a dependent For{" "}
          <span className="font-bold text-primary"> Free</span>
        </h3>
        <p className="text-sm mb-4">
          You can add up to{" "}
          <span className="font-bold text-primary">7 dependents</span> in total.
        </p>
        <p className="text-lg ">
          {" "}
          If you add this dependent, it will cost you{" "}
          <span className="font-bold text-primary">${0}</span> more.
        </p>

        {dependents.length <= 7 ? (
          <p className="text-lg">
            {" "}
            You can still add{" "}
            <span className="font-bold text-primary">
              {7 - dependents.length}{" "}
            </span>
            more dependents.{" "}
          </p>
        ) : (
          <p>You have reached the maximum number of dependents.</p>
        )}

        <div className="my-6 h-[2px] bg-gray-200" />
        <div className="grid grid-cols-2 justify-center gap-4 mt-8">
          <Button
            variant="light"
            onClick={() => setShowConfirmationModal(false)}
            className="px-6 py-2"
          >
            NOT NOW
          </Button>
          <Button onClick={handleConfirmAddDependent}>ADD DEPENDENT</Button>
        </div>
      </Modal>
      <Modal
        isOpen={addMoreDependent}
        onClose={() => {
          setAddMoreDependent(false);
          navigate("/");
        }}
        className="p-8 shadow-[0px_0px_50px_5px_rgba(0,0,0,0.2)] max-w-md text-center"
      >
        <h3 className="pb-3 flex justify-center font-medium items-center gap-2 text-primary text-2xl">
          {/* <CircleCheck size={18} />  */}
          You&apos;ve successfully updated your profile!
        </h3>
        <h2 className="text-xl mb-2">Do you want to add your dependents?</h2>

        {dependents.length <= 7 && (
          <p>
            You can add <span className="text-primary font-bold">7</span>{" "}
            dependents for <span className="text-primary font-bold">free</span>
          </p>
        )}

        <div className="my-6 h-[2px] bg-gray-200" />
        <div className="grid grid-cols-2 justify-center gap-4 mt-8">
          <Button
            variant="light"
            onClick={() => {
              setShowConfirmationModal(false);
              navigate("/");
            }}
            className="px-6 py-2 uppercase"
          >
            Not Now
          </Button>
          <Button
            onClick={() => {
              handleConfirmAddDependent();
              setAddMoreDependent(false);
            }}
            className="uppercase"
          >
            Add Dependent
          </Button>
        </div>
      </Modal>

      {/* relation Selection Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        className="shadow-[0px_0px_50px_5px_rgba(0,0,0,0.2)]"
      >
        <p className="py-5 text-lg font-medium text-center border-b-2">
          {isLoading ? "Adding Dependent... " : "Select a relation"}
        </p>
        <div
          className={`relative grid grid-cols-2 gap-8 p-4 md:p-5 lg:p-8 lg:px-12 transition `}
        >
          {[
            { relation: "Parents", img: parentsImg },
            { relation: "Children", img: childrenImg },
            { relation: "Spouse", img: spouseImg },
            { relation: "Other", img: otherImg },
          ].map(({ relation, img }) => (
            <div
              key={relation}
              onClick={() => handleSelectrelation(relation)}
              className={`rounded-lg shadow-[0px_0px_3px_1px_rgba(0,0,0,0.2)] hover:shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] p-2 cursor-pointer ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
            >
              <img src={img} alt={relation} className="max-w-24" />
              <p className="text-center">
                {relation.charAt(0).toUpperCase() + relation.slice(1)}
              </p>
            </div>
          ))}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <CapsuleAnimation />
            </div>
          )}
        </div>
      </Modal>

      {/* Right Section */}
      <div className="space-y-4 md:w-fit lg:block">
        <FeeBreakdown dependents={dependents} />
        <DependentsGraph dependents={dependents} />
      </div>
    </div>
  );
};

export default UpdateProfilePage;
