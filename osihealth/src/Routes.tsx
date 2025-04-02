import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/Login/Login";
import SignUpForm from "./pages/SignUP/SignUp";
import Specialists from "./pages/Specialist";
import Appointment from "./pages/Appointment";
import DoctorDashboard from "./pages/dashboard";
import ContactUs from "./pages/contact";

const AppRoutes = () => {
  return (
    <Routes>
      {<Route path="/" element={<LoginForm />} />}
      <Route path="/Home" element={<HomePage />} />
      <Route path="/SignUp" element={<SignUpForm />} />
      <Route path="/Specialist" element={<Specialists />} />
      <Route path="/Appointment" element={<Appointment />} />
      <Route path="/DocDashboard" element={<DoctorDashboard />} />
      <Route path="/ContactUs" element={<ContactUs />} />
    </Routes>
  );
};
export default AppRoutes;
