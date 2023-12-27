import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CartBook from "./CartBook";
import { deleteAll, getUserCart } from "../../api/api";
import { toast } from "react-toastify";
import styles from "../books/book.module.css";
import Loader from "../Loader";
import { useAuth } from "../../hook/authHook";
export default function MyCart() {
  const [cart, setCart] = useState(null);
  const [loader, setloader] = useState(false);
  const [render, setRender] = useState(false);
  // const inCart = true;
  const { setProgress } = useAuth();
  useEffect(() => {
    try {
      const fetch = async () => {
        setloader(true)
        const res = await getUserCart();
        if (res.succuss) {
          setCart(res.cart);
        }
        setloader(false)
      };
      fetch();
    } catch (error) {
      console.error(error);
    }
  }, [render]);

  const handleClear = async () => {
    try {
      setProgress(10)
      const res = await deleteAll();
      setProgress(50)
      if (res.succuss) {
        setProgress(80)
        toast.success("All deleted");
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
    {loader&&<Loader/> }
      <div
        style={{
          width: "100vw",
         
          padding: "56px 0px"
          ,paddingBottom:"100px"
        }}
      >
        {!loader&&<>
          <div
          className={styles.mrl}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
                  <div>
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
                <button type="button" className="btn btn-dark" onClick={handleClear}>
                  Clear All
                </button>
        </div>

        </>}
        
        <div
          style={{
            display: "flex",
            columnGap: "11.3%",
            rowGap: "50px",
            flexWrap: "wrap",
            width: "80%",
            transform: "translate(12.5%, 50px)",
            background: "aliceblue",
          }}
        >
          {cart && cart.length < 1 && (
            <>
              <div>
                <div>
                  <h3> No book present</h3>
                </div>
              </div>
            </>
          )}
          {cart &&
            cart.map((cart, i) => (
              <CartBook
                bookId={cart.bookId}
                cartId={cart._id}
                render={render}
                setRender={setRender}
                key={i}
                loader={loader}
                setloader={setloader}
              />
            ))}
        </div>
      </div>
    </>
  );
}
