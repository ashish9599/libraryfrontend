import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changePassword } from "../../api/api";
import styles from "../../styles/login.module.css";
import Loader from "../Loader";
const Forget = () => {
  const [credential, setCredential] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();
  const titleRef = useRef(null);
  useEffect(() => {
    titleRef.current.focus();
  }, []);
  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  setloader(true)
  const { email, password } = credential;
  if (email === "" && password === "") {
    return toast.info("Please fill the form");
  }
  try {
    const res = await changePassword(credential);
    console.log(res);
    if (res.succuss) {
        setloader(true)
        navigate(`/login`);
        setCredential({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
        toast.success(res.message);
      } else {
        toast(res.message);
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
        className="Login"
        style={{
          height: "90vh",
          minHeight: "90vh",
          width: "100vw",
          background: "black",
        }}
      >
        <div className={styles.loginContainer}>
          <form onSubmit={handleSubmit} className={styles.loginform}>
            <div>
              <Link to={`/login`}>
                <span
                  style={{
                    background: "#ffffff8c",
                    display: "block",
                    width: "35px",
                    borderRadius: "50%",
                    height: "35px",
                    boxShadow: " rgb(185 247 232 / 80%) 1px 2px 2px 3px",
                  }}
                >
                  <img
                    style={{ width: "30px", color: "white" }}
                    src="https://iridescent-faloodeh-3725ab.netlify.app/assets/back.png"
                    alt=""
                  />
                </span>
              </Link>
              <div className={styles.heading}>
                <p>Change Password</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Email"
                name="email"
                value={credential.email}
                onChange={onchange}
                ref={titleRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">New Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                name="newPassword"
                value={credential.newPassword}
                onChange={onchange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Password"
                name="confirmPassword"
                value={credential.confirmPassword}
                onChange={onchange}
              />
            </div>

            <div style={{ marginTop: "45px" }}>
              <button
                style={{ position: "absolute", right: "24%" }}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forget;
