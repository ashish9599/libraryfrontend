import { Navigate } from "react-router-dom";

// import { Outlet } from "react-router-dom";
import { useAuth } from "../hook/authHook";
const ProtectedRoutes = ({ children }) => {
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoutes;
