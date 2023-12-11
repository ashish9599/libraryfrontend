import { createContext } from "react";
import { useAuthProvider } from "../hook/authHook";

const intialState = {
  user: null,
  logout: () => {},
  UpdateUser: () => {},
  forget: () => {},
  search: () => {},
  loginUser: () => {},
  signUp: () => {},
  userSearch: [],
};
export const AuthContext = createContext(intialState);
export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
