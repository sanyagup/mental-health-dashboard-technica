import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase"; // Adjusted path to firebase.ts
import type { UserData } from "../types/types";
import { signOut, type User } from "firebase/auth";

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  const [note, setNote] = useState("");
  const [edit, setEdit] = useState("");

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

  const saveNote = async () => {
    const ref = doc(db, "users", user.uid);
    await updateDoc(ref, { notes: edit });
    setNote(edit);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center my-15">
      <h1 className="mb-4">Welcome, {user.email}</h1>
      <textarea className="rounded-lg border-2 p-2 w-80 resize" value={edit} onChange={(e) => setEdit(e.target.value)} rows={4} />
      <br />
      <button className="my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer" onClick={saveNote}>Save</button>
      <button className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer" onClick={handleLogout}>Log Out</button>
      <p><strong>Saved note:</strong> {note}</p>
    </div>
  );
}