import React, { useEffect, useState } from "react";
import { getSinglebook, removeCart } from "../../api/api";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

export default function CartBook({ bookId, setRender, render }) {
  const [book, setbook] = useState(null);
  const [placing, setPlacing] = useState(false);

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
      const res = await removeCart(bookId);

      if (res.succuss) {
        toast.success("Cart deleted succefully");
        setRender(!render);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* {placing && (
        <PlacedOrder
          bookId={bookId}
          placing={placing}
          setPlacing={setPlacing}
          cartId={cartId}
        />
      )} */}
      {book && (
        <>
          <div className="card" style={{ width: "17.6rem" }}>
            <img
              className="card-img-top"
              src={`http://localhost:9000/books/${book.bookImage}`}
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
