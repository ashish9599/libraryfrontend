import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../api/api";
import { toast } from "react-toastify";

import Addimage from "../../images/icons8-add-image-48.png";
import styles from "../../styles/login.module.css";
const Register = () => {
  const navigate = useNavigate();

  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userImage, setUserImage] = useState(null);

  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = credential;
    if (name === "" && email === "" && password === "") {
      return toast.info("Please fill the form");
    }

    try {
      const res = await signUp(credential, userImage);

      if (res.succuss) {
        navigate(`/`);
        toast.success(res.message);
        setCredential({ name: "", email: "", password: "" });
      } else {
        toast(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="Login"
      style={{ height: "90vh", width: "100vw", background: "black" }}
    >
      <div className={styles.loginContainer}>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className={styles.loginform}
        >
          <div className={styles.heading}>
            <p>Login to Ash BOOKStore</p>
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
          <div className={styles.create} style={{ marginTop: "62px" }}>
            <p>
              <Link to={"/login"}>Already hava an account?</Link>
            </p>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;