import { auth } from "../../firebase/firebase";
import  { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Ensure you have the correct path to your CSS file

export default function Navbar() {

    const handleLogout = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

  return (
    <div>
        
        <nav className="navbar">
          <div className="navbar-links">
            <Link to="/" className="navbar-link">
              Dashboard
            </Link>
            <Link to="/MentalHealthTracking" className="navbar-link">
              Mental Health Tracking
            </Link>
            <Link to="/JournalingPrompts" className="navbar-link">
              Journaling Prompts
            </Link>
            <Link to="/MusicPlaylists" className="navbar-link">
              Music Playlists
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
    
    </div>
  );
}