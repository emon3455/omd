import { useState } from "react";
import { useForgetPasswordMutation } from "../../redux/features/auth/authApiSlice";
import Button from "../../component/buttons/Button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [forgetPassword, { isLoading, isSuccess, isError }] =
    useForgetPasswordMutation();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const validateEmail = (email) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setErrorMsg("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address");
      return false;
    } else {
      setErrorMsg("");
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      try {
        await forgetPassword({ email }).unwrap();
        toast.success("Email Sent!");
      } catch (err) {
        console.error("Failed to reset password:", err);
        setErrorMsg(err.data.error);
        toast.error("Failed to send email. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="absolute top-5 left-5 text-white z-20">
        <Link to="/" className="text-secondary text-4xl">
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
            className="lucide lucide-house"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        </Link>
      </div>
      <div className="flex items-center min-h-screen justify-center p-5 md:p-0">
        <div className="p-8 w-full max-w-2xl rounded-2xl border">
          <p className="text-lg text-center mb-10 uppercase font-medium text-[#2B2F32]">
            Enter your email address to get reset password link
          </p>
          <form onSubmit={handleSubmit}>
            <div
              className={`border rounded-lg pb-2 px-4 transition ${
                errorMsg
                  ? "ring-2 ring-rose-500"
                  : "focus-within:ring-2 focus-within:ring-primary"
              }`}
            >
              <span className="text-gray-600 text-xs">Email</span>
              <input
                className="w-full  mx-auto focus:outline-none"
                placeholder="Type your email address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {isSuccess && (
              <p className="text-primary text-center  mt-4">
                Password reset email sent! Check your inbox for further
                instructions.
              </p>
            )}

            {isError ||
              (errorMsg && (
                <p className="text-red-500 text-center mt-4">{errorMsg}</p>
              ))}
            <div className="flex items-center justify-center mt-10 gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  type="submit"
                  className="min-w-32 hover:bg-primary"
                >
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="min-w-32" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
