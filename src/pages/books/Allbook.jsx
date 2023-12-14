import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllbook } from "../../api/api";
import styles from "./book.module.css";
import { useBook } from "../../hook/bookHook";
import { HOST_ROOT } from "../../utils";
import Loader from "../Loader";

export default function Allbook() {
  const { allbook } = useBook();

  const [book, setbook] = useState(null);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    try {
      const fetch = async () => {
        setloader(true);
        const res = await getAllbook();
        if (res.succuss) {
          setbook(res.book);
        }
        setloader(false);
      };
      fetch();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    setbook(allbook);
  }, [allbook]);

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
      >
        {loader && <Loader />}
      </div>
      {
        <>
          <div style={{ width: "100vw" }}>
            <div
              className={styles.boks}
              style={{
                display: "flex",
                flexWrap: "wrap",
                background: "aliceblue",
                columnGap: "62px",
                rowGap: "40px",
              }}
            >
              {book && book.length < 1 && (
                <>
                  <div>
                    <div>
                      <h3> No book present</h3>
                    </div>
                  </div>
                </>
              )}
              {book &&
                book.map((book, i) => (
                  <div className="card" style={{ width: "17.6rem" }} key={i}>
                    <img
                      className="card-img-top"
                      // src={`http://localhost:9000/books/${book.bookImage}`}
                      src={`${HOST_ROOT}/books/${book.bookImage}`}
                      alt="Cardcap"
                    />

                    <div className="card-body">
                      <h5 className="card-title">{book.name}</h5>
                      <Link to={`/SingleBook/${book._id}`}>
                        <button type="button" className="btn btn-dark">
                          Detail
                        </button>
                      </Link>
                    </div>
                    {/* </div> */}
                  </div>
                ))}
            </div>
          </div>
        </>
      }
    </>
  );
}
