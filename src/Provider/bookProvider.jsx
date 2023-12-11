import { createContext } from "react";
import { useBookProvider } from "../hook/bookHook";

const intialState = {
  allbook: null,
  addBookfrom: () => {},
  seachByCategory: () => {},
  searchbookByname: () => {},
  searchhome: () => {},
  searchBylanguage: () => {},
  REMOVEBook: () => {},
  //   userSearch: [],
};
export const BookContext = createContext(intialState);
export const BookProvider = ({ children }) => {
  const auth = useBookProvider();
  return <BookContext.Provider value={auth}>{children}</BookContext.Provider>;
};
