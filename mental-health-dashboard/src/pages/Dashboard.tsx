import { type User } from "firebase/auth";
import "./Dashboard.css";
import Navbar from "./components/Navbar";
import EmojiSlider from "./components/EmojiSlider";
import WaterIntakeTracker from "./components/WaterIntake";

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {

  return (
    <div className="min-h-screen flex flex-col items-center my-15">
      <Navbar />
      <h1 className="welcome-name">Welcome, {user.email} ! ( ˘ ³˘)♥︎</h1>
      <EmojiSlider />
      <WaterIntakeTracker goal={8} icon="cup" />
    </div>
  );
}
