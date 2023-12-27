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
import ProtectedRoutes from "./component/ProtecdedRoutes";
import LoadingBar from 'react-top-loading-bar'

import { useAuth } from "./hook/authHook";
import Footer from "./pages/footer/Footer";
const App = () => {
 
  const { progress } = useAuth();
  
  return (
    <div className="App">
      <BrowserRouter>
        <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Navbar />
        <Routes>
          {/* without user */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgetPassword" element={<Forget />} />

          <Route
            exact
            path="/UserP"
            element={
              <ProtectedRoutes>
                <UserP />
              </ProtectedRoutes>
            }
          />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />

          <Route
            exact
            path="/UpdateUser"
            element={
              <ProtectedRoutes>
                <UpdateProfile />
              </ProtectedRoutes>
            }
          />
              {/* <Route exact path="/SingleBook/:id" element={<BookDetail />} /> */}
          <Route
            exact
            path="/SingleBook/:id"
            element={
              <ProtectedRoutes>
                <BookDetail />
              </ProtectedRoutes>
            }
          />
            {/* <Route exact path="/placedOrder/:bookId" element={<BookOrder />} /> */}
          <Route
            exact
            path="/placedOrder/:bookId"
            element={
              <ProtectedRoutes>
              <BookOrder />
              </ProtectedRoutes>
            }
          />
            {/* <Route exact path="/orderDetail/:orderId" element={<OrderDetail />} /> */}
          <Route
            exact
            path="/orderDetail/:orderId"
            element={
              <ProtectedRoutes>
               <OrderDetail />
              </ProtectedRoutes>
            }
          />
            {/* <Route exact path="/myCart" element={<MyCart />} /> */}
          <Route
            exact
            path="/myCart"
            element={
              <ProtectedRoutes>
             <MyCart />
              </ProtectedRoutes>
            }
          />
            {/* <Route exact path="/myOrder" element={<Myorder />} /> */}
          <Route
            exact
            path="/myOrder"
            element={
              <ProtectedRoutes>
               <Myorder />
              </ProtectedRoutes>
            }
          />
            {/* <Route exact path="/mybook" element={<Mybook />} /> */}
          <Route
            exact
            path="/mybook"
            element={
              <ProtectedRoutes>
                <Mybook />
              </ProtectedRoutes>
            }
          />
          <Route exact path="*" element={<Page404 />} />
        </Routes>      
         <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default App;
