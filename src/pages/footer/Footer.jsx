import React from "react";
import "./footer.css";
export default function Footer() {
  return (
    <>
      <div>
        <section id="contact">
          <h1 className="section-heading mb50px">
            <span>
              <i className="far fa-address-card"></i>
            </span>
            <span> Contact </span>
          </h1>
          <div id="contact-container">
            <div id="my-details-container">
              <h3> Get In touch </h3>
              <p>
                {" "}
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.{" "}
              </p>

              <h3> My Address </h3>
              <div className="my-details-info-container">
                <i className="fas fa-map-marker-alt"></i>
                <span>Delhi, India</span>
              </div>
              <div className="my-details-info-container">
                <i className="fas fa-mobile-alt"></i>
                <span>9999999999</span>
              </div>
              <div className="my-details-info-container">
                <i className="far fa-classenvelope"></i>
                <span>myemail@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="text-center social-icons">
            <ul className="no-list-style horizontal-list">
              <li>
                {/* <a href=""> */}
                <i className="fab fa-linkedin-in"></i>
                {/* </a> */}
              </li>

              <li>
                {/* <a href="" target="blank"> */}
                <i className="fab fa-stack-overflow"></i>
                {/* </a> */}
              </li>

              <li>
                {/* <a href="" target='blank'> */}
                <i className="fab fa-google-plus-g"></i>
                {/* </a> */}
              </li>

              <li>
                {/* <a href=""> */}
                <i className="fab fa-facebook-f"></i>
                {/* </a> */}
              </li>

              <li>
                {/* <a href="" target="blank"> */}
                <i className="fab fa-quora"></i>
                {/* </a> */}
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
