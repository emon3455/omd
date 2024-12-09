import { useState, useEffect } from "react";
import CapsuleAnimation from "../../../component/capsuleLoading/CapsuleAnimation";
import Modal from "../../../component/modals/Modal";
import Button from "../../../component/buttons/Button";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PricingAdmin = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // Plan to delete
  const navigate = useNavigate();

  // Fetch plans from the API on component mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/plans");
        if (!response.ok) {
          throw new Error("Failed to fetch plans");
        }
        const data = await response.json();
        setPlans(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleDeleteRequest = (id) => {
    setSelectedPlan(id); // Set the plan to delete
    setIsModalVisible(true); // Show the modal
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/plans/${selectedPlan}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the plan");
      }

      // Remove the deleted plan from the state
      setPlans((prevPlans) =>
        prevPlans.filter((plan) => plan._id !== selectedPlan)
      );
      console.log("Deleted plan with ID:", selectedPlan);
    } catch (err) {
      console.error("Error deleting plan:", err.message);
    } finally {
      setIsModalVisible(false); // Hide the modal
      setSelectedPlan(null); // Reset selected plan
    }
  };

  const cancelDelete = () => {
    setIsModalVisible(false); // Hide the modal
    setSelectedPlan(null); // Reset selected plan
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <CapsuleAnimation />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto my-8 p-4">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold mb-4">Plan Management</h2>
        <Button onClick={() => navigate("/admin/pricing/add-new")}>
          <Plus size={18} />
          Add Plan
        </Button>
      </div>

      <table className="min-w-full table-auto">
        <thead className="border-l border-r border-l-primary border-r-primary">
          <tr className="bg-primary text-white">
            <th className="px-4 py-2 text-left w-1/4">Plan Name</th>
            <th className="px-4 py-2 text-left w-1/4">Price</th>
            <th className="px-4 py-2 text-left w-1/4">Duration</th>
            <th className="px-4 py-2 text-left w-1/4">Actions</th>
          </tr>
        </thead>
        <tbody className="border border-t-0">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <tr key={plan._id} className="border-b">
                <td className="px-4 py-2">{plan.name}</td>
                <td className="px-4 py-2">${plan.price}</td>
                <td className="px-4 py-2">
                  {plan?.duration?.value} {plan?.duration?.unit}
                </td>
                <td className="px-4 py-2 flex gap-2 ">
                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate(`/admin/pricing/update/${plan._id}`, {
                        state: plan,
                      })
                    }
                    className=""
                  >
                    <Edit size={16} /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteRequest(plan._id)}
                  >
                    <Trash2 size={18} /> Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500 italic">
                No plans found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      <Modal isOpen={isModalVisible} onClose={cancelDelete}>
        <div className="p-4 text-center">
          <h3 className="text-lg font-bold">Confirm Deletion</h3>
          <p className="mt-2">Are you sure you want to delete this plan?</p>
          <div className="flex justify-center mt-4 gap-4">
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Confirm
            </button>
            <button
              onClick={cancelDelete}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PricingAdmin;
