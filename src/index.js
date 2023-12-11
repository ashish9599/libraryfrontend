import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Provider/authPovider";
import { BookProvider } from "./Provider/bookProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BookProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BookProvider>
    <ToastContainer />
  </React.StrictMode>
);
