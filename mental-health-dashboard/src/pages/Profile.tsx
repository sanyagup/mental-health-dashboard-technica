import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.ts";
import type { UserData } from "../types/types.ts";
import type { User } from "firebase/auth";
import Navbar from "./components/Navbar.tsx";
import "./Profile.css";

interface MentalHealthTrackingProps {
  user: User;
}

export default function MentalHealthTracking({ user }: MentalHealthTrackingProps) {
  //create different moods that the user can select from
  
    const [phone, setPhone] = useState("");
    const [edit, setEdit] = useState("");

    const savePhone = async () => {
        const ref = doc(db, "users", user.uid);
        await updateDoc(ref, { phone: edit });
        setPhone(edit);
      };

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data() as UserData;
        setPhone(data.phone);
        setEdit(data.phone);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div>    
        <Navbar />
        <div className="body-profile">
            <h3>Enter your phone number</h3>
            <textarea className="rounded-lg border-2 p-2 w-80 resize" value={edit} onChange={(e) => setEdit(e.target.value)} rows={4} />
            <button className="my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer" onClick={savePhone}>Save</button>
            <p><strong>Saved phone:</strong> {phone}</p>
        </div>
    </div>

  );
}