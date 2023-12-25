import React, { useEffect, useState } from "react";
import { getSinglebook, removeCart } from "../../api/api";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { HOST_ROOT } from "../../utils";
import { useAuth } from "../../hook/authHook";
import styles from "../books/book.module.css";
export default function CartBook({ bookId, setRender, render,loader,setloader }) {
  const [book, setbook] = useState(null);
  const [placing, setPlacing] = useState(false);
  const { setProgress } = useAuth();
  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await getSinglebook(bookId);
        if (res.succuss) {
          setbook(res.book);
        }
      };
      fetch();
    } catch (error) {
      console.error(error);
    }
  }, [bookId]);

  const handleRemove = async () => {
    try {
      setProgress(10)
     
      const res = await removeCart(bookId);
      setProgress(50)
      console.log("re>",res);
      if (res.succuss) {
        setProgress(70)
        toast.success("Cart deleted succefully");
        setRender(!render);
      } else {
        toast.error(res.message);
      }
      setProgress(100)
    
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
     
      {book && (
        <>
          <div className={`card ${styles.card}`}>
            <img
              className="card-img-top"
              // src={`http://localhost:9000/books/${book.bookImage}`}
              src={`${HOST_ROOT}/books/${book.bookImage}`}
              alt="Cardcap"
            />
            <div className="card-body">
              <h5 className="card-title">{book.name}</h5>
              <Link to={`/SingleBook/${book._id}`}>
                <button
                  type="button"
                  className="btn btn-dark"
                  style={{ marginRight: "10px" }}
                >
                  Detail
                </button>
              </Link>
              <Link to={`/placedOrder/${bookId}`}>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setPlacing(!placing)}
                  style={{ marginRight: "10px" }}
                >
                  Order
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleRemove}
              >
                Remove
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
