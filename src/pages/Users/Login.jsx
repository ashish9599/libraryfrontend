import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hook/authHook";
import styles from "../../styles/login.module.css";

const Login = () => {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
 
  const navigate = useNavigate();
  const { user, loginUser,setProgress } = useAuth();
  const titleRef = useRef(null);
  useEffect(() => {
    titleRef.current.focus();
  }, []);
  if (user) {
    return <Navigate to="/" />;
  }

  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(10)
    const { email, password } = credential;
    if (email === "" && password === "") {
      return toast.info("Please fill the form");
    }
    try {
      setProgress(40)
     
      const res = await loginUser(credential);
      console.log("login", res);
      if (res.succuss) {
        setProgress(70)
        navigate(`/`);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
      setProgress(100)
   
      setCredential({ email: "", password: "" });
    } catch (error) {
      console.log(error);
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
       
      </div>
      <div
        className="Login"
        style={{ height: "90vh", width: "100vw", background: "black" }}
      >
        <div className={styles.loginContainer}>
          <form onSubmit={handleSubmit} className={styles.loginform}>
            <div className={styles.heading}>
              <p>Login to Ash BOOKStore</p>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                value={credential.email}
                onChange={onchange}
                ref={titleRef}
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
                // minLength={5}
              />
            </div>
            <p>
              <Link to={"/forgetPassword"}>Forget Password</Link>
            </p>

            <div className={styles.create}>
              <p>
                <Link to={"/register"}>Create an account</Link>
              </p>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
