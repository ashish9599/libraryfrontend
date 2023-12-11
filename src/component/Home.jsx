import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/authHook";
import Allbook from "../pages/books/Allbook";
import Sidebar from "./Sidebar";

const Home = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="Home" style={{ display: "flex" }}>
      <Sidebar />
      <Allbook />
    </div>
  );
};

export default Home;
