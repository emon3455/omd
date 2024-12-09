import { useState } from "react";
import { useChangePasswordMutation } from "../../redux/features/auth/authApiSlice";
import Button from "../../component/buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useSelector } from "react-redux";

const ChangePasswordPage = () => {

  const user = useSelector((state) => state.userSlice.user);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [showCurrentPassword, setShowCurrenPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const validateFields = () => {
    const newErrors = {};
    const navigate = useNavigate();
    const user = useSelector((state) => state.userSlice.user);

    if (!currentPassword)
      newErrors.currentPassword = "Current password is required.";

    if (!newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validateFields()) return;

    try {
      setMessage(null);
      await changePassword({
        userId: user?._id,
        currentPassword,
        newPassword,
      }).unwrap();

      if(user.role==="User"){
        navigate("/");
      }

      setMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(error.data?.error || "An error occurred.");
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 lg:h-[65vh] p-5 md:p-0">
      <div className="p-8 w-full max-w-2xl rounded-lg border ">
        <p className="text-lg mb-10 uppercase font-semibold text-[#2B2F32]">
          Change your password
        </p>

        <div
          className={`relative border rounded-lg pb-2 px-4 mt-6 ${
            errors.currentPassword
              ? "ring-2 ring-rose-500"
              : "focus-within:ring-2 focus-within:ring-primary"
          }`}
        >
          <span className="text-gray-600 text-xs">Current Password</span>
          <input
            className="w-full focus:outline-none pr-5"
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <span
            onClick={() => setShowCurrenPassword(!showCurrentPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {currentPassword &&
              (showCurrentPassword ? (
                <Eye size={20} className="text-gray-600" />
              ) : (
                <EyeOff size={20} className="text-gray-600" />
              ))}
          </span>
        </div>
        {errors.currentPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
        )}

        <div
          className={`relative border rounded-lg pb-2 px-4 mt-6 ${
            errors.newPassword
              ? "ring-2 ring-rose-500"
              : "focus-within:ring-2 focus-within:ring-primary"
          }`}
        >
          <span className="text-gray-600 text-xs">New Password</span>
          <input
            className="w-full focus:outline-none pr-5"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {newPassword &&
              (showNewPassword ? (
                <Eye size={20} className="text-gray-600" />
              ) : (
                <EyeOff size={20} className="text-gray-600" />
              ))}
          </span>
        </div>
        {errors.newPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
        )}

        <div
          className={`relative border rounded-lg pb-2 px-4 mt-6 ${
            errors.confirmPassword
              ? "ring-2 ring-rose-500"
              : "focus-within:ring-2 focus-within:ring-primary"
          }`}
        >
          <span className="text-gray-600 text-xs">Confirm New Password</span>
          <input
            className="w-full focus:outline-none pr-5    "
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {confirmPassword &&
              (showConfirmPassword ? (
                <Eye size={20} className="text-gray-600" />
              ) : (
                <EyeOff size={20} className="text-gray-600" />
              ))}
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}

        {message && (
          <p
            className={`text-center mt-2 ${
              message.includes("successfully")
                ? "text-primary"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex items-center justify-center mt-10  gap-4">
          <Link to="/login">
            <Button variant="outline" className="min-w-32 hover:bg-primary">
              Cancel
            </Button>
          </Link>{" "}
          <Button
            className="min-w-32 "
            onClick={handleChangePassword}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
