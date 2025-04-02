import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId="928349838449-g73tah0173bur87tbut256hs8b8cl8c0.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </GoogleOAuthProvider>
);
