import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar/NavBar";

const specialistOptions = [
  { name: "Dr. Alice Mukamana", specialty: "Gynecologist" },
  { name: "Dr. Jean-Pierre Niyonsaba", specialty: "Physiotherapist" },
  { name: "Dr. Anna Mpundu", specialty: "Psychotherapist" },
];

interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  specialist: string;
  date: string;
  time: string;
  message: string;
}

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: "",
    email: "",
    phone: "",
    specialist: "",
    date: "",
    time: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch("http://localhost:3004/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message);
      } else {
        setResponseMessage(data.message);
      }
    } catch (error) {
      setResponseMessage("An error occurred while booking the appointment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-5">
        <h2
          className="text-center mb-4"
          style={{ color: "#F48FB1", width: "98vw" }}
        >
          Book an Appointment
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow-sm">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Specialist</label>
                  <select
                    name="specialist"
                    className="form-select"
                    value={formData.specialist}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Specialist</option>
                    {specialistOptions.map((specialist) => (
                      <option key={specialist.name} value={specialist.name}>
                        {specialist.name} - {specialist.specialty}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Preferred Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Preferred Time</label>
                  <input
                    type="time"
                    className="form-control"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-custom w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Booking..." : "Book Appointment"}
                </button>
              </form>

              {responseMessage && (
                <div
                  style={{
                    marginTop: "20px",
                    color: responseMessage.startsWith("Appointment")
                      ? "green"
                      : "red",
                  }}
                >
                  <strong>{responseMessage}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
