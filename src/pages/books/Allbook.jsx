import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllbook } from "../../api/api";

export default function Allbook() {
  
  const [book, setbook] = useState(null);

  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await getAllbook();

        if (res.succuss) {
          setbook(res.book);
        }
      };
      fetch();
    } catch (error) {
      console.error(error);
    }
  }, []);

 

  return (
    <>
      {
        <>
          <div style={{ width: "100vw" }}>
           
            <div
              style={{
                display: "flex",
                width: "72%",
                flexWrap: "wrap",
                transform: "translate(24%, 50px)",
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
                      src={`http://localhost:9000/books/${book.bookImage}`}
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
