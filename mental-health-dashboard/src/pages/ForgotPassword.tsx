/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link } from "react-router";
import "./forgotpass.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h1>Reset Password</h1>
        {sent ? (
          <p className="forgot-sucess-message">Password reset email sent!</p>
        ) : (
          <>
            <input className="forgot-input-field"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="forgot-submit-button"  onClick={handleReset}>Send Reset Email</button>
          </>
        )}
        <p>
          <Link className="forgot-back-link" to="/login">Back to login</Link>
        </p>
      </div>
    </div>
  );

}