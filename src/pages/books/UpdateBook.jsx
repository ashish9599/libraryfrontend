import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { updateBooks } from "../../api/api";

import Addimage from "../../images/icons8-add-image-48.png";
import Loader from "../Loader";
const UpdateBook = ({ bookId, books, setUpdate, update }) => {
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
  // name, desciption, price, available, author, category
  const [book, setbook] = useState({
    name: books.name,
    desciption: books.desciption,
    price: books.price,
    author: books.author,
    category: books.category,
    language: books.language,
    qty:books.qty
  });
  const [bookImage, setBookImage] = useState(null);
  const [loader, setloader] = useState(false);
  const [available, setAvailable] = useState(books.available);
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
      let { name, desciption, price, author, category, language } = book;

      if (name==="" && desciption==="" && price==="" && author==="" && category==="" && language==="") {
        return toast.info("Please fill the form");
      }
      setloader(true);
      const res = await updateBooks(bookId, book, available, bookImage);
      console.log(res);
      if (res.succuss) {
        setUpdate(!update);
        toast.success("Book added successfully");
      } else {
        toast.error(res.message);
      }
      setloader(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (

   <>
    <div
    style={{
      position: "absolute",
      width: "100%",
      zIndex: "10",
      opacity: "0.55",
     }}
  >
    {loader && <Loader />}
  </div>
    <div>
      {/* <div className="UpdateBook" style={{ width: "100vw" }}> */}
      {/* <div style={{ textAlign: "center" }}>
        <h1>UpdateBook</h1>
      </div> */}
      {/* </div> */}

      <form
        style={{
          width: "70%",
          position: "absolute",
          zIndex: "10",
          padding: "25px",
          borderRadius: "10px",
          transform: "translate(17%, 0px)",
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
              onChange={onchange}
              type="text"
              className="form-control"
              name="name"
              // id="name"
              placeholder="name"
              value={book.name}
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
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              value={book.price}
              onChange={onchange}
              type="number"
              name="price"
              className="form-control"
              id="inputAddress"
              placeholder="price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Quantity</label>
            <input
              value={book.qty}
              onChange={onchange}
              type="number"
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
            <label htmlFor="category">State</label>
            <select
              id="category"
              className="form-control"
              onChange={onchange}
              name="category"
            >
              {/* <option >category...</option> */}
              <option defaultValue={book.category}>{book.category}</option>
              {category.map((list, i) => (
                <option key={i}>{list}</option>
              ))}
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="bookImage">
              {" "}
              <p>Book Cover</p>
              <img src={Addimage} alt="" />
            </label>
            <input
              type="file"
              className="form-control-file"
              // multiple/
              // accept="image/*"
              id="bookImage"
              name="bookImage"
              onChange={(e) => setBookImage(e.target.files[0])}
              // enctype="multipart/form-data"
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
              <option selected> {book.language}</option>
              {language.map((list, i) => (
                <option key={i}>{list}</option>
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
              onChange={(e) => {
                setAvailable(!available);
              }}
              name="available"
              className="form-check-input"
              type="checkbox"
              id="available"
              defaultValue={available}
              defaultChecked={available}
            />
            <label className="form-check-label" htmlFor="available">
              Available
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-dark mr-3">
          Update
        </button>
        <button
          type="button"
          className={`btn btn-${update ? "danger" : "success"} `}
          onClick={(e) => {
            setUpdate(!update);
          }}
        >
          {update ? "Cancel" : "UpdateBook"}
        </button>
      </form>
    </div>
   </>
  );
};

export default UpdateBook;
