import { Link } from "react-router-dom";
import { useAuth } from "../hook/authHook";
import { toast } from "react-toastify";
import { useState } from "react";
import { useBook } from "../hook/bookHook";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState("");
  const [display, setDisplay] = useState(false);
  const { allbook, searchbookByname } = useBook();

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
        style={{ height: "10vh" }}
      >
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarTogglerDemo01"
          // style={{ height: "10vh" }}
        >
          <div>
            <Link to={"/"} className="navbar-brand">
              Ash BookStore
            </Link>
          </div>
          <div>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
            <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
              <div>
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search N
                </button>
              </div>

              <div
                style={{
                  position: "absolute",
                  width: "21.5%",
                  background: "#ecf5fd",
                  overflow: "hidden",
                  maxHeight: "350px",
                  top: "50px",
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
                        >
                          <li
                            style={{
                              border: "1px solid rgb(25 25 25 / 12%)",
                              fontSize: "24px",
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
          <div>
            {user ? (
              <div>
                <ul
                  className="navbar-nav  mt-2 mt-lg-0"
                  style={{ alignItems: "center" }}
                >
                  <li className="nav-item active m-2">
                    <Link to={"/UserP"}>
                      {" "}
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
              <ul className="navbar-nav  mt-2 mt-lg-0">
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
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "20px 20px 0px 0px",
            gap: "30px",
          }}
        >
          {user && display && (
            <>
              <Link to={`/`}>
                <button
                  type="button"
                  className="btn btn-success"
                  // style={{ marginRight: "20px" }}
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
          {user && (
            <>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  border: "2px solid black",
                  background: "black",
                  borderRadius: "4px",
                  cursor:"pointer"
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
