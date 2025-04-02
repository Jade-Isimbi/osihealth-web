import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar/NavBar";
import Profile from "../assets/Profile.png";
import { useNavigate } from "react-router-dom";


const specialists = [
  {
    id: 1,
    name: "Dr. Alice Mukamana",
    specialty: "Gynecologist",
    experience: "12 years",
    image: Profile,
    bio: "Dr. Mukamana is a leading gynecologist with 12 years of experience in women's reproductive health, prenatal care, and minimally invasive surgeries. ",
  },
  {
    id: 2,
    name: "Dr. William Manzi",
    specialty: "Physiotherapy",
    experience: "9 years",
    image: Profile,
    bio: "Dr. Manzi is an experienced physiotherapist specializing in rehabilitation, pain management, and sports injuries, helping patients regain mobility and strength.",
  },
  {
    id: 3,
    name: "Dr. Grace Mpundu",
    specialty: "Psychotherapist",
    experience: "7 years",
    image: Profile,
    bio: "Dr. Mpundu is a  psychotherapist specializing in mental health, stress management, , and postpartum wellness helping individuals achieve emotional well-being.",
  },
];

const Specialists: React.FC = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .gradient-custom {
        background: linear-gradient(to right, #FCE4EC, #E3F2FD);
      }
      .btn-custom {
        background-color: #F8BBD0;
        border-color: #F8BBD0;
        color: white;
        font-size: 1rem;
        padding: 10px;
      }
      .btn-custom:hover {
        background-color: #F48FB1;
        border-color: #F48FB1;
      }
      .card-shadow {
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <Navbar />
      <section
        className="vh-100 d-flex justify-content-center align-items-center gradient-custom"
        style={{ width: "100vw" }}
      >
        <div className="container">
          <h2 className="text-center mb-4" style={{ color: "#F48FB1" }}>
            Meet Our Specialists
          </h2>
          <div className="row">
            {specialists.map((doctor) => (
              <div key={doctor.id} className="col-md-4 mb-4">
                <div className="card card-shadow p-3">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="card-img-top rounded-circle mx-auto d-block"
                    style={{ width: "120px", height: "120px" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{doctor.name}</h5>
                    <p className="text-muted">{doctor.specialty}</p>
                    <p>
                      <strong>Experience:</strong> {doctor.experience}
                    </p>
                    <p className="text-muted small">{doctor.bio}</p>
                    <button
                      className="btn btn-custom w-100"
                      onClick={() => navigate("/Appointment")}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Specialists;
