import ALt from "../assets/ATB3o.gif";
import styles from "./books/book.module.css";
const Loader = () => {
  return (
    <div style={{}}>
      <div
        style={{
          // background: "blueviolet",
          textAlign: "center",
        }}
      >
        <img src={ALt} alt="loading" className={styles.imgh} />
      </div>
    </div>
  );
};

export default Loader;
