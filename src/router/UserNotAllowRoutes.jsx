import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserNotAllowRoutes = ({ children }) => {
  const user = useSelector((state) => state.userSlice.user);

  if (user?.email) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserNotAllowRoutes;
