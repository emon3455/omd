import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApiSlice";
import { setUser } from "../../redux/features/auth/authSlice";
import Logo from "../../assets/logo.svg";
import Input from "../../component/inputs/Input";
import Button from "../../component/buttons/Button";
import Checkbox from "../../component/inputs/Checkbox";
import treeImg from "../../assets/tree.png";
import treeImgDark from "../../assets/tree-dark.png";
import sundoriOne from "../../assets/women-1.png";
import sundoriTwo from "../../assets/women-2.png";
import sundoriThree from "../../assets/women-3.png";
import Divider from "../../component/dividers/Divider";
import toast from "react-hot-toast";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [signingIn, setSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setSigningIn(true);
      setLoginError(null);
      const response = await login({ email, password }).unwrap();
      dispatch(setUser({ user: response.user, rememberMe }));
      if(response.user.role==="Admin"){
        navigate("/admin/users");
      }else{
        navigate("/");
      }
    } catch (error) {
      setLoginError(error.data.error || "Login Failed!");
      console.error("Error while logging in:", error);
    } finally {
      setSigningIn(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="py-5 md:py-0">
      <div className="grid items-center   md:min-h-screen grid-cols-1 gap-10 md:gap-24 p-2 md:grid-cols-2 md:p-0">
        <div className="flex flex-col  md:ml-auto  h-fit  ">
          <img src={Logo} className="mb-4 h-12 md:h-14" alt="Logo" />
          <h1 className="text-2xl md:text-4xl font-medium text-center">
            Welcome to <br /> OptimalMD{" "}
            <span className="text-blue-500">Member Portal</span>!
          </h1>
          <div className="hidden md:flex items-center justify-center gap-2 mt-14 ">
            <img src={sundoriOne} alt="" className=" w-14" />
            <img src={sundoriTwo} alt="" className="-ml-6 w-14" />
            <img src={sundoriThree} alt="" className="-ml-6 w-14" />
            <p className="text-xl font-medium">
              {" "}
              <span className="text-blue-500">3k+ </span>people joined us, now
              it’s your turn
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-start h-fit ">
          <div className="p-8  rounded-lg shadow-md border w-full max-w-sm space-y-4 bg-[#D9F6DB]">
            <div className="flex justify-between mb-8">
              <div>
                <h1 className="mb-4 text-3xl font-medium">Login</h1>
                {/* <h5 className="font-medium ">
                  <Link to="/register" className="text-primary">
                    New User?
                  </Link>{" "}
                  {""}
                  Create an account
                </h5> */}
              </div>
              <img src={treeImg} alt="" className="h-24 -mt-2" />
            </div>
            {loginError && <p className="text-sm text-red-500 font-bold text-center">{loginError}</p>}

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="new-off"
              className="h-12 mb-4"
            />

            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-12 pr-9"
              icon={
                password ? (
                  showPassword ? (
                    <Eye
                      size={18}
                      onClick={() => setShowPassword(false)}
                      className="relative  top-[0.35rem] text-gray-600"
                    />
                  ) : (
                    <EyeOff
                      size={18}
                      onClick={() => setShowPassword(true)}
                      className="relative  top-[0.35rem] text-gray-600"
                    />
                  )
                ) : (
                  <LockKeyhole
                    size={18}
                    className="relative  top-[0.35rem] text-gray-600"
                  />
                )
              }
            />

            <div className="flex items-center justify-between ">
              <Checkbox
                label={<span className="text-gray-600">Remember Me</span>}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />

              <Link to="/forgot-password" className="font-medium text-blue-500">
                Forgot Password?
              </Link>
            </div>

            <Button
              onClick={handleLogin}
              disabled={signingIn}
              className="my-10 px-14"
            >
              {signingIn ? "Signing in..." : "Sign In"}
            </Button>
            <div className="mt-2">
            <Link to='/register' className="font-medium text-blue-500 "> Do not have an account? Create an account </Link>
            </div>
            <p className="text-sm text-center text-gray-400">
              Built by Neurologically. All rights reserved. Version: 1.0.0.30807
              Date: 08-Nov-2024
            </p>
            <Divider label={<img src={treeImgDark} className="h-5" />} />
            <p className="text-sm text-center text-gray-400">
              For any queries or issues, please email us at{" "}
              <a href="mailto:someone@example.com"
                className="text-blue-500 cursor-copy hover:text-blue-600"
                onClick={() => {
                  navigator.clipboard.writeText("support@optimalmd.com");
                  toast.success("Email Copied!");
                }}
              >
                support@optimalmd.com
              </a>{" "}
              and we will respond in one business day.
            </p>
          </div>
        </div>
        <div className="flex  md:hidden items-center justify-center gap-2 h-fit">
          <img src={sundoriOne} alt="" className=" w-8" />
          <img src={sundoriTwo} alt="" className="-ml-6 w-8" />
          <img src={sundoriThree} alt="" className="-ml-6 w-8" />
          <p className="text-sm font-medium">
            {" "}
            <span className="text-blue-500 ">3k+ </span>people joined us, now
            it’s your turn
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
