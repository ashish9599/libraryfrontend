import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Page404 from "./pages/Page404";
import Home from "./component/Home";
import UpdateProfile from "./pages/Users/UpdateProfile";
import Login from "./pages/Users/Login";
import Forget from "./pages/Users/ForgetP";
import Register from "./pages/Users/Register";
import UserP from "./pages/Users/User";
import BookDetail from "./pages/books/BookDetail";
import Mybook from "./pages/books/Mybook";
import MyCart from "./pages/Cart/MyCart";
import Myorder from "./pages/orders/Myorder";

import BookOrder from "./pages/orders/BookOrder";
import OrderDetail from "./pages/orders/OrderDetail";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/UserP" element={<UserP />} />
          <Route exact path="/UpdateUser" element={<UpdateProfile />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgetPassword" element={<Forget />} />
          {/* book routes */}
          {/* Private router only on userp,update */}

          <Route exact path="/SingleBook/:id" element={<BookDetail />} />
          <Route exact path="/mybook" element={<Mybook />} />
          <Route exact path="/myCart" element={<MyCart />} />
          <Route exact path="/myOrder" element={<Myorder />} />
          <Route exact path="/placedOrder/:bookId" element={<BookOrder />} />
          <Route exact path="/orderDetail/:orderId" element={<OrderDetail />} />

          <Route exact path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
