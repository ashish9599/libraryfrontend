import React, { useEffect, useState } from "react";

import { getUserOrder } from "../../api/api";
import { Link } from "react-router-dom";

import OrderDetail from "./Order";

export default function Myorder() {
  const [order, setOrder] = useState(null);
  const [render, setRender] = useState(false);
  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await getUserOrder();
        if (res.succuss) {
          setOrder(res.order);
        }
      };
      fetch();
    } catch (error) {
      console.error(error);
    }
  }, [render]);

  return (
    <>
      <div
        style={{
          width: "100vw",
          position: "absolute",
          padding: "56px 0px",
        }}
      >
        <div style={{ paddingLeft: "130px" }}>
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
