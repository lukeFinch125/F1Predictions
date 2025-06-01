import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import PredictionForm from "./PredictionForm.jsx";
import AuthForm from "./createAccount.jsx";
import { runJob } from "./results.js";

const root = createRoot(document.getElementById("root"));
runJob();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/PredictionForm" element={<PredictionForm />} />
        <Route path="/home" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
