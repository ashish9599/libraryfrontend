import { Link } from "react-router-dom";
import { useAuth } from "../../hook/authHook";
import styles from "../../styles/login.module.css";
const UserP = () => {
  const { user } = useAuth();

  return (
    <>
      <div
        className="Login"
        style={{ height: "90vh", width: "100vw", background: "black" }}
      >
        <div className={styles.loginContainer}>
          <div
            className="card"
            style={{ textAlign: "center", background: "black", color: "white" }}
          >
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
            </div>
            <div>
              {user && (
                <img
                  style={{ width: "30vh", height: "30vh", borderRadius: "50%" }}
                  src={`http://localhost:9000/users/${user.userImage}`}
                  alt="Carcap"
                />
              )}
            </div>
            <div className="card-body">
              <h5 className="card-title">{user && user.name}</h5>
              <h5 className="card-title">{user && user.email}</h5>
              <div style={{ marginTop: "18px" }}>
                <Link to={"/UpdateUser"}>
                  <button className="btn btn-primary">Update</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserP;
