import axios from "axios";
import { API_URLS, localToken } from "../utils";
import { getFormBody } from "../utils/apiform";
//  let uploading=false;
const token = window.localStorage.getItem(localToken);
const customFetch = async (url, { body, ...customConfig }) => {
  const headers = {
    "content-type": " application/json",
  };

  if (token) {
    headers.authToken = `${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const signUp = async ({ name, email, password }, userImage) => {
  const formdata = getFormBody({ name, email, password, userImage });
  const res = await axios.post(API_URLS.signUp(), formdata);

  return res.data;
};

export const UpdateUserPr = async ({ name, email }, userImage) => {
  const formdata = getFormBody({ name, email, userImage });
  const res = await axios.put(API_URLS.UpdateProfile(), formdata, {
    headers: {
      authToken: `${token}`,
    },
  });
  return res.data;
};
export const login = ({ email, password }) => {
  return customFetch(API_URLS.login(), {
    method: "POST",
    body: { email, password },
  });
};
export const changePassword = ({ email, newPassword, confirmPassword }) => {
  return customFetch(API_URLS.changePassword(), {
    method: "POST",
    body: { email, newPassword, confirmPassword },
  });
};
export const searchUser = (name) => {
  return customFetch(API_URLS.search(name), {
    method: "GET",
  });
};

export const getUser = () => {
  return customFetch(API_URLS.getUser(), {
    method: "GET",
  });
};

// Book api

export const getUserBook = () => {
  return customFetch(API_URLS.userBook(), {
    method: "GET",
  });
};
export const getSinglebook = (bookid) => {
  return customFetch(API_URLS.getSinglebook(bookid), {
    method: "GET",
  });
};
export const getAllbook = () => {
  return customFetch(API_URLS.getbook(), {
    method: "GET",
  });
};
export const searchBook = (name) => {
  return customFetch(API_URLS.searchbook(name), {
    method: "GET",
  });
};
export const searchCategory = (category) => {
  return customFetch(API_URLS.searchCategory(category), {
    method: "GET",
  });
};
export const searchBookBylanguage = (language) => {
  return customFetch(API_URLS.searchBylanguage(language), {
    method: "GET",
  });
};
export const addBook = async (
  { name, desciption, price, author, category, language, qty },
  available,
  bookImage
) => {
  const formdata = getFormBody({
    name,
    desciption,
    price,
    qty,
    author,
    category,
    language,
    available,
    bookImage,
  });
  const res = await axios.post(API_URLS.addBook(), formdata, {
    headers: {
      authToken: `${token}`,
    },
  });
console.log("inapi",res);
  return res.data;
};

export const updateBooks = async (
  id,
  { name, desciption, price, author, category, language ,qty},
  available,
  bookImage
) => {
  const formdata = getFormBody({
    name,
    desciption,
    price,
    qty,
    author,
    category,
    language,
    available,
    bookImage,
  });

  const res = await axios.put(
    API_URLS.updateBook(id),

    formdata,
    {
      headers: {
        authToken: `${token}`,
      },
    }
  );
  return res.data;
};
export const removeBook = (bookId) => {
  return customFetch(API_URLS.removeBook(bookId), {
    method: "DELETE",
  });
};

// Cart

export const removeCart = (cartId) => {
  return customFetch(API_URLS.removeCart(cartId), {
    method: "DELETE",
  });
};
export const deleteAll = () => {
  return customFetch(API_URLS.deleteAll(), {
    method: "DELETE",
  });
};
export const getSingleCart = (bookId) => {
  return customFetch(API_URLS.getSingleCart(bookId), {
    method: "GET",
  });
};
export const getUserCart = () => {
  return customFetch(API_URLS.getCart(), {
    method: "GET",
  });
};
export const addBookToCart = (bookId) => {
  return customFetch(API_URLS.addtoCart(), {
    method: "POST",
    body: { bookId },
  });
};

// Order
export const placedOrder = (bookId, price, qty) => {
  return customFetch(API_URLS.placedOrder(), {
    method: "POST",
    body: { bookId, price, qty },
  });
};
export const getUserOrder = () => {
  return customFetch(API_URLS.getUserOrder(), {
    method: "GET",
  });
};
export const cancelOrder = (orderId) => {
  return customFetch(API_URLS.cancelOrder(orderId), {
    method: "DELETE",
  });
};
export const getSingleOrder = (orderId) => {
  return customFetch(API_URLS.getSingleOrder(orderId), {
    method: "GET",
  });
};



// inventory
export const addInventory = (bookId, totalBook) => {
  return customFetch(API_URLS.addInventory(), {
    method: "POST",
    body: { bookId, totalBook },
  });
};
export const bookSold = (bookId, bookSold) => {
  return customFetch(API_URLS.bookSold(), {
    method: "POST",
    body: { bookId, bookSold },
  });
};
export const getSinglebookInventory = (bookId) => {
  return customFetch(API_URLS.getSinglebookInventory(bookId), {
    method: "GET",
  });
};
