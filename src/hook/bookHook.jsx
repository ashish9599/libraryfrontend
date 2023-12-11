import { useContext, useEffect, useState } from "react";

import { BookContext } from "../Provider/bookProvider";
import {
  addBook,
  getAllbook,
  removeBook,
  searchBook,
  searchBookBylanguage,
  searchCategory,
} from "../api/api";

export const useBook = () => {
  return useContext(BookContext);
};

export const useBookProvider = () => {
  const [book, setbook] = useState(null);
  // const [render, setRender] = useState(false);

  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await getAllbook();
        if (res.succuss) {
          setbook(res.book);
        }
      };
      fetch();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addBookfrom = async (book, available, bookImage) => {
    try {
      const res = await addBook(book, available, bookImage);

      if (res.succuss) {
        setbook(res.book);
        // setRender(!render)
      }
      return res;
    } catch (error) {
      console.error(error);
    }
  };
  const seachByCategory = async (category) => {
    try {
      const res = await searchCategory(category);

      if (res.succuss) {
        setbook(res.book);
        // setRender(!render)
      }
      return res;
    } catch (error) {
      console.error(error);
    }
  };
  const searchBylanguage = async (language) => {
    try {
      const res = await searchBookBylanguage(language);

      if (res.succuss) {
        setbook(res.book);
        // setRender(!render)
      }
      return res;
    } catch (error) {
      console.error(error);
    }
  };
  const searchbookByname = async (name) => {
    try {
      const res = await searchBook(name);

      if (res.succuss) {
        setbook(res.book);
        // setRender(!render)
      }
      return res;
    } catch (error) {
      console.error(error);
    }
  };
  const searchhome = async () => {
    try {
      const res = await getAllbook();

      if (res.succuss) {
        setbook(res.book);
        // setRender(!render)
      }
      return res;
    } catch (error) {
      console.error(error);
    }
  };
  const REMOVEBook = async (id) => {
    try {
      const res = await removeBook(id);

      if (res.succuss) {
        setbook(res.book);
        // setRender(!render)
      }
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    allbook: book,
    addBookfrom,
    seachByCategory,
    searchbookByname,
    searchhome,
    searchBylanguage,
    REMOVEBook,
    // search,signUp
  };
};
