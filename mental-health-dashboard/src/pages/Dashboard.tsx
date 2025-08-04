import { type User } from "firebase/auth";
import "./Dashboard.css";
import Navbar from "./components/Navbar";

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {

  return (
    <div className="min-h-screen flex flex-col items-center my-15">
      <Navbar />

      <h1 className="welcome-name">Welcome, {user.email} ! ( ˘ ³˘)♥︎</h1>
            
    </div>
  );
}