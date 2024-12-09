import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const user = useSelector((state) => state.userSlice.user);

  if (user?.email) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoutes;
