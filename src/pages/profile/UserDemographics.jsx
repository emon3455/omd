import { useEffect, useState } from "react";
import InputField from "../../component/inputs/Input2";
import SelectInput from "../../component/inputs/SelectInput";
import DateInput from "../../component/inputs/DateInput";
import formatDate from "../../utils/formateDate";

const UserDemographics = ({ userInfo, setUserInfo, errors, setErrors }) => {
  const [selectedDate, setSelectedDate] = useState(userInfo.dob);
  const [selectedGender, setSelectedGender] = useState(userInfo.sex);
  const [value, setValue] = useState({
    startDate: userInfo.dob,
    endDate: null,
  });

  const usaFlagUrl =
    "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"; // USA flag image URL
  const countryCode = "+1"; // USA country code

  const handleInputChange = (field, value) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    handleInputChange("dob", selectedDate);
  }, [selectedDate]);

  return (
    <div className="w-full">
      <div className="w-full space-y-3 rounded-lg md:space-y-4 lg:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputField
            label="First Name"
            placeholder="Type your first name"
            value={userInfo.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            errorMsg={errors.firstName}
          />
          <InputField
            label="Last Name"
            placeholder="Type your last name"
            value={userInfo.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            errorMsg={errors.lastName}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SelectInput
            label="Gender"
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
            selectedOption={selectedGender}
            onSelect={(value) => {
              setSelectedGender(value.label);
              handleInputChange("sex", value.value);
            }}
            errorMsg={errors.sex}
          />

          <DateInput
            useRange={false}
            asSingle={true}
            inputClassName="w-full focus:outline-none  "
            primaryColor={"green"}
            value={value}
            placeholder={
              userInfo.dob ? formatDate(userInfo.dob) : "Select a Date"
            }
            onChange={(newValue) => {
              setValue(newValue);
              setSelectedDate(newValue.startDate);
            }}
            errorMsg={errors?.dob}
          />
        </div>
        <InputField
          label="Email"
          placeholder="Type your email address"
          value={userInfo.email}
          disabled={true}
          onChange={(e) => handleInputChange("email", e.target.value)}
          errorMsg={errors.email}
        />

        {/* Primary Phone Section */}
        <div className="relative flex gap-2">
          <div className="relative flex items-center justify-center gap-2 px-5 bg-white border rounded-lg cursor-pointer w-fit max-h-[58px]  ">
            <img
              src={usaFlagUrl}
              alt="Flag of USA"
              className="object-cover w-6 h-4 rounded "
            />
            <p className="text-xs text-gray-500">{countryCode}</p>
          </div>

          <InputField
            type=""
            className="w-full"
            label="Primary Phone Number"
            placeholder="Type your primary phone number"
            value={userInfo.phone || ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            errorMsg={errors.phone}
          />
        </div>
        {/* Secondary Phone Section */}
        <div className="relative flex gap-2">
          <div className="relative flex items-center justify-center gap-2 px-5 bg-white border rounded-lg cursor-pointer w-fit max-h-[58px]  ">
            <img
              src={usaFlagUrl}
              alt="Flag of USA"
              className="object-cover w-6 h-4 rounded"
            />
            <p className="text-xs text-gray-500">{countryCode}</p>
          </div>

          <InputField
            type="number"
            className="w-full"
            label="Secondary Phone Number"
            placeholder="Type your secondary phone number"
            value={userInfo.sPhone || ""}
            onChange={(e) => handleInputChange("sPhone", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDemographics;
