import React from "react";
import PlanCard from "./components/PlanCard";
import { CornerDownRight, Tag } from "lucide-react";
import CButton from "../../utils/CButton/CButton";
import { useDispatch, useSelector } from "react-redux";
import capitalizeWords from "../../utils/CapitalizeText";
import { useUpdateUserStatusMutation } from "../../redux/features/UsersManagement/getUsersSlice";
import { setUser } from "../../redux/features/auth/authSlice";
import { errorAlert, successAlert } from "../../utils/allertFunction";
import LineReply from "../../assets/svgs/LineReply";

function UpgradePlan() {
  const user = useSelector((state) => state.userSlice.user);
  const fullName = user?.firstName + " " + user?.lastName;
  const [updateUserStatus, { isLoading: statusLoading }] =
    useUpdateUserStatusMutation();
  const dispatch = useDispatch();

  const plans = [
    {
      title: "Trial",
      price: 10,
      priceUnit: "10days",
      description: "Includes 125 Medications at no cost",
      features: [
        "Plan Covers the Entire Family",
        "Unlimited Urgent Care Visits (Virtual)",
        "FREE Annual Bloodwork through Quest (In Person)",
        "Behavioral Health & Talk Therapy Included",
      ],
      tag: "",
      plan: "Trial",
    },
    {
      title: "ACCESS PLUS",
      price: 97,
      priceUnit: "/month",
      description: "Includes 125 Medications at no cost",
      features: [
        "Plan Covers the Entire Family",
        "Unlimited Urgent Care Visits (Virtual)",
        "FREE Annual Bloodwork through Quest (In Person)",
        "Behavioral Health & Talk Therapy Included",
      ],
      tag: "Popular",
      plan: "Plus",
    },
  ];
  console.log(user.status)

  const handleActivateDeactivateButton = async (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Canceled" : "Active";

    try {
      const resp = await updateUserStatus({
        userId,
        status: newStatus,
      }).unwrap();
      dispatch(setUser({ user: resp.user }));
      successAlert({title:"Successfully done!",text:`Plan Account is successfully ${newStatus} now!`})
    } catch (error) {
      console.log("Error updating status:", error);
      errorAlert({
        title: "Failed to change user status",
        text: `${
          error.data.error
            ? error.data.error
            : "Something Went wrong, Please try again!"
        }`,
      });
    }
  };

  return (
    <>
      <section className="px-5 lg:px-0 lg:flex  justify-center items-center gap-20">
        <div className="p-10  text-center space-y-4">
          <h1 className="text-5xl text-primary">Pricing Plans</h1>
          <p>You are currently on : {user?.plan === "Plus" ? "Access Plus (Family Plan)" : "Trial"}</p>
          <div className="max-w-sm mx-auto border rounded-lg shadow-md p-6 bg-white">
            <h3 className="text-lg font-semibold text-center text-gray-800">
              Fee Breakdown
            </h3>
            <hr className="my-4 border-gray-300" />
            <div className="flex justify-between font-semibold text-gray-600 mb-2">
              <span>Name</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-gray-700 font-bold text-xl">
                    {capitalizeWords(fullName)}
                  </span>
                </div>
                <span className="text-green-600 font-semibold"></span>
              </div>
              {user?.dependents.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-x-2">
                    <div className="">
                      {item?.firstName && (
                        <LineReply className="fill-green-600" />
                      )}
                      <span className="text-gray-700">
                        {capitalizeWords(
                          item?.firstName + " " + item?.lastName
                        )}
                      </span>
                    </div>
                    {item.firstName && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-move-right"
                      >
                        <path d="M18 8L22 12L18 16" />
                        <path d="M2 12H22" />
                      </svg>
                    )}
                    {item.firstName && <span>{item.relation}</span>}
                  </div>
                </div>
              ))}
            </div>
            <hr className="my-4 border-gray-300" />
            {/* <div className="flex justify-between items-center font-semibold text-lg text-gray-800">
              <span>Total</span>
              <span className="text-green-600">${totalAmount}</span>
            </div> */}
          </div>
          <CButton
            variant={`${user.status==="Active"?"outline":"contained"}`}
            className={"mx-auto"}
            onClick={async () =>
              await handleActivateDeactivateButton(user._id, user?.status)
            }
          >
            {statusLoading
              ? "Updating..."
              : `${
                  user?.status === "Active"
                    ? " Deactivate Account"
                    : "Activate Account"
                }`}
          </CButton>
        </div>
        <div className="grid lg:flex justify-center gap-5">
          {plans.map((plan) => (
            <PlanCard
              key={plan.title}
              title={plan.title}
              price={plan.price}
              priceUnit={plan.priceUnit}
              description={plan.description}
              features={plan.features}
              buttonText={user.plan == plan.plan ? "Current Plan" : "Upgrade"}
              isCurrentPlan={user.plan === plan.plan}
              tag={plan.tag}
              plan={plan.plan}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default UpgradePlan;
