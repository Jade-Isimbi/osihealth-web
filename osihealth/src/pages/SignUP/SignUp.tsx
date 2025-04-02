import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRegisterUserMutation } from "../../Service/slice";

const SignUpForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      await registerUser({ name, email, password }).unwrap();
      setMessage("User registered successfully!");
      setTimeout(() => navigate("/Home"), 1000);
    } catch (err) {
      let errorMessage = "Registration failed. Please try again.";

      if (typeof err === "object" && err !== null) {
        if (
          "data" in err &&
          typeof err.data === "object" &&
          err.data !== null
        ) {
          errorMessage =
            (err.data as { message?: string }).message || errorMessage;
        } else if ("message" in err) {
          errorMessage = (err as { message?: string }).message || errorMessage;
        }
      }

      setMessage(errorMessage);
      console.error("Error:", err);
    }
  };

  return (
    <>
      <section
        className="vh-100 d-flex justify-content-center align-items-center gradient-custom"
        style={{ width: "100vw" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow p-4">
                <h4 className="text-center mb-4 text-pink">Sign Up</h4>
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="nameInput"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="emailInput"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="passwordInput"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="confirmPasswordInput"
                      className="form-label"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPasswordInput"
                      className="form-control"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {message && (
                    <p className="text-danger text-center">{message}</p>
                  )}

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-custom"
                      disabled={isLoading}
                    >
                      {isLoading ? "Registering..." : "Sign Up"}
                    </button>
                  </div>
                </form>

                <p className="text-center mt-3 text-light-gray">
                  Already have an account?{" "}
                  <a href="/" className="text-decoration-none text-pink">
                    Log In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpForm;
