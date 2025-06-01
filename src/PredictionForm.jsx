import { useState } from "react";
import { db } from "./firebase";
import { ref, push } from "firebase/database";
import './PredictionForm.css';

/*
Good Surprise
A Big Flop
Top Three Qualifying
Top Three Race
Bold Prediction
Driver vs Driver
Team vs Team
How Many Safety Cars
*/

const drivers = ["Piastri", "Norris", "Verstappen", "Russell", "Leclerc", "Hamilton",
    "Antonelli", "Albon", "Hadjar", "Ocon", "Hulkenberg", "Stroll", "Sainz", "Gasly",
    "Tsunoda", "Bearman", "Lawson", "Alonso", "Bortoleto", "Colapinto"
    ]

const teams = ["Mclaren", "Ferrari", "Mercedes", "Red Bull", "Williams", "Racing Bulls",
    "Haas", "Kick Sauber", "Aston Martin", "Alpine"
]

//leave out subjective questions for now
export default function PredictionForm( {roundNumber, year, session} ) {
    const [formData, setFormData] = useState({
        roundNumber: roundNumber,
        year: year,
        sessionType: session,
        FirstQualifying: "",
        SecondQualifying: "",
        ThirdQualifying: "",
        FirstRace: "",
        SecondRace: "",
        ThirdRace: "",
        SafetyCars: "",
        WorseTeam: "",
        BetterTeam: "",
        WorseDriver: "",
        BetterDriver: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submissionRef = ref(db, "formSubmissions");
            await push(submissionRef, formData);
            alert("Submitted Predictions");
            setFormData({
              roundNumber,
              year,
              sessionType: session,
              FirstQualifying: "",
              SecondQualifying: "",
              ThirdQualifying: "",
              FirstRace: "",
              SecondRace: "",
              ThirdRace: "",
              SafetyCars: "",
              WorseTeam: "",
              BetterTeam: "",
              WorseDriver: "",
              BetterDriver: "",
            });
        } catch(err) {
            console.error("Could not connect to database", err);
        }
    };

    return (
      <form onSubmit={handleSubmit} id="predictionForm">
        <h2>F1 Weekend Predictions For Miami 2025</h2>
        <div className="inputContainer">
          <div className="labelContainer">
            <label htmlFor="FirstQualifying">Pole In Qualifying</label>
            <select
              className="form-input"
              name="FirstQualifying"
              value={formData.FirstQualifying}
              onChange={handleChange}
            >
              <option value="">-- Select Driver --</option>
              {drivers.map((driver) => (
                <option key={driver} value={driver}>
                  {driver}
                </option>
              ))}
            </select>
          </div>
          <div className="labelContainer">
            <label htmlFor="SecondQualifying">Second In Qualifying</label>
            <select
              className="form-input"
              name="SecondQualifying"
              value={formData.SecondQualifying}
              onChange={handleChange}
            >
              <option value="">-- Select Driver --</option>
              {drivers.map((driver) => (
                <option key={driver} value={driver}>
                  {driver}
                </option>
              ))}
            </select>
          </div>
          <div className="labelContainer">
            <label htmlFor="ThirdQualifying">Third In Qualifying</label>
            <select
              className="form-input"
              name="ThirdQualifying"
              value={formData.ThirdQualifying}
              onChange={handleChange}
            >
              <option value="">-- Select Driver --</option>
              {drivers.map((driver) => (
                <option key={driver} value={driver}>
                  {driver}
                </option>
              ))}
            </select>
          </div>
          <div className="labelContainer">
            <label htmlFor="FirstRace">Pole In Race</label>
            <select
              className="form-input"
              name="FirstRace"
              value={formData.FirstRace}
              onChange={handleChange}
            >
              <option value="">-- Select Driver --</option>
              {drivers.map((driver) => (
                <option key={driver} value={driver}>
                  {driver}
                </option>
              ))}
            </select>
          </div>
          <div className="labelContainer">
            <label htmlFor="SecondRace">Second In Race</label>
            <select
              className="form-input"
              name="SecondRace"
              value={formData.SecondRace}
              onChange={handleChange}
            >
              <option value="">-- Select Driver --</option>
              {drivers.map((driver) => (
                <option key={driver} value={driver}>
                  {driver}
                </option>
              ))}
            </select>
          </div>
          <div className="labelContainer">
            <label htmlFor="ThirdRace">Third In Race</label>
            <select
              className="form-input"
              name="ThirdRace"
              value={formData.ThirdRace}
              onChange={handleChange}
            >
              <option value="">-- Select Driver --</option>
              {drivers.map((driver) => (
                <option key={driver} value={driver}>
                  {driver}
                </option>
              ))}
            </select>
          </div>
          <div className="labelContainer">
            <label htmlFor="SafetyCars">Number Of Safety Cars in Race</label>
            <input
              className="form-input"
              name="SafetyCars"
              value={formData.SafetyCars}
              onChange={handleChange}
            />
          </div>
          <div className="labelContainer">
            <label htmlFor="WorseTeam">
              This Team will Score Less Points than Other Team
            </label>
            <select
              className="form-input"
              name="WorseTeam"
              value={formData.WorseTeam}
              onChange={handleChange}
            >
              <option value="">-- Select Team --</option>
              {teams.map((Team) => (
                <option key={Team} value={Team}>
                  {Team}
                </option>
              ))}
            </select>
          </div>
          <div className="labelContainer">
            <label htmlFor="BetterTeam">
              This Team will Score More Points than Other Team
            </label>
            <select
              className="form-input"
              name="BetterTeam"
              value={formData.BetterTeam}
              onChange={handleChange}
            >
              <option value="">-- Select Team --</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
          <div className="labelContainer">
            <label htmlFor="BetterDriver">
              This Driver will score more points than other Driver
            </label>
            <select
              className="form-input"
              name="BetterDriver"
              value={formData.BetterDriver}
              onChange={handleChange}
            >
              <option value="">-- Select Driver --</option>
              {drivers.map((driver) => (
                <option key={driver} value={driver}>
                  {driver}
                </option>
              ))}
            </select>
          </div>
          <div className="labelContainer">
            <label htmlFor="WorseDriver">
              This Driver will score less points than other Driver
            </label>
            <select
              className="form-input"
              name="WorseDriver"
              value={formData.WorseDriver}
              onChange={handleChange}
            >
              <option value="">-- Select Driver --</option>
              {drivers.map((driver) => (
                <option key={driver} value={driver}>
                  {driver}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="submitButton">
          Submit Predicitions
        </button>
      </form>
    );
}

