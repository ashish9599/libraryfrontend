import { Link } from "react-router-dom";
import { useAuth } from "../hook/authHook";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { useBook } from "../hook/bookHook";
import style from "./home.module.css";
const Navbar = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState("");
  const [display, setDisplay] = useState(false);
  const { allbook, searchbookByname, searchhome } = useBook();
  const titleRef = useRef(null);
  useEffect(() => {
    document.title = "ApkaBOOKStore";
    titleRef.current.focus();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "") {
      return toast.info("Please fill the form");
    }

    try {
      const res = await searchbookByname(name);
      if (res.succuss) {
        toast.success("Book added successfully");
      } else {
        toast.error(res.message);
      }
      setName("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = () => {
    try {
      logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ alignItems: "center", flexWrap: "nowrap" }}
      >
        <div
          className={`navbar-collapse ${style.gap}`}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className={style.pad} style={{ width: "8vmax" }}>
            <Link to={"/"} className={`navbar-brand ${style.fs}`}>
              Apka <br />
              BOOKStore
            </Link>
          </div>
          <div className={style.search}>
            <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <input
                  className={`form-control mr-sm-2 p-sm-2 ${style.fs}`}
                  style={{ width: "100%" }}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={name}
                  ref={titleRef}
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  className={`btn btn-outline-success  my-sm-0 ${style.fs}`}
                  type="submit"
                >
                  Search
                </button>
              </div>

              <div
                className={`${style.sl} ${style.fs}`}
                style={{
                  position: "absolute",
                  background: "#ecf5fd",
                  overflow: "hidden",
                  maxHeight: "350px",
                  top: "63px",
                  zIndex: "10",
                }}
              >
                <ul
                  style={{ padding: "0px", margin: "0px", listStyle: "none" }}
                >
                  {name.length > 1 &&
                    allbook.map((book, i) => (
                      <>
                        <Link
                          to={`/SingleBook/${book._id}`}
                          onClick={() => setName("")}
                          key={i}
                          style={{ color: "black" }}
                        >
                          <li
                            style={{
                              borderBottom: "1px solid rgb(25 25 25 / 12%)",
                              height: "35px",
                            }}
                          >
                            {book.name}
                          </li>
                        </Link>
                      </>
                    ))}
                </ul>
              </div>
            </form>
          </div>
          <div className={`${style.p} ${style.fs} `}>
            {user ? (
              <div>
                <ul
                  className="navbar-nav  mt-2 mt-lg-0"
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "end",
                    gap: "7px",
                  }}
                >
                  <li className="nav-item active m-2">
                    <Link to={"/UserP"}>
                      <img
                        src={`http://localhost:9000/users/${user.userImage}`}
                        alt=""
                        style={{
                          width: "40px",
                          height: "37px",
                          borderRadius: "50%",
                        }}
                      />
                    </Link>
                  </li>
                  <li className="nav-item active m-2">
                    <Link to={"/UserP"}>{user.name}</Link>
                  </li>

                  <li className="nav-item active m-2">
                    <Link onClick={handleClick}>logOut</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <ul
                className="navbar-nav   mt-2 "
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "end",
                  gap: "7px",
                }}
              >
                <li className="nav-item active m-2">
                  <Link to={"/login"}>Login</Link>
                </li>
                <li className="nav-item m-2">
                  <Link to={"/register"}>SignUp</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <div>
        {user && (
          <>
            <div
              className={style.all4}
              style={{
                display: "flex",
                justifyContent: "end",
                padding: "20px 20px 0px 0px",
                gap: "10px",
                marginBottom: "10px",
                minWidth: "47vmax",
              }}
            >
              {display && (
                <>
                  <Link to={`/`}>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => searchhome()}
                    >
                      Home
                    </button>
                  </Link>
                  <Link to={`/mybook`}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      // style={{ marginRight: "20px" }}
                    >
                      MyBook
                    </button>
                  </Link>
                  <Link to={`/myCart`}>
                    <button
                      type="button"
                      className="btn btn-info"
                      // style={{ marginRight: "20px" }}
                    >
                      MyCart
                    </button>
                  </Link>
                  <Link to={`/myOrder`}>
                    <button type="button" className="btn btn-dark">
                      MyOrder
                    </button>
                  </Link>
                </>
              )}
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  border: "2px solid black",
                  background: "black",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => setDisplay(!display)}
              >
                <div
                  style={{
                    border: "1px solid white",
                    display: "block",
                    height: "0px",
                    margin: "5px 3px 5px  3px",
                  }}
                ></div>
                <div
                  style={{
                    border: "1px solid white",
                    display: "block",
                    height: "0px",
                    margin: "5px 3px 5px  3px",
                  }}
                ></div>
                <div
                  style={{
                    border: "1px solid white",
                    display: "block",
                    height: "0px",
                    margin: "5px 3px 5px  3px",
                  }}
                ></div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
