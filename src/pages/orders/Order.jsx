import React, { useEffect, useState } from "react";
import { cancelOrder, getSinglebook } from "../../api/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { HOST_ROOT } from "../../utils";
import styles from "./order.module.css";
import { useAuth } from "../../hook/authHook";

export default function OrderDetail({
  bookId,
  qty,
  price,
  setRender,
  render,
  orderId,
}) {
  const [book, setbook] = useState(null);

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

  const handleOrder = async () => {
    try {
      setProgress(10);

      const res = await cancelOrder(orderId);
      setProgress(40);

      if (res.succuss) {
        toast.success("Order Cancelled");
        setRender(!render);
      } else {
        toast.error(res.message);
      }
      setProgress(100);
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
              <div>
                <p>Quantity:{qty}</p>
                <p>Price:{price}</p>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <Link to={`/orderDetail/${orderId}`}>
                  <button type="button" className="btn btn-dark">
                    Order Detail
                  </button>
                </Link>
              </div>
              <button
                type="button"
                className={`btn btn-danger`}
                onClick={handleOrder}
              >
                Cancel Order
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
