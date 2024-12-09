import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoutes = ({children}) => {

    const user = useSelector((state) => state.userSlice.user);

    const location = useLocation();

    if(user && user?.role==='Admin'){
        return children
    }

    if(user?.role==='User'){
        return <Navigate to="/" replace></Navigate>;
    }

    return <Navigate to="/login" state={{from:location}} replace></Navigate>;
};


export default AdminRoutes;