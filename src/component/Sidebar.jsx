import React from "react";
import { Link } from "react-router-dom";
import { useBook } from "../hook/bookHook";
import style from "./home.module.css";
import { useAuth } from "../hook/authHook";
export default function Sidebar() {
  const { seachByCategory, searchBylanguage } = useBook();
  const categoryList = [
    "English",
    "History",
    "Romance",
    "Horror",
    "fiction",
    "Thriller",
    "Adventure",
  ];
  const { setProgress } = useAuth();
  // const [category,setCategory]=useState("");
  // const [language,setlanguage]=useState("");
  const languagelist = ["English", "Hindi"];
  const handleCategory = async (e) => {
    setProgress(10);
    const ind = e.target.value;

    const category = categoryList[ind];
    try {
      await seachByCategory(category);
      setProgress(100);
    } catch (error) {
      console.error(error);
    }
  };
  const handlelanguage = async (e) => {
    setProgress(10);
    const ind = e.target.value;
    const language = languagelist[ind];

    try {
      await searchBylanguage(language);
      setProgress(100);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className={`${style.side} ${style.fs}`}
        style={{
          // height: "100vh",
          position: "sticky",
          width: "12%",
          // top: "21%",
          padding:"20px"
        }}
      >
        <div
          style={{
            // height: "70%",
            background: "black",
            color: "gray",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <div>
            <h4> Category</h4>
          </div>

          <ul
            style={{
              padding: "0px",
              marginTop: "10px",
              // background: "beige",
              gap: "10px",
              display: "flex",
              flexDirection: "column",
              listStyle: "none",
              textAlign: "center",
            }}
          >
            {categoryList.map((list, i) => (
              <Link style={{ color: "grey" }} key={i}>
                <li value={i} onClick={handleCategory}>
                  {list}
                </li>
              </Link>
            ))}
          </ul>
          <div>
            <h4>Language</h4>
          </div>

          <ul
            style={{
              padding: "0px",
              marginTop: "10px",
              // background: "beige",
              gap: "10px",
              display: "flex",
              flexDirection: "column",
              listStyle: "none",
              textAlign: "center",
            }}
          >
            {languagelist.map((list, i) => (
              <Link style={{ color: "grey" }} key={i}>
                <li value={i} onClick={handlelanguage}>
                  {list}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
