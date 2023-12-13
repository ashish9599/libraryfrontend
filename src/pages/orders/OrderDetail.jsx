import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cancelOrder, getSingleOrder, getSinglebook } from "../../api/api";
import { toast } from "react-toastify";
import styles from "./order.module.css";
import { HOST_ROOT } from "../../utils";
import Loader from "../Loader";
const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [bookId, setBookId] = useState(null);
  const [book, setbook] = useState(null);
  const [loader, setloader] = useState(false);
  const { orderId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await getSingleOrder(orderId);

        if (res.succuss) {
          setOrder(res.order);
          setBookId(res.order.bookId);
        }
      };
      fetch();
    } catch (error) {
      console.error(error);
    }
  }, [orderId]);
  useEffect(() => {
    try {
      setloader(true);
      const fetch = async () => {
        const res = await getSinglebook(bookId);
        if (res.succuss) {
          setbook(res.book);
          setloader(false);
        }
      };
      fetch();
    } catch (error) {
      console.error(error);
    }
  }, [bookId]);
  const handleOrder = async () => {
    try {
      setloader(true);
      const res = await cancelOrder(orderId);
      
      if (res.succuss) {
        navigate(`/myOrder`);
        toast.success("Order Cancelled");
        setloader(false);
      } else {
        toast.error(res.message);
      }
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
        {loader && <Loader/>}
      </div>
      <div
        style={{
          width: "81%",
          left: " 10.2%",
          position: "absolute",

          padding: "20px 0px",
        }}
      >
        <Link to={`/myOrder`}>
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
          <div style={{ width: "100vw" }}>
            <div
              style={{
                display: "flex",
                gap: "2%",
                flexWrap: "wrap",
                width: "80%",
                transform: "translate(12.5%, 70px)",
                background: "aliceblue",
                height: "430px",
              }}
            >
              {book && (
                <>
                  <div style={{ width: "33%" }}>
                    <div className="card" style={{ height: "100%" }}>
                      <img
                        style={{ height: "75%" }}
                        className="card-img-top"
                        // src={`http://localhost:9000/books/${book.bookImage}`}
                        src={`${HOST_ROOT}/books/${book.bookImage}`}
                        alt="Cardcap"
                      />
                      <div className="card-body"></div>
                    </div>
                  </div>
                  <div
                    className={styles.od}
                    style={{
                      width: "65%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
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
                      className={styles.oc}
                      style={{
                        justifyContent: "space-between",
                        padding: "20px",
                      }}
                    >
                      <div>
                        <div>Total Quantity:{order.qty}</div>
                        <div>Total Cost:Rs.{order.price}</div>
                      </div>
                      <span>
                        <button
                          type="button"
                          className={`btn btn-danger`}
                          onClick={handleOrder}
                        >
                          Cancel Order
                        </button>
                      </span>
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
};

export default OrderDetail;
