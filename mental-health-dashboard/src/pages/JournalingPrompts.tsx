import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import "./JournalingPrompts.css"
import { doc, getDoc, setDoc} from "firebase/firestore";
import { db } from "/Users/sanyagupta/Documents/mental-health-dashboard-technica/mental-health-dashboard/src/firebase/firebase.ts";
import type { UserData } from "/Users/sanyagupta/Documents/mental-health-dashboard-technica/mental-health-dashboard/src/types/types.ts";
import type { User } from "firebase/auth";

interface JournalingPromptsProps {
    user: User;
  }

export default function JournalingPrompts({ user }: JournalingPromptsProps) {
    const [note, setNote] = useState("");
    const [edit, setEdit] = useState("");

    const saveNote = async () => {
        try {
          const ref = doc(db, "users", user.uid);
          await setDoc(ref, { notes: edit }, { merge: true });
          setNote(edit);
          console.log("Note saved!");
        } catch (err) {
          console.error("Failed to save note:", err);
        }
      };

    useEffect(() => {
        const fetchData = async () => {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
            const data = snap.data() as UserData;
            setNote(data.notes);
            setEdit(data.notes);
        }
        };
        fetchData();
    }, [user]);

  return (
    <div>
      <Navbar />
      <textarea className="rounded-lg border-2 p-2 w-80 resize" value={edit} onChange={(e) => setEdit(e.target.value)} rows={4} />
        <button className="my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer" onClick={saveNote}>Save</button>
        <p><strong>Saved note:</strong> {note}</p>
    </div>
  );
}