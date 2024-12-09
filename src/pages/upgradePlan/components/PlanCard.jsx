import { CircleCheckBig } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserPlanMutation } from "../../../redux/features/auth/authApiSlice";
import { setUser } from "../../../redux/features/auth/authSlice";
import { successAlert } from "../../../utils/allertFunction";

const PlanCard = ({
  title,
  price,
  priceUnit,
  description,
  features,
  buttonText,
  isCurrentPlan,
  tag,
  plan,
}) => {
  const user = useSelector((state) => state.userSlice.user);
  const [updateUserPlan, { isLoading }] = useUpdateUserPlanMutation();
  const dispatch = useDispatch();

  const handlePlanUpdate = async (id, plan) => {
    const data = {
      userId: id,
      plan: plan,
    };
    const response = await updateUserPlan(data).unwrap();
    dispatch(setUser({ user: response.user }));
    successAlert({title:"Successfully done!",text:`Your plan is successfully updated to Access Plus`})
  };

  return (
    <div
      className={`border border-gray-200 rounded-lg shadow-md p-6 max-w-sm  grid justify-items-center ${
        isCurrentPlan ? "bg-white text-[#00192B]" : "bg-[#081B31] text-white"
      }`}
    >
      {tag && <p className="font-semibold  pb-3 justify-self-end">{tag}</p>}
      <h3 className="text-xl font-semibold   ">{title}</h3>
      <div className="text-center   mt-6">
        <span className="text-5xl font-semibold ">${price}</span>
        <span className="text-lg ">{priceUnit}</span>
      </div>
      <p className="text-center text-sm  mt-2">{description}</p>
      <ul className="mt-4 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CircleCheckBig size={20} className="text-primary mt-1 w-fit" />
            {feature}
          </li>
        ))}
      </ul>
      {user.status === "Active" && (
        <button
          className={`mt-6 text-center justify-self-center px-6 py-3 rounded-lg  font-semibold ${
            isCurrentPlan
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-100"
          } ${user.plan === "Plus" && plan === "Trial" ? "hidden" : ""}`}
          disabled={isCurrentPlan || isLoading}
          onClick={() => handlePlanUpdate(user?._id, plan)}
        >
          {isLoading ? "Updating..." : buttonText}
        </button>
      )}
    </div>
  );
};

export default PlanCard;
