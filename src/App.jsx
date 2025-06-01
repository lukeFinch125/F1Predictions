import { useState } from 'react'
import { StrictMode } from 'react'
import { Link } from 'react-router-dom'
import PredictionForm from './PredictionForm.jsx'
import './App.css'
import { runJob } from "./results.js";

const App = () => {
  return (
    <>
      <h1>Welcome to F1 Predictions</h1>
      <Link to="/PredictionForm">Prediction Form</Link>
      <button onClick={() => runJob(2025, 6, "Miami", "Sprint")}>Run Job</button>
    </>
  )
}

export default App;
