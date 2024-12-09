import Button from "../../component/buttons/Button";
import InputField from "../../component/inputs/Input2";
import SelectInput from "../../component/inputs/SelectInput";
import { usStates } from "../../utils/us-state";
import { useState } from "react";

const UserContactInfo = ({ userInfo, setUserInfo, errors }) => {
  const [showAdditionalAddress, setShowAdditionalAddress] = useState(
    userInfo?.secondaryAddress1 ||
      userInfo?.secondaryAddress2 ||
      userInfo?.secondaryState?.value ||
      userInfo?.secondaryCity?.value ||
      userInfo?.secondaryZip
  );
  // const [primaryCities, setPrimaryCities] = useState(
  //   userInfo?.shipingState?.cities
  // );
  // const [additionalCities, setAddtionalCities] = useState(
  //   userInfo?.secondaryState?.cities
  // );

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // useEffect(() => {
  //   if (userInfo?.shipingState?.cities) {
  //     const transformedCities = userInfo.shipingState.cities.map((city) => ({
  //       value: city,
  //       label: city,
  //     }));
  //     setPrimaryCities(transformedCities);
  //   } else {
  //     setPrimaryCities([]);
  //   }
  // }, [userInfo?.shipingState]);

  // useEffect(() => {
  //   if (userInfo?.secondaryState?.cities) {
  //     const transformedCities = userInfo.secondaryState.cities.map((city) => ({
  //       value: city,
  //       label: city,
  //     }));
  //     setAddtionalCities(transformedCities);
  //   } else {
  //     setAddtionalCities([]);
  //   }
  // }, [userInfo?.secondaryState]);

  return (
    <div>
      <div className="space-y-3 md:space-y-4 lg:space-y-6">
        <h3 className="mb-4 text-lg font-medium">Primary Address</h3>
        <div className="space-y-3 md:space-y-4 lg:space-y-6">
          <InputField
            label="Home Address"
            placeholder="Enter your address"
            value={userInfo?.shipingAddress1}
            onChange={(e) =>
              handleInputChange("shipingAddress1", e.target.value)
            }
            errorMsg={errors?.shipingAddress1}
          />
          <InputField
            label="Home Address 2 (Optional)"
            placeholder="Enter additional address"
            value={userInfo?.shipingAddress2}
            onChange={(e) =>
              handleInputChange("shipingAddress2", e.target.value)
            }
            // errorMsg={errors.shipingAddress2}
          />

          <InputField
            label="City"
            placeholder="Enter your city name"
            value={userInfo?.shipingCity}
            onChange={(e) => handleInputChange("shipingCity", e.target.value)}
            errorMsg={errors?.shipingCity}
          />

          {
            console.log("user state",userInfo?.shipingState)
          }

          <SelectInput
            options={usStates}
            label="State"
            // value={userInfo?.shipingState?.value || ""}
            placeholder="Select your state"
            selectedOption={userInfo?.shipingState?.label}
            onSelect={(value) => {
              // handleInputChange("shipingCity", "");
              handleInputChange("shipingState", value); // Update secondaryState
            }}
            errorMsg={errors?.shipingState}
          />

          {/* <SelectInput
            options={primaryCities}
            label="City"
            value={userInfo?.shipingCity?.value || ""}
            placeholder={
              !userInfo?.shipingCity
                ? "Select a state first"
                : "Select your city"
            }
            selectedOption={userInfo?.shipingCity?.label} // Use secondaryCity here
            onSelect={(value) => {
              handleInputChange("shipingCity", value);
            }}
            errorMsg={errors?.shipingCity}
          /> */}

          <InputField
            label="Zip Code"
            placeholder="Enter zip code"
            value={userInfo?.shipingZip}
            onChange={(e) => handleInputChange("shipingZip", e.target.value)}
            errorMsg={errors?.shipingZip}
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
                  value={userInfo?.secondaryAddress1}
                  onChange={(e) =>
                    handleInputChange("secondaryAddress1", e.target.value)
                  }
                  // errorMsg={errors?.secondaryAddress1}
                />
                <InputField
                  label="Additional Home Address (Optional)"
                  placeholder="Enter additional address"
                  value={userInfo?.secondaryAddress2}
                  onChange={(e) =>
                    handleInputChange("secondaryAddress2", e.target.value)
                  }
                  // errorMsg={errors.secondaryAddress2}
                />

                <SelectInput
                  options={usStates}
                  label="State"
                  value={userInfo?.secondaryState?.value || ""}
                  placeholder="Select your state"
                  selectedOption={userInfo?.secondaryState?.label}
                  onSelect={(value) => {
                    handleInputChange("secondaryCity", {
                      value: "",
                      label: "",
                    });
                    handleInputChange("secondaryState", value); // Update secondaryState
                  }}
                  // errorMsg={errors?.secondaryState}
                />

                {/* <SelectInput
                  options={additionalCities}
                  label="City"
                  value={userInfo?.secondaryCity?.value || ""}
                  placeholder={
                    !userInfo?.secondaryState
                      ? "Select a state first"
                      : "Select your city"
                  }
                  selectedOption={userInfo?.secondaryCity?.label} // Use secondaryCity here
                  onSelect={(value) =>
                    handleInputChange("secondaryCity", value)
                  }
                  // errorMsg={errors?.secondaryCity}
                /> */}

                <InputField
                  label="City"
                  placeholder="Enter your  city name"
                  value={userInfo?.secondaryCity}
                  onChange={(e) =>
                    handleInputChange("secondaryCity", e.target.value)
                  }
                  // errorMsg={errors?.secondaryZip}
                />
                <InputField
                  label="Zip Code"
                  placeholder="Enter zip code"
                  value={userInfo?.secondaryZip}
                  onChange={(e) =>
                    handleInputChange("secondaryZip", e.target.value)
                  }
                  // errorMsg={errors?.secondaryZip}
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

export default UserContactInfo;
