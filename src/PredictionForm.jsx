import { useState } from "react";
import { db } from "./firebase";
import { ref, push } from "firebase/database";

export default function PredictionForm() {
    const [formData, setFormData] = useState({
        poleP: "",
        qpP: "",
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
            await push(ref(db, "formSubmission"), formData);
            alert("Submitted Predictions");
            setFormData({ poleP: "", qpP: ""});
        } catch(err) {
            console.error("Could not connect to database", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="poleP" 
                value={formData.poleP}
                onChange={handleChange}
                placeholder="Race Pole Prediction"
            />
            <input
                name="qpP"
                value={formData.qpP}
                onChange={handleChange}
                placeholder="Qualifying Pole Predicition"
            />
            <button type="submit">Submit Predicitions</button>
        </form>
    );
}

