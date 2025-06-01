import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import PredictionForm from "./PredictionForm.jsx";
import AuthForm from "./createAccount.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/PredictionForm" 
        element={<PredictionForm
        roundNumber={9}
        year={2025}
        session={"qualifying"}
        />} />
        <Route path="/home" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
