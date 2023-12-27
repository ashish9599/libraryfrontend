import React, { useEffect, useState } from "react";

import { getUserOrder } from "../../api/api";
import { Link } from "react-router-dom";
import styles from "./order.module.css";
import OrderDetail from "./Order";
import Loader from "../Loader";

export default function Myorder() {
  const [order, setOrder] = useState(null);
  const [render, setRender] = useState(false);
  const [loader, setloader] = useState(false);
  useEffect(() => {
    try {
      const fetch = async () => {
        setloader(true)
        const res = await getUserOrder();
        if (res.succuss) {
          setOrder(res.order);
        }
        setloader(false)
      };
      fetch();
    } catch (error) {
      console.error(error);
    }
  }, [render]);

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
          <div className={styles.mrl}>
          <Link to={`/myCart`}>
            <span>
              <img
                style={{ width: "30px" }}
                src="https://iridescent-faloodeh-3725ab.netlify.app/assets/back.png"
                alt=""
              />
            </span>
          </Link>
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
          {order && order.length < 1 && (
            <>
              <div>
                <div>
                  <h3> No book present</h3>
                </div>
              </div>
            </>
          )}
          {order &&
            order.map((order, i) => (
              <OrderDetail
                bookId={order.bookId}
                price={order.price}
                qty={order.qty}
                orderId={order._id}
                setRender={setRender}
                render={render}
                key={i}
              />
            ))}
        </div>
      </div>
    </>
  );
}
