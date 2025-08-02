import { auth, db } from "../firebase/firebase";
import { signOut, type User } from "firebase/auth";
import { Link } from "react-router-dom";
import "./Dashboard.css";

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center my-15">
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Dashboard
          </Link>
          <Link to="/MentalHealthTracking" className="navbar-link">
            Mental Health Tracking
          </Link>
          <Link to="/profile" className="navbar-link">
            Profile
          </Link>
          <Link to="/settings" className="navbar-link">
            Settings
          </Link>
        </div>
        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </nav>

      <h1 className="welcome-name">Welcome, {user.email} ! ( ˘ ³˘)♥︎</h1>
            
    </div>
  );
}