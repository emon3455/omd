import {  useState } from "react";
import InputField from "../../component/inputs/Input2";
import SelectInput from "../../component/inputs/SelectInput";
import DateInput from "../../component/inputs/DateInput";
import formatDate from "../../utils/formateDate";

const DependentDemographics = ({
  selectedDependentIdx,
  dependents,
  setDependents,
  errors,
  setErrors,
}) => {
  const [value, setValue] = useState({
    startDate: dependents[selectedDependentIdx].dob || null,
    endDate: null,
  });

  const usaFlagUrl =
    "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"; // USA flag image URL
  const countryCode = "+1"; // USA country code

  const handleInputChange = (field, value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [selectedDependentIdx]: {
        ...prevErrors[selectedDependentIdx],
        [field]: "", // Clear error for the specific field
      },
    }));

    setDependents((prevDependents) =>
      prevDependents.map((dependent, index) =>
        index === selectedDependentIdx
          ? {
              ...dependent,
              [field]: value,
            }
          : dependent
      )
    );
  };

  return (
    <div className="w-full">
      <div className="w-full space-y-3 rounded-lg md:space-y-4 lg:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputField
            label="First Name"
            placeholder="Type your first name"
            value={dependents[selectedDependentIdx]?.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            errorMsg={errors[selectedDependentIdx]?.firstName}
          />

          <InputField
            label="Last Name"
            placeholder="Type your last name"
            value={dependents[selectedDependentIdx]?.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            errorMsg={errors[selectedDependentIdx]?.lastName}
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
            selectedOption={dependents[selectedDependentIdx].sex}
            onSelect={(value) => {
              handleInputChange("sex", value.label);
            }}
            errorMsg={errors[selectedDependentIdx]?.sex}
          />

          <DateInput
            useRange={false}
            asSingle={true}
            inputClassName="w-full focus:outline-none  "
            primaryColor={"green"}
            displayFormat="MM/DD/YYYY"
            value={value}
            placeholder={
              dependents[selectedDependentIdx].dob
                ? formatDate(dependents[selectedDependentIdx].dob)
                : "Select a Date"
            }
            onChange={(newValue) => {
              setValue(newValue);
              handleInputChange("dob", newValue.startDate);
            }}
            errorMsg={errors[selectedDependentIdx]?.dob || ""}
          />
        </div>
        <InputField
          label="Email (optional)"
          placeholder="Type your email address"
          value={dependents[selectedDependentIdx]?.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          // errorMsg={errors[selectedDependentIdx]?.email}
        />

        {/* Primary Phone Section */}
        <div className="relative flex gap-2">
          <div className="relative flex items-center justify-center gap-2 px-5 bg-white border rounded-lg cursor-pointer w-fit max-h-[58px]">
            <img
              src={usaFlagUrl}
              alt="Flag of USA"
              className="object-cover w-6 h-4 rounded"
            />
            <p className="text-xs text-gray-500">{countryCode}</p>
          </div>

          <InputField
            type=""
            className="w-full"
            label="Primary Phone Number (optional)"
            placeholder="Type your primary phone number"
            value={dependents[selectedDependentIdx]?.phone || ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            // errorMsg={errors[selectedDependentIdx]?.phone}
          />
        </div>

        {/* Secondary Phone Section */}
        <div className="relative flex gap-2 w-full">
          <div className="relative flex items-center justify-center gap-2 px-5 bg-white border rounded-lg cursor-pointer w-fit ">
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
            label="Secondary Phone Number (optional)"
            placeholder="Type your secondary phone number"
            value={dependents[selectedDependentIdx]?.sPhone || ""}
            onChange={(e) => handleInputChange("sPhone", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default DependentDemographics;
