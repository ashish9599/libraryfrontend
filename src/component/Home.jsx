import Allbook from "../pages/books/Allbook";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Allbook />
      </div>
    </>
  );
};

export default Home;
