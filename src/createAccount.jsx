// AuthForm.jsx
import { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        navigate("/home");
      }
    } catch (err) {
      console.error(err.message);
      alert("Authentication error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      <p
        onClick={() => setIsRegistering((prev) => !prev)}
        style={{ cursor: "pointer", color: "blue" }}
      >
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </p>
    </form>
  );
}
