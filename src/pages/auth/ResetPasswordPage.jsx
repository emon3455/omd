import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Button from "../../component/buttons/Button";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};

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

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or missing password reset token.");
    }
  }, [token]);

  const handleResetPassword = async () => {
    if (!validateFields()) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://optimalmd-server.vercel.app/api/auth/resetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred. Please try again.");
      }

      setMessage("Password reset successfully!");
      setNewPassword("");
      setConfirmPassword("");

      // Navigate to /login after a delay to show success message
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.message);
      console.error("Error resetting password:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 md:p-0">
      <div className="p-8 w-full max-w-2xl rounded-lg border">
        <p className="text-lg mb-10 uppercase font-semibold text-[#2B2F32]">
          Reset your password
        </p>

        {message && (
          <p
            className={`text-center ${
              message.includes("successfully")
                ? "text-primary"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* New Password Field */}
        <div
          className={`relative border rounded-lg pb-2 px-4 mt-6 ${
            errors.newPassword
              ? "ring-2 ring-rose-500"
              : "focus-within:ring-2 focus-within:ring-primary"
          }`}
        >
          <span className="text-gray-600 text-xs">New Password</span>
          <div className="relative">
            <input
              className="w-full focus:outline-none pr-5"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {newPassword &&
              (showPassword ? (
                <Eye
                  size={20}
                  className="text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeOff
                  size={20}
                  className="text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ))}
          </span>
        </div>
        {errors.newPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
        )}

        {/* Confirm Password Field */}
        <div
          className={`relative border rounded-lg pb-2 px-4 mt-6 ${
            errors.confirmPassword
              ? "ring-2 ring-rose-500"
              : "focus-within:ring-2 focus-within:ring-primary"
          }`}
        >
          <span className="text-gray-600 text-xs">Confirm New Password</span>
          <div className="relative">
            <input
              className="w-full focus:outline-none pr-5"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {confirmPassword &&
              (showConfirmPassword ? (
                <Eye
                  size={20}
                  className="text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <EyeOff
                  size={20}
                  className="text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ))}
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}

        <div className="flex items-center justify-center mt-10 gap-4">
          <Link to="/login">
            <Button variant="outline" className="min-w-32 hover:bg-primary">
              Cancel
            </Button>
          </Link>
          <Button
            className="min-w-32"
            onClick={handleResetPassword}
            disabled={isLoading || !token}
          >
            {isLoading ? "Reseting..." : "Reset"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
