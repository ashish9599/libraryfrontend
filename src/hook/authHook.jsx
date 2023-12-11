import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/authPovider";
import { localToken } from "../utils";
import { UpdateUserPr, getUser, login, searchUser } from "../api/api";
import { toast } from "react-toastify";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [userSearch, setSearchUser] = useState([]);
  useEffect(() => {
    try {
      const fetchContact = async () => {
        const token = localStorage.getItem(localToken);
        if (token) {
          const response = await getUser();
          if (response.succuss) {
            setUser(response.user);
          } else {
            toast.error(response.message);
          }
        }
      };
      fetchContact();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem(localToken);
  };

  const UpdateUser = async (credential, userImage) => {
    try {
      const res = await UpdateUserPr(credential, userImage);

      if (res.succuss) {
        setUser(res.user);
      }
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const search = async (name) => {
    try {
      const res = await searchUser(name);
      if (res.succuss) {
        setSearchUser(res.user);
        toast.success(res.message);
        return true;
      } else {
        toast.error(res.message);
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const loginUser = async (credential) => {
    try {
      const res = await login(credential);
      if (res.succuss) {
        localStorage.setItem("token", res.token);
        setUser(res.user);
      }

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user: user,
    logout,
    loginUser,
    userSearch,
    search,
    UpdateUser,
    // forget,search,signUp
  };
};
