import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useBook } from "../../hook/bookHook";

import Addimage from "../../images/icons8-add-image-48.png";
import { addInventory } from "../../api/api";
const Addbook = ({ addbookform, setAddbook }) => {
  // name, desciption, price, available, author, category
  const category = [
    "English",
    "History",
    "Romance",
    "Horror",
    "fiction",
    "Thriller",
    "Adventure",
  ];
  const language = ["English", "Hindi"];
  const [book, setbook] = useState({
    name: "",
    desciption: "",
    price: "",
    qty: "",
    author: "",
    category: "",
    language: "",
  });
  const [available, setAvailable] = useState(false);

  const [bookImage, setBookImage] = useState(null);
  const { addBookfrom } = useBook();
  const titleRef = useRef(null);
  useEffect(() => {
    titleRef.current.focus();
  }, []);
  const onchange = (e) => {
    setbook({ ...book, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, desciption, price, author, qty, category, language } = book;
      if (
        name === "" &&
        desciption === "" &&
        price === "" &&
        qty === "" &&
        author === "" &&
        category === "" &&
        language === ""
      ) {
        return toast.info("Please fill the form");
      }

      const res = await addBookfrom(book, available, bookImage);
      if (res.succuss) {
        const invent = await addInventory(res.book._id, book.qty);
        console.log(invent);
        setAddbook(!addbookform);
        toast.success("Book added successfully");
      } else {
        toast.error(res.message);
      }

      setbook({
        name: "",
        desciption: "",
        price: "",
        qty: "",
        language: "",
        author: "",
        category: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <div className="Addbook">
    // <div className="Addbook" style={{ width: "100vw",}}>
    <div className="Addbook" style={{ width: "100vw" }}>
      {/* // <div style={{ textAlign: "center" }}>
    //   <h1>Addbook</h1>
    // </div> */}
      <div>
        <form
          style={{
            position: "absolute",
            zIndex: "10",
            padding: "25px",
            borderRadius: "10px",
            transform: "translate(22%, 50px)",
            width: "70%",
            border: "1px solid rgb(219 236 250)",
            background: "#ecf5fd",
          }}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Name</label>
              <input
                value={book.name}
                onChange={onchange}
                type="text"
                className="form-control"
                name="name"
                id="name"
                placeholder="name"
                ref={titleRef}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="desciption">Desciption</label>
              <input
                value={book.desciption}
                onChange={onchange}
                type="text"
                name="desciption"
                className="form-control"
                id="desciption"
                placeholder="desciption"
              />
            </div>
            <div className="form-group" style={{ marginRight: "30px" }}>
              <label htmlFor="price">Price</label>
              <input
                value={book.price}
                onChange={onchange}
                type="number"
                name="price"
                min={0}
                className="form-control"
                id="inputAddress"
                placeholder="price"
              />
            </div>
            <div className="form-group">
              <label htmlFor="qty">Quantity</label>
              <input
                value={book.qty}
                onChange={onchange}
                type="number"
                min={0}
                name="qty"
                className="form-control"
                id="inputAddress"
                placeholder="Quantity"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="author">Author</label>
              <input
                value={book.author}
                onChange={onchange}
                type="text"
                name="author"
                className="form-control"
                id="author"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="form-control"
                name="category"
                onChange={onchange}
              >
                <option selected> Category</option>
                {category.map((list, i) => (
                  <option key={i}>{list}</option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-4">
              <label for="bookImage">
                <p>Book Cover</p>
                <img src={Addimage} alt="" />
              </label>
              <input
                type="file"
                className="form-control-file"
                id="bookImage"
                name="bookImage"
                onChange={(e) => setBookImage(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="language">language</label>
              <select
                id="language"
                className="form-control"
                name="language"
                onChange={onchange}
              >
                <option selected> language</option>
                {language.map((list, i) => (
                  <option key={i}> {list}</option>
                ))}
              </select>
            </div>
            {/* <div className="form-group col-md-4">
      <label htmlFor="language">State</label>
      <select id="language" className="form-control" name="language">
        <option selected>language...</option>
        <option>English</option>
        <option>Hindi</option>  
      </select>
    </div> */}
          </div>

          <div className="form-group">
            <div className="form-check">
              <input
                onChange={(e) => setAvailable(true)}
                name="available"
                className="form-check-input"
                type="checkbox"
                id="available"
              />
              <label className="form-check-label" htmlFor="available">
                Available
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginRight: "15px" }}
          >
            AddBook
          </button>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={() => {
              setAddbook(!addBookfrom);
            }}
          >
            Cancil
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbook;
