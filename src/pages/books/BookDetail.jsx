import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hook/authHook";
import UpdateBook from "./UpdateBook";
import {
  addBookToCart,
  getSingleCart,
  getSinglebook,
  removeCart,
} from "../../api/api";
import { useBook } from "../../hook/bookHook";
import { toast } from "react-toastify";
import styles from "./book.module.css";
import { HOST_ROOT } from "../../utils";
import Loader from "../Loader";

export default function BookDetail() {
  const [updateBook, setUpdate] = useState(false);
  const [loader, setloader] = useState(false);

  const [book, setbook] = useState(null);
  const navigate = useNavigate();
  const { user, setProgress } = useAuth();
  const { REMOVEBook } = useBook();
  const [cartPresent, setCartP] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    try {
      const fetch = async () => {
        setloader(true);
        const res = await getSinglebook(id);
        if (res.succuss) {
          setbook(res.book);
        }
        setloader(false);
      };
      fetch();
    } catch (error) {
      console.error(error);
    }
  }, [id, updateBook]);
  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await getSingleCart(id);

        if (res.succuss) {
          setCartP(true);
        } else {
          setCartP(false);
        }
      };
      fetch();
    } catch (error) {
      console.error(error);
    }
  }, [id, cartPresent]);

  const Removebook = async () => {
    try {
      setProgress(10);

      const res = await REMOVEBook(id);
      setProgress(30);
      if (res.succuss) {
        navigate("/");
        toast.success("Book removed successfully");
        setProgress(70);
      } else {
        toast.error(res.message);
      }
      setProgress(100);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCart = async (id) => {
    try {
      if (cartPresent) {
        setProgress(10);
        const res = await removeCart(id);

        console.log("r=>", res);
        if (res.succuss) {
          setProgress(60);
          toast.warn("Book deleted from cart");
          setCartP(false);
        } else {
          toast.error(res.message);
        }
        setProgress(100);
      } else {
        setProgress(10);
        const res = await addBookToCart(id);
        console.log("a=>", res);
        if (res.succuss) {
          setProgress(60);
          toast.success("Book added to Cart");
          setCartP(true);
          setProgress(100);
        } else {
          toast.error(res.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loader && <Loader />}
      {updateBook && (
        <UpdateBook
          bookId={id}
          books={book}
          setUpdate={setUpdate}
          update={updateBook}
        />
      )}

      <div
        style={{
          width: "81%",
          left: " 10.2%",
          position: "absolute",
          padding: "20px 0px",
        }}
      >
        <Link to={`/`}>
          <span>
            <img
              style={{ width: "30px" }}
              src="https://iridescent-faloodeh-3725ab.netlify.app/assets/back.png"
              alt=""
            />
          </span>
        </Link>
      </div>

      {
        <>
          <div style={{ paddingBottom: "100px" }}>
            <div
              className={styles.bokside}
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                width: "80%",
                transform: "translate(12.5%, 70px)",
                background: "aliceblue",
                minWidth: "34vmax",
              }}
            >
              {book && (
                <>
                  <div style={{ width: "100%" }}>
                    <div className="card" style={{ height: "100%" }}>
                      <img
                        style={{ height: "75%" }}
                        className="card-img-top"
                        // src={`http://localhost:9000/books/${book.bookImage}`}
                        src={`${HOST_ROOT}/books/${book.bookImage}`}
                        alt="Cardcap"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{book.name}</h5>
                        {book && user && user._id === book.user && (
                          <>
                            <div>
                              <button
                                type="button"
                                className={`btn btn-danger ${styles.mg}`}
                                onClick={Removebook}
                                style={{ marginRight: "10px" }}
                              >
                                Remove Book
                              </button>

                              <button
                                type="button"
                                className={`btn btn-${
                                  updateBook ? "danger" : "success"
                                }  ${styles.mg}`}
                                onClick={(e) => {
                                  setUpdate(!updateBook);
                                }}
                              >
                                {updateBook ? "Cancel" : "UpdateBook"}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.lb}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      // justifyContent: "space-between",
                    }}
                  >
                    <div style={{ padding: "15px" }}>
                      <div
                        style={{
                          background: "aliceblue",
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "2rem",
                        }}
                      >
                        <span>Name: {book.name}</span>
                        <span>Author: {book.author}</span>
                      </div>
                      <div>
                        <p className="m-0">publishAt</p>
                        <p className="m-0">language:{book.language}</p>
                        <p className="m-0">category:{book.category}</p>
                        <p className="m-0">desciption:{book.desciption}</p>
                      </div>
                    </div>
                    <div
                      className={styles.fb}
                      style={{
                        justifyContent: "space-between",
                        padding: "20px",
                      }}
                    >
                      <span style={{ fontSize: "2rem" }}>Rs.{book.price}</span>

                      <>
                        <div>
                          <Link to={`/placedOrder/${id}`}>
                            <button
                              type="button"
                              className="btn btn-info"
                              style={{ marginRight: "20px" }}
                            >
                              Order
                            </button>
                          </Link>

                          <button
                            type="button"
                            className={`btn btn-${
                              cartPresent ? "danger" : "secondary"
                            }`}
                            onClick={() => handleCart(book._id)}
                          >
                            {cartPresent ? "Remove from Cart " : "Add to Cart"}
                          </button>
                        </div>
                      </>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      }
    </>
  );
}
