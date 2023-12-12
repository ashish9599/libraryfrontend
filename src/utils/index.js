// export const API_ROOT = "https://apka-book-store.onrender.com/api/v1";
export const API_ROOT = "http://localhost:9000/api/v1";

export const API_URLS = {
  signUp: () => `${API_ROOT}/auth/signIN`,
  login: () => `${API_ROOT}/auth/login`,
  changePassword: () => `${API_ROOT}/auth/changePassword`,
  
  
  // User with authentication
  getUser: () => `${API_ROOT}/auth/getUser`,
  UpdateProfile: () => `${API_ROOT}/auth/UpdateProfile`,
  search: (name) => `${API_ROOT}/auth/search?name=${name}`,
  
  // book with Authentication 
  addBook: () => `${API_ROOT}/book/add`,
  updateBook: (id) => `${API_ROOT}/book/update/${id}`,
  removeBook: (id) => `${API_ROOT}/book/remove/${id}`,
  userBook: () => `${API_ROOT}/book/userBook`,
 


  // book
  getSinglebook: (id) => `${API_ROOT}/book/getSinglebook/${id}`,
  getbook: () => `${API_ROOT}/book/getbook`,
  searchbook: (name) => `${API_ROOT}/book/search?name=${name}`,
  searchCategory: (category) => `${API_ROOT}/book/searchCategory?category=${category}`,
  searchBylanguage: (language) => `${API_ROOT}/book/searchBylanguage?language=${language}`,
  
  //  Cart
  // router.delete("/deleteAll",checkAuth,deleteAll);
  getCart: () => `${API_ROOT}/cart/getCart`,
  addtoCart: () => `${API_ROOT}/cart/addtoCart`,
  removeCart: (cartId) => `${API_ROOT}/cart/removeCart/${cartId}`,
  deleteAll: () => `${API_ROOT}/cart/deleteAll`,
  getSingleCart: (bookId) => `${API_ROOT}/cart/getSingleCart/${bookId}`,
  

  
  // orders

  getSingleOrder: (bookId) => `${API_ROOT}/order/getSingleOrder/${bookId}`,
  getUserOrder: () => `${API_ROOT}/order/getAllOrder`,
  placedOrder: () => `${API_ROOT}/order/placedOrder`,
  cancelOrder: (orderId) => `${API_ROOT}/order/cancelOrder/${orderId}`,
  
  // inventory
  addInventory:()=>`${API_ROOT}/inventory/addInventory`,
  bookSold:()=>`${API_ROOT}/inventory/bookSold`,
  getSinglebookInventory: (bookId) => `${API_ROOT}/inventory/getSinglebookInventory/${bookId}`,
};

export const localToken = "token";
