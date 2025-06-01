import { StrictMode } from 'react'
import { Link } from 'react-router-dom'
import PredictionForm from './PredictionForm.jsx'
import './App.css'
import { runJob } from "./results.js";
import { gradePrediction } from "./predictionGrader.js";

const App = () => {
  return (
    <>
      <h1>Welcome to F1 Predictions</h1>
      <Link to="/PredictionForm">Prediction Form</Link>
      <button onClick={() => runJob(2025, 9, "qualifying")}>Run Job</button>
      <button onClick={() => gradePrediction("-ORhDgAYNSmachUf3JZX")}>
        Grade Prediction
      </button>
    </>
  );
}

export default App;
