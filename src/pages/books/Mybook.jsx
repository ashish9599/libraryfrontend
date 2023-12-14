import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hook/authHook";
import Addbook from "./Addbook";
// import { useBook } from "../../hook/bookHook";
import { getUserBook } from "../../api/api";
import styles from "./book.module.css";
import { HOST_ROOT } from "../../utils";
import Loader from "../Loader";
export default function Mybook() {
  const [addBook, setAddbook] = useState(false);
  const { user } = useAuth();
  const [allbook, setAllbook] = useState();
  const [loader, setloader] = useState(false);
  useEffect(() => {
    try {
      const fetch = async () => {
        setloader(true)
        const res = await getUserBook();
        if (res.succuss) {
          setAllbook(res.book);
        }
        setloader(false)
      };
      fetch();
    } catch (error) {
      console.error(error);
    }
  },[]);
  return (
    <>
     <div style={{
      position: "absolute",
    width: "72%",
   zIndex:"10",
   opacity:"0.55",
    transform: "translate(24%, 50px)"}}>

    {loader&&<Loader/> }
    </div>
      {addBook && <Addbook addbookform={addBook} setAddbook={setAddbook} />}
      <div
        style={{
          width: "100wh",
          padding: "56px 0px",
        }}
      >
        <div
          className={styles.mrl}
          style={{
            display: "flex",
            justifyContent: "space-between",
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

          {user && (
            <>
              <button
                type="button"
                className={`btn btn-${addBook ? "danger" : "success"} `}
                onClick={(e) => {
                  setAddbook(!addBook);
                }}
              >
                {addBook ? "Cancel" : "Addbook"}
              </button>
            </>
          )}
        </div>

        <div
          style={{
            display: "flex",
            columnGap: "10.79%",
            rowGap: "50px",
            flexWrap: "wrap",
            width: "80%",
            transform: "translate(12.5%, 50px)",
            background: "aliceblue",
          }}
        >
          {allbook && allbook.length < 1 && (
            <>
              <div>
                <div>
                  <h3> No book present</h3>
                </div>
              </div>
            </>
          )}
          {allbook &&
            allbook.map((book, i) => (
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
  );
}
