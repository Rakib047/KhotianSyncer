import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { KhotianContextProvider } from "./context/khotianContext";
import { AuthContextProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <KhotianContextProvider>
        <App />
      </KhotianContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
