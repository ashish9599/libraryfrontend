import React from "react";
import { Link } from "react-router-dom";
import { useBook } from "../hook/bookHook";

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
  // const [category,setCategory]=useState("");
  // const [language,setlanguage]=useState("");
  const languagelist = ["English", "Hindi"];
  const handleCategory = async (e) => {
    const ind = e.target.value;

    const category = categoryList[ind];
    try {
      await seachByCategory(category);
    } catch (error) {
      console.error(error);
    }
  };
  const handlelanguage = async (e) => {
    const ind = e.target.value;
    const language = languagelist[ind];

    try {
      await searchBylanguage(language);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        style={{
          width: "12vw",
          height: "100vh",
          position: "fixed",
          top: "21%",
        }}
      >
        <div
          style={{
            // height: "70%",
            background: "black",
            color: "gray",
            width: "100%",
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
