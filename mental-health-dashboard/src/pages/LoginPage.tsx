/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { type UserData } from "../types/types";
import { Link, useNavigate } from "react-router";
import "./auth.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (signup) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const defaultData: UserData = { 
          email: email, 
          notes: "Use the textbox above to change me!" 
        };
        await setDoc(doc(db, "users", userCred.user.uid), defaultData);
        navigate("/");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      }
    } catch (error: any ) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
    <div className="auth-box">
      <h1>{signup ? "Sign Up" : "Log In"}</h1>
      <input
        className="input-field"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input-field"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="submit-button" onClick={handleAuth}>
        {signup ? "Sign Up" : "Log In"}
      </button>
      <p className="toggle-text" onClick={() => setSignup(!signup)}>
        {signup ? "Already have an account?" : "Need to sign up?"}
      </p>
      <Link to="/forgot-password" className="forgot-link">
        Forgot password?
      </Link>
    </div>
  </div>
  );
}