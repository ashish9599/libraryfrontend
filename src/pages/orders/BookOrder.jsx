import React, { useEffect, useState } from "react";
import {
  bookSold,
  getSingleCart,
  getSinglebook,
  getSinglebookInventory,
  placedOrder,
  removeCart,
} from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../../hook/authHook";
// import { useAuth } from "../../hook/authHook";

export default function BookOrder() {
  const [book, setbook] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [render, setRender] = useState(false);
  const [newQTY, setQty] = useState(0);
  const { setProgress } = useAuth();

  const [order, setOrder] = useState({
    name: "",
    address: "",
    address2: "",
    city: "",
    zip: "",
    qty: "",
    price: "",
  });

  const { bookId } = useParams();
  // console.log(order)
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await getSinglebook(bookId);
        if (res.succuss) {
          setbook(res.book);
          order.price = res.book.price;
          order.qty = res.book.qty;
        }
      };
      fetch();
    } catch (error) {
      console.error(error);
    }
  }, [bookId, order]);

  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await getSinglebookInventory(bookId);
        //  console.log(res);
        if (res.succuss) {
          setInventory(res.Inventory);
        }
      };
      fetch();
    } catch (error) {
      console.error(error);
    }
  }, [bookId, render]);

  const handleOrder = async () => {
    const { name, address, price } = order;
    const pr = price * newQTY;
    try {
      setProgress(10);
      if (name === "" && address === "") {
        return toast.error("Please fill the all feilds");
      }
      if (newQTY > inventory.bookLeft) {
        return toast.info(`Only ${inventory.bookLeft} left`);
      }
      setProgress(20);

      const res = await placedOrder(bookId, pr, newQTY);
      console.log("ord", res);
      setProgress(50);
      if (res.succuss) {
        const newRes = await bookSold(bookId, newQTY);
        if (newRes.succuss) {
          setRender(!render);
          const cartR = await getSingleCart(bookId);

          if (cartR.succuss) {
            setProgress(70);
            await removeCart(bookId);
          }
          toast.success("Order Placed");
          navigate(`/myOrder`);
        } else {
          toast.error(newRes.message);
        }

        setProgress(100);
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "72%",
          zIndex: "10",
          opacity: "0.55",

          transform: "translate(24%, 50px)",
        }}
      ></div>
      <>
        <form
          action=""
          style={{
            color: "#b8b6b6",
            position: "absolute",

            width: "80%",
            zIndex: "10",
            background: "#2a2525",
            padding: "30px",
            transform: "translate(10%, 2%)",
            borderRadius: "20px",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <Link to={`/`}>
              <span
                style={{
                  background: "white",
                  width: "30px",
                  display: "block",
                  borderRadius: "10px",
                  boxShadow: " 1px 1px 3px 2px grey",
                }}
              >
                <img
                  style={{ width: "30px" }}
                  src="https://iridescent-faloodeh-3725ab.netlify.app/assets/back.png"
                  alt=""
                />
              </span>
            </Link>
          </div>

          {inventory && inventory.bookLeft > 0 ? (
            <>
              {inventory && inventory.bookLeft < 10 && (
                <p style={{ color: "red" }}>
                  Hurry!!!
                  <br /> Quantity {inventory && inventory.bookLeft} left
                </p>
              )}

              <div
                className="form-group col-md-6"
                style={{ paddingLeft: "0px" }}
              >
                <label htmlFor="inputEmail4">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="inputAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  name="address"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress2">Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                  name="address2"
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="inputCity">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    name="city"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group col-md-2">
                  <label htmlFor="inputZip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    name="zip"
                    id="inputZip"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div
                className="form-group col-md-3"
                style={{ paddingLeft: "0px" }}
              >
                <label htmlFor="inputZip">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputZip"
                  placeholder="Quantity"
                  max={inventory && inventory.bookLeft}
                  min={1}
                  name="qty"
                  value={newQTY}
                  onChange={(e) => setQty(e.target.value)}
                />
              </div>
            </>
          ) : (
            ""
          )}
          <div className="form-floating mb-3">
            <p>Price Rs.{book && book.price}</p>
            <p>{book && book.name}</p>
          </div>
          <div className="form-floating mb-3" style={{ color: "red" }}>
            {inventory && inventory.bookLeft > 0 ? (
              <p> Total Price:Rs.{order.price * newQTY}</p>
            ) : (
              "Out Of Stock"
            )}
          </div>
          <div>
            <button
              disabled={inventory && inventory.bookLeft ? 0 : 1}
              type="button"
              className={`btn btn-${
                inventory && inventory.bookLeft > 0 ? "secondary" : "danger"
              }`}
              onClick={handleOrder}
            >
              {inventory && inventory.bookLeft > 0
                ? "Placed Order"
                : "Not Available"}
            </button>
          </div>
        </form>
      </>
    </>
  );
}
