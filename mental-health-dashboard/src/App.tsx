import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase/firebase";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ForgotPassword from "./pages/ForgotPassword";
import MentalHealthTracking from "./pages/MentalHealthTracking";
import JournalingPrompts from "./pages/JournalingPrompts";
import MusicPlaylists from "./pages/MusicPlaylists";
import "./App.css"
import StretchingGuide from "./pages/StretchingGuide";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsub;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Dashboard user={user}/> : <Navigate to="login" replace/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/MentalHealthTracking" element={user ? (<MentalHealthTracking user={user} /> ) : ( <Navigate to="/login" replace /> ) } />
        <Route path="/JournalingPrompts" element={user ? (<JournalingPrompts user={user} /> ) : ( <Navigate to="/login" replace /> ) } />
        <Route path="/MusicPlaylists" element={<MusicPlaylists />} />

        <Route path="/StretchingGuide" element={<StretchingGuide />} />
        <Route path="/Profile" element={user ? (<Profile user={user} /> ) : ( <Navigate to="/login" replace /> ) } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
