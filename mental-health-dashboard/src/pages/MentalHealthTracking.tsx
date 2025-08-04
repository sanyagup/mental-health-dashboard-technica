import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.ts";
import type { UserData } from "../types/types.ts";
import  { type User } from "firebase/auth";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./MentalHealthTracking.css";
import Navbar from "./components/Navbar";

interface MentalHealthTrackingProps {
  user: User;
}

export default function MentalHealthTracking({ user }: MentalHealthTrackingProps) {
  //create different moods that the user can select from

    const [moods, setMoods] = useState<number[]>([0,0,0,0,0]);
    const [edit, setEdit] = useState<number[]>([0,0,0,0,0]);

    const incrementMood = async (index: number) => {
      const updated = [...edit];
      updated[index] += 1;
      setEdit(updated);
    
      // Save immediately to Firestore
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { moods: updated });
      setMoods(updated); // Keep local state in sync
    };

    const resetMoods = () => {
      const reset = [0, 0, 0, 0, 0];
      setEdit(reset);
      setMoods(reset);
    
      // Reset in Firestore
      const ref = doc(db, "users", user.uid);
      updateDoc(ref, { moods: reset });
    }

    const moodLabels = ["Happy", "Sad", "Neutral", "Angry", "Very Angry"];
    const data = moods.map((value, index) => ({
      name: moodLabels[index],
      count: value,
    }));
    
    
    useEffect(() => {
      const fetchData = async () => {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as UserData;
          setMoods((data.moods as (number | string)[]).map(m => Number(m)) || [0, 0, 0, 0, 0]);
          setEdit((data.moods as (number | string)[]).map(m => Number(m)) || [0, 0, 0, 0, 0]);
        }
      };
      fetchData();
    }, [user]);

  return (
    <div>
      <Navbar />

      <h1 className="title">Welcome {user.email} to the Mental Health Dashboard ( ˶ˆᗜˆ˵ )</h1>
      <h2 className="description">This is where you can log your mood and see how your mood changes throughout the Hackathon. According to research, tracking your mood can help you realize whether you need to take a break or not. Hope this helps you hacker! </h2>
      
      <div className="middle">
        <div className="left-sidebar">
          <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#000000" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>  
        </div>

        <div className="right-sidebar">
          <button className="button" onClick={resetMoods}> Reset Counter (temp) </button>
          <button className="button" onClick={() => incrementMood(0)}>Happy</button>
          <button className="button" onClick={() => incrementMood(1)}>Sad</button>
          <button className="button" onClick={() => incrementMood(2)}>Neutral</button>
          <button className="button" onClick={() => incrementMood(3)}>Angry</button>
          <button className="button" onClick={() => incrementMood(4)}>Very angry</button>
        </div>  
      </div>
    
    
    </div>
  );
}