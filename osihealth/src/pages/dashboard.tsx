import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar/NavBar";
import { useGetAppointmentsQuery } from "../Service/slice";

interface Appointment {
  name: string;
  email: string;
  phone: string;
  specialist: string;
  date: string;
  time: string;
  message: string;
}

const AppointmentsDashboard: React.FC = () => {
  const { data: appointments, isLoading, error } = useGetAppointmentsQuery({}); 


  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>Error . Please try again.</p>;

  return (
    <>
      <Navbar />
      <div
        className="container-fluid vh-100 d-flex flex-column align-items-center justify-content-center"
        style={{ width: "100vw" }}
      >
        <h2 className="text-center mb-4" style={{ color: "#F48FB1" }}>
          Appointments Dashboard
        </h2>

        {isLoading && <p className="text-center">Loading...</p>}
        {error && (
          <p className="text-danger text-center">Failed to load appointments</p>
        )}

        {!isLoading && !error && appointments?.length === 0 && (
          <p className="text-center">No appointments booked yet.</p>
        )}

        {!isLoading && appointments && appointments.length > 0 && (
          <div className="table-responsive w-100 px-3">
            <table className="table table-bordered table-striped shadow-sm text-center">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Specialist</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment: Appointment, index: number) => (
                  <tr key={index}>
                    <td>{appointment.name}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.phone}</td>
                    <td>{appointment.specialist}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AppointmentsDashboard;
