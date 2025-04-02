import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useLoginUserMutation } from "../../Service/slice";
import "./login.css";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<{ access_token: string } | null>(null);
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await loginUser({ email, password }).unwrap();
      localStorage.setItem("authToken", response.token);
      setMessage("Login successful!");
      setTimeout(() => navigate("/Home"), 1000);
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Login failed. Please check your credentials.";
      setMessage(errorMessage);
      console.error("Error:", err);
    }
  };

  // Google Login
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (response) => {
      setUser({ access_token: response.access_token });
      localStorage.setItem("authToken", response.access_token);
      navigate("/Home");
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
      setMessage("Google login failed. Please try again.");
    },
  });

  // Google Logout
  const logOutGoogle = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("authToken");
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
                <h4 className="text-center mb-4 text-pink">Login</h4>
                {!user ? (
                  <form onSubmit={handleLogin}>
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

                    {message && (
                      <p className="text-danger text-center">{message}</p>
                    )}

                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-custom"
                        disabled={isLoading}
                      >
                        {isLoading ? "Logging in..." : "Login"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center">
                    <p>Logged in via Google</p>
                    <button className="btn btn-danger" onClick={logOutGoogle}>
                      Log Out of Google
                    </button>
                  </div>
                )}

                <p className="text-center mt-3 text-light-gray">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-decoration-none text-pink">
                    Sign Up
                  </a>
                </p>

                {/* Google Login Button */}
                {!user && (
                  <div className="d-grid">
                    <button
                      className="btn google-btn w-100"
                      onClick={() => loginWithGoogle()}
                    >
                      <i className="fab fa-google me-2"></i>Continue with Google
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
