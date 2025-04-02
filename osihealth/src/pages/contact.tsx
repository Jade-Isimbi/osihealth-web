import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar/NavBar";

const ContactUs: React.FC = () => {
  return (
    <>
      <Navbar />
      <div
        className="container-fluid vh-100 d-flex flex-column align-items-center justify-content-center bg-light "
        style={{ width: "100vw" }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: "#F48FB1", fontWeight: "bold" }}
        >
          Contact Us
        </h2>

        <div
          className="text-center p-4 bg-white shadow-lg rounded-3"
          style={{ maxWidth: "500px" }}
        >
          <p className="fw-bold text-primary fs-5">Who We Are</p>
          <p className="text-muted">
            We are committed to revolutionizing women's healthcare by making
            essential services more accessible, convenient, and supportive for
            every woman.
          </p>
          <hr />
          <p className="fw-bold text-primary fs-5">Contact Information</p>
          <p className="mb-1">
            <strong>Email:</strong> contact@osihealth.com
          </p>
          <p className="mb-1">
            <strong>Address:</strong> KG 181 Street
          </p>
          <p className="mb-0">
            <strong>Phone:</strong> +250 789 345
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
