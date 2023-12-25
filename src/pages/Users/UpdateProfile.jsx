import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hook/authHook";
import Addimage from "../../images/icons8-add-image-48.png";
import styles from "../../styles/login.module.css";

const UpdateProfile = () => {
  const { user ,setProgress} = useAuth();
  const [credential, setCredential] = useState({
    name: user.name,
    email: user.email,
  });

  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();
  const { UpdateUser } = useAuth();
  const titleRef = useRef(null);
  useEffect(() => {
    titleRef.current.focus();
  }, []);
  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(10)
    const { name, email } = credential;
    if (email === "" && name === "") {
      return toast.info("Please fill the form");
    }
    try {
      setProgress(40)
      
      const res = await UpdateUser(credential, userImage);
      if (res.succuss) {
        navigate(`/UserP`);
        toast.success(res.message);
        setProgress(70)
        setCredential({ name: "", email: "" });
      } else {
        toast.error(res.message);
      }
      setProgress(100)
     
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
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className={styles.loginform}
          >
            <div>
              <Link to={`/UserP`}>
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
                <p>Update user</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                ref={titleRef}
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

            <div className="form-group col-md-4">
              <label htmlFor="userImage" className={styles.file}>
                <p> Profile</p>
                <img src={Addimage} alt="" />
              </label>{" "}
              <input
                type="file"
                className="form-control-file"
                id="userImage"
                name="userImage"
                onChange={(e) => setUserImage(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>

            <div className={styles.mU}>
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

export default UpdateProfile;
