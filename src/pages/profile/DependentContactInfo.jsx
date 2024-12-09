import { useEffect, useState } from "react";
import Button from "../../component/buttons/Button";
import InputField from "../../component/inputs/Input2";
import SelectInput from "../../component/inputs/SelectInput";
import { usStates } from "../../utils/us-state";
// import { useSelector } from "react-redux";

const DependentContactInfo = ({
  dependents,
  selectedDependentIdx,
  setDependents,
  errors,
  setErrors,
}) => {
  // const user = useSelector((state) => state.userSlice.user);
  const [showAdditionalAddress, setShowAdditionalAddress] = useState(
    dependents[selectedDependentIdx]?.secondaryAddress1 ||
      dependents[selectedDependentIdx].secondaryAddress2 ||
      dependents[selectedDependentIdx].secondaryState.value ||
      dependents[selectedDependentIdx].secondaryCity.value ||
      dependents[selectedDependentIdx].secondaryZip
  );
  // const [primaryCities, setPrimaryCities] = useState(
  //   dependents[selectedDependentIdx].shipingState?.cities
  // );
  // const [additionalCities, setAddtionalCities] = useState(
  //   dependents[selectedDependentIdx].secondaryState?.cities
  // );
  const handleInputChange = (field, value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [selectedDependentIdx]: {
        ...prevErrors[selectedDependentIdx],
        [field]: null, // Clear error for the specific field
      },
    }));
    setDependents((prev) =>
      prev.map((dependent, i) =>
        i === selectedDependentIdx
          ? { ...dependent, [field]: value }
          : dependent
      )
    );
  };

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
                // secondaryCity: {
                //   value: user.secondaryCity,
                //   label: user.dependents[selectedDependentIdx].secondaryCity,
                // },
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

  // // Convert shipping cities to an array of objects
  // useEffect(() => {
  //   if (dependents[selectedDependentIdx].shipingState?.cities) {
  //     const transformedCities = dependents[
  //       selectedDependentIdx
  //     ].shipingState.cities.map((city) => ({
  //       value: city,
  //       label: city,
  //     }));
  //     setPrimaryCities(transformedCities);
  //   } else {
  //     setPrimaryCities([]);
  //   }
  // }, [dependents[selectedDependentIdx].shipingState]);

  // // Convert secondary cities to an array of objects
  // useEffect(() => {
  //   if (dependents[selectedDependentIdx].secondaryState?.cities) {
  //     const transformedCities = dependents[
  //       selectedDependentIdx
  //     ].secondaryState.cities.map((city) => ({
  //       value: city,
  //       label: city,
  //     }));
  //     setAddtionalCities(transformedCities);
  //   } else {
  //     setAddtionalCities([]);
  //   }
  // }, [dependents[selectedDependentIdx].secondaryState]);

  console.log("current dependent: ", dependents[selectedDependentIdx]);
  return (
    <div>
      <div className="space-y-3 md:space-y-4 lg:space-y-6">
        <h3 className="mb-4 text-lg font-medium">Primary Address</h3>
        <div className="space-y-3 md:space-y-4 lg:space-y-6">
          <InputField
            label="Home Address"
            placeholder="Enter your address"
            value={dependents[selectedDependentIdx].shipingAddress1}
            onChange={(e) =>
              handleInputChange("shipingAddress1", e.target.value)
            }
            errorMsg={errors[selectedDependentIdx]?.shipingAddress1}
          />
          <InputField
            label="Home Address 2 (Optional)"
            placeholder="Enter your address"
            value={dependents[selectedDependentIdx].shipingAddress2}
            onChange={(e) =>
              handleInputChange("shipingAddress2", e.target.value)
            }
            errorMsg={errors[selectedDependentIdx]?.shipingAddress2}
          />

          <InputField
            label="City"
            placeholder="Enter your city name"
            value={dependents[selectedDependentIdx].shipingCity}
            onChange={(e) => handleInputChange("shipingCity", e.target.value)}
            errorMsg={errors[selectedDependentIdx]?.shipingCity}
          />

          <SelectInput
            options={usStates}
            label="State"
            value={dependents[selectedDependentIdx].shipingState?.value || ""}
            placeholder="Select your state"
            selectedOption={
              dependents[selectedDependentIdx].shipingState?.label
            }
            onSelect={(value) => {
              // handleInputChange("shipingCity", { value: "", label: "" });
              // console.log("value: ", value);
              handleInputChange("shipingState", value); // Update secondaryState
            }}
            errorMsg={errors[selectedDependentIdx]?.shipingState}
          />

          {/* <SelectInput
            options={primaryCities}
            label="City"
            value={dependents[selectedDependentIdx].shipingCity?.value || ""}
            placeholder={
              !dependents[selectedDependentIdx].shipingCity
                ? "Select a state first"
                : "Select your city"
            }
            selectedOption={dependents[selectedDependentIdx].shipingCity?.label} // Use secondaryCity here
            onSelect={(value) => {
              handleInputChange("shipingCity", value);
            }}
            errorMsg={errors[selectedDependentIdx]?.shipingCity}
          /> */}

          <InputField
            label="Zip Code"
            placeholder="Enter zip code"
            value={dependents[selectedDependentIdx].shipingZip}
            onChange={(e) => handleInputChange("shipingZip", e.target.value)}
            errorMsg={errors[selectedDependentIdx]?.shipingZip}
          />
        </div>
      </div>

      <div className="mt-12 hidden">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium ">
            Additional Address (Optional)
          </h3>{" "}
          <Button
            onClick={() => {
              handleInputChange("secondaryAddress1", "");
              handleInputChange("secondaryAddress2", "");
              handleInputChange("secondaryCity", "");
              handleInputChange("secondaryState", "");
              handleInputChange("secondaryZip", "");
              setShowAdditionalAddress(false);
            }}
            variant="danger"
            className="px-2 py-1 "
          >
            Remove
          </Button>
        </div>

        {/* Only allow one additional address */}
        {showAdditionalAddress ? (
          <>
            <div className="mt-4 md:mt-6 lg:mt-8">
              <div className="space-y-3 md:space-y-4 lg:space-y-6">
                <InputField
                  label="Additional Home Address"
                  placeholder="Enter your address"
                  value={dependents[selectedDependentIdx].secondaryAddress1}
                  onChange={(e) =>
                    handleInputChange("secondaryAddress1", e.target.value)
                  }
                  // errorMsg={errors[selectedDependentIdx]?.secondaryAddress1}
                />
                <InputField
                  label="Additional Home Address (Optional)"
                  placeholder="Enter additional address"
                  value={dependents[selectedDependentIdx].secondaryAddress2}
                  onChange={(e) =>
                    handleInputChange("secondaryAddress2", e.target.value)
                  }
                  // errorMsg={errors.secondaryAddress2}
                />

                <SelectInput
                  options={usStates}
                  label="State"
                  value={
                    dependents[selectedDependentIdx].secondaryState?.value || ""
                  }
                  placeholder="Select your state"
                  selectedOption={
                    dependents[selectedDependentIdx].secondaryState?.label
                  }
                  onSelect={(value) => {
                    handleInputChange("secondaryCity", {
                      value: "",
                      label: "",
                    });
                    handleInputChange("secondaryState", value); // Update secondaryState
                  }}
                  // errorMsg={errors[selectedDependentIdx]?.secondaryState}
                />

                {/* <SelectInput
                  options={additionalCities}
                  label="City"
                  value={
                    dependents[selectedDependentIdx].secondaryCity?.value || ""
                  }
                  placeholder={
                    !dependents[selectedDependentIdx].secondaryState
                      ? "Select a state first"
                      : "Select your city"
                  }
                  selectedOption={
                    dependents[selectedDependentIdx].secondaryCity?.label
                  } // Use secondaryCity here
                  onSelect={(value) =>
                    handleInputChange("secondaryCity", value)
                  }
                  // errorMsg={errors[selectedDependentIdx]?.secondaryCity}
                /> */}

                <InputField
                  label="City"
                  placeholder="Enter your city name"
                  value={dependents[selectedDependentIdx].secondaryCity}
                  onChange={(e) =>
                    handleInputChange("secondaryCity", e.target.value)
                  }
                  // errorMsg={errors[selectedDependentIdx]?.secondaryZip}
                />
                <InputField
                  label="Zip Code"
                  placeholder="Enter zip code"
                  value={dependents[selectedDependentIdx].secondaryZip}
                  onChange={(e) =>
                    handleInputChange("secondaryZip", e.target.value)
                  }
                  // errorMsg={errors[selectedDependentIdx]?.secondaryZip}
                />
              </div>
            </div>
          </>
        ) : (
          <Button
            onClick={() => setShowAdditionalAddress(true)}
            className="px-4 py-2 mt-2 text-white bg-blue-500 rounded md:mt-6"
          >
            Add Additional Address
          </Button>
        )}
      </div>
    </div>
  );
};
export default DependentContactInfo;
