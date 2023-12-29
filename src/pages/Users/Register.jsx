import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../api/api";
import { toast } from "react-toastify";

import Addimage from "../../images/icons8-add-image-48.png";
import styles from "../../styles/login.module.css";

import { useAuth } from "../../hook/authHook";
const Register = () => {
  const navigate = useNavigate();

  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userImage, setUserImage] = useState(null);
  const titleRef = useRef(null);
  const { setProgress } = useAuth();
  useEffect(() => {
    titleRef.current.focus();
  }, []);
  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(10);
    const { name, email, password } = credential;
    if (name === "" && email === "" && password === "") {
      return toast.info("Please fill the form");
    }

    try {
      setProgress(40);

      const res = await signUp(credential, userImage);

      if (res.succuss) {
        setProgress(70);
        navigate(`/`);
        toast.success(res.message);
        setCredential({ name: "", email: "", password: "" });
      } else {
        toast(res.message);
      }
      setProgress(100);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ height: "700px", background: "black" }}>
        <div
          className={`${styles.loginContainer} ${styles.h}`}
          style={{ minWidth: "25vmax" }}
        >
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className={styles.loginform}
          >
            <div className={styles.heading}>
              <p>SignUp to Ash BOOKStore</p>
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
                placeholder="Enter name"
                name="name"
                value={credential.name}
                ref={titleRef}
                onChange={onchange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                value={credential.email}
                onChange={onchange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                value={credential.password}
                onChange={onchange}
              />
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="userImage" className={styles.file}>
                <p> Profile</p>
                <img src={Addimage} alt="" />
              </label>
              <input
                type="file"
                className="form-control-file"
                id="userImage"
                name="userImage"
                onChange={(e) => setUserImage(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div
              className={`${styles.create} ${styles.mL} `}
              style={{ padding: "30px 70px 0 0" }}
            >
              <p>
                <Link to={"/login"}>Already hava an account?</Link>
              </p>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: "10vmax",
                }}
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

export default Register;
