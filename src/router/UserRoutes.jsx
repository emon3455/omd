import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const UserRoutes = ({children}) => {

    const user = useSelector((state) => state.userSlice.user);

    if(user && user?.role==='User'){
        return children
    }
    if(user?.role==='Admin'){
        return <Navigate to="/admin/users" replace></Navigate>;
    }

    return <Navigate to="/login" replace></Navigate>;
};


export default UserRoutes;