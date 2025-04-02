import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import moms from "../assets/moms.png";
import Navbar from "../components/navbar/NavBar";

const HomePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="container-fluid"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        padding: 0,
        fontFamily: "Roboto, sans-serif",
        backgroundColor: "#EFF6F9",
      }}
    >
      <Navbar />

      <section
        className="hero text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${moms})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          flex: 1,
          width: "100%",
          minHeight: "60vh",
          padding: "2rem",
          backgroundColor: "#2D5F73",
          color: "#ffffff",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold mb-4 text-white">
            Support for Every New Mother
          </h1>
          <p className="lead fs-5 mb-4 text-light">
            OsiHealth provides expert guidance on postpartum health, mental
            well-being, and recovery.
          </p>
          <button
            className="btn btn-primary btn-lg fw-medium"
            style={{ backgroundColor: "#F76C6C", borderColor: "#F76C6C" }}
            onClick={() => navigate("/Appointment")} 
          >
            Book an Appointment
          </button>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="text-center fw-bold mb-5" style={{ color: "#2D3748" }}>
          How We Support You
        </h2>
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div
              className="card p-4 shadow-sm text-center h-100 border-light"
              style={{ backgroundColor: "#ffffff" }}
            >
              <h3 className="fw-bold mb-3" style={{ color: "#2D5F73" }}>
                Postpartum Recovery
              </h3>
              <p className="text-muted">
                Personalized recovery plans to help you regain strength and
                health.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              className="card p-4 shadow-sm text-center h-100 border-light"
              style={{ backgroundColor: "#ffffff" }}
            >
              <h3 className="fw-bold mb-3" style={{ color: "#2D5F73" }}>
                Mental Health Support
              </h3>
              <p className="text-muted">
                Compassionate care for your emotional and mental well-being.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              className="card p-4 shadow-sm text-center h-100 border-light"
              style={{ backgroundColor: "#ffffff" }}
            >
              <h3 className="fw-bold mb-3" style={{ color: "#2D5F73" }}>
                Expert Consultations
              </h3>
              <p className="text-muted">
                Access to specialists for personalized advice and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-4 mt-auto border-top">
        <p className="mb-0">&copy; 2025 OsiHealth. All Rights Reserved.</p>
      </footer>

      {isModalOpen && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div
              className="modal-content p-4 border-0 shadow-lg"
              style={{ backgroundColor: "#EFF6F9" }}
            >
              <h2 className="fw-bold mb-3" style={{ color: "#2D5F73" }}>
                Get Started
              </h2>
              <p className="text-muted mb-4">
                Book a consultation with our specialists today.
              </p>
              <button
                className="btn btn-danger fw-medium"
                style={{ backgroundColor: "#F76C6C", borderColor: "#F76C6C" }}
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
