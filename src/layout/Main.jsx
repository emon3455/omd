import { Outlet, useLocation } from "react-router-dom";
import Header from "./Navbar/Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import CapsuleAnimation from "../component/capsuleLoading/CapsuleAnimation";

const Main = () => {
  const excludedPaths = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/register",
    "/users",
    "/payment-report",
  ];
  const location = useLocation();
  const { pathname } = location;

  const hideNavbar = excludedPaths.includes(pathname);

  const isExternalApiCalling = useSelector(
    (state) => state.isExternalApiCallingSlice.isExternalApiCalling
  );

  return (
    <main className="flex flex-col justify-between min-h-screen">
      {!hideNavbar && <Header />}
      {isExternalApiCalling ? (
        <div className="flex justify-center items-center">
          <CapsuleAnimation />
        </div>
      ) : (
        <div className={`flex-grow  mt-16 lg:mt-0`}>
          <Outlet />
        </div>
      )}

      {!hideNavbar && <Footer />}
    </main>
  );
};

export default Main;
