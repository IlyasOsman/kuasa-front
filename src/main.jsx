import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {AuthProvider} from "./contexts/AuthContext";

import {inject} from "@vercel/analytics";

inject();

import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
