import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        background: "linear-gradient(to right, #FCE4EC, #E3F2FD)",
        padding: "10px",
      }}
    >
      <div className="container-fluid">
        <NavLink
          className="navbar-brand"
          to="/Home"
          style={{ color: "#F48FB1", fontWeight: "bold", fontSize: "1.5rem" }}
        >
          OsiHealth
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/Home"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Home
              </NavLink>
            </li>

            <li
              className="nav-item dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <NavLink
                to="#"
                className="nav-link dropdown-toggle"
                role="button"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Resources
              </NavLink>
              <ul
                className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                style={{ background: "#E3F2FD" }}
              >
                <li>
                  <NavLink className="dropdown-item" to="/PD">
                    Postpartum Depression
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/guides">
                    Physical Recovery
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/faq">
                    Navigating Motherhood
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink
                to="/specialist"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Our Specialists
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/ContactUs"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
