import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InputField from "../../../component/inputs/Input2";
import Button from "../../../component/buttons/Button";
import { Plus } from "lucide-react";
import SelectInput from "../../../component/inputs/SelectInput";
import { successAlert } from "../../../utils/allertFunction";

const UpdatePlan = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    duration: { value: "", unit: "" },
    subtitle: "",
    benefits: {},
  });

  const [plan, setPlan] = useState({
    name: "",
    price: "",
    subtitle: "",
    duration: { value: "", unit: "" },
    benefits: [""],
  });

  const durationTypeOptions = [
    { value: "days", label: "Days" },
    { value: "months", label: "Months" },
    { value: "years", label: "Years" },
  ];
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setPlan((prev) => ({ ...prev, [field]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleBenefitChange = (index, value) => {
    const updatedBenefits = [...plan.benefits];
    updatedBenefits[index] = value;

    setPlan((prev) => ({ ...prev, benefits: updatedBenefits }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      benefits: { ...prevErrors.benefits, [index]: "" },
    }));
  };

  const handleAddNewBenefit = () => {
    const lastBenefit = plan.benefits[plan.benefits.length - 1];
    if (lastBenefit && lastBenefit.trim()) {
      setPlan((prev) => ({ ...prev, benefits: [...prev.benefits, ""] }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        benefits: {
          ...prevErrors.benefits,
          [plan.benefits.length - 1]:
            "Please fill this benefit before adding a new one.",
        },
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      price: "",
      duration: { value: "", unit: "" },
      subtitle: "",
      benefits: {},
    };

    if (!plan.name?.trim()) {
      newErrors.name = "Plan name is required.";
      isValid = false;
    }
    if (!plan.price) {
      newErrors.price = "Valid price is required.";
      isValid = false;
    }
    if (!plan.duration?.value?.trim()) {
      newErrors.duration = "Duration value is required.";
      isValid = false;
    }
    if (!plan.duration?.unit?.trim()) {
      newErrors.duration = "Duration type is required.";
      isValid = false;
    }
    if (!plan.subtitle?.trim()) {
      newErrors.subtitle = "Subtitle is required.";
      isValid = false;
    }

    plan.benefits.forEach((benefit, index) => {
      if (!benefit?.trim()) {
        newErrors.benefits[index] = "Benefit description is required.";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/plans/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(plan),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error updating plan:", errorData.message);
          return;
        }

        await response.json();

        successAlert({
          title: "Plan Updated Successfully!",
        });
      } catch (error) {
        console.error("Error during fetch request:", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/plans/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch plan details");
        }

        const data = await response.json();

        setPlan({
          name: data.name,
          price: data.price,
          subtitle: data.subtitle,
          duration: data.duration,
          benefits: data.benefits,
        });
      } catch (error) {
        console.error("Error fetching plan details:", error.message);
      }
    };
    fetchPlanDetails();
  }, [id]);

  return (
    <div className="max-w-lg mx-auto mb-16 space-y-4">
      <div className="border rounded-lg p-5 space-y-4">
        <h3 className="text-lg uppercase font-medium">Update Plan</h3>

        <InputField
          label="Plan's Name"
          placeholder="What is your plan name?"
          value={plan.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          errorMsg={errors.name}
        />

        <InputField
          type="number"
          label="Price"
          placeholder="How much do you want to charge?"
          value={plan.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
          errorMsg={errors.price}
        />

        <div className="grid grid-cols-[4fr_2fr] gap-2">
          <InputField
            type="number"
            label="Plan Duration"
            placeholder="Enter duration"
            value={plan?.duration?.value}
            onChange={(e) => {
              setErrors((prev) => ({
                ...prev,
                duration: { ...prev.duration, value: "" },
              }));
              setPlan((prev) => ({
                ...prev,
                duration: { ...prev.duration, value: e.target.value },
              }));
            }}
            errorMsg={errors.duration.value}
          />
          <SelectInput
            options={durationTypeOptions}
            label="Duration Type"
            selectedOption={plan?.duration?.unit}
            onSelect={(selectedOption) =>
              setPlan((prev) => ({
                ...prev,
                duration: { ...prev.duration, unit: selectedOption.value },
              }))
            }
            placeholder="Select"
            errorMsg={errors.duration.unit}
          />
        </div>

        <InputField
          label="Subtitle"
          placeholder="Write a sentence on your plan..."
          value={plan.subtitle}
          onChange={(e) => handleInputChange("subtitle", e.target.value)}
          errorMsg={errors.subtitle}
        />

        {plan.benefits.length > 0 && (
          <h3 className="text-lg uppercase font-medium">Benefits</h3>
        )}
        {plan.benefits.map((benefit, index) => (
          <InputField
            key={index}
            label={`Benefit ${index + 1}`}
            placeholder="Describe this benefit..."
            value={benefit}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
            errorMsg={errors.benefits[index]}
          />
        ))}

        <Button
          variant="outline"
          onClick={handleAddNewBenefit}
          className="uppercase"
        >
          Add More Benefit
        </Button>
      </div>

      <Button
        onClick={handleSubmit}
        className="ml-auto w-full uppercase"
        disabled={loading}
      >
        <Plus size={18} className={loading && "hidden"} />{" "}
        {loading ? "Updating..." : "Update This Plan"}
      </Button>
    </div>
  );
};

export default UpdatePlan;
