import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import "./JournalingPrompts.css"
import { doc, getDoc, setDoc} from "firebase/firestore";
import { db } from "../firebase/firebase.ts";
import type { UserData } from "../types/types.ts";
import type { User } from "firebase/auth";

interface JournalingPromptsProps {
    user: User;
  }

export default function JournalingPrompts({ user }: JournalingPromptsProps) {
    const [note, setNote] = useState("");
    const [edit, setEdit] = useState("");
    const [currentPrompt, setCurrentPrompt] = useState<string>(""); // State for selected prompt

    const prompts = [
        "What excites you the most about your hackathon project?",
        "What’s one thing you learned today while working on your project?",
        "Write about a challenge you faced today and how you overcame it.",
        "How does your project make a positive impact on others?",
        "What new skill did you pick up during this hackathon?",
        "Describe a moment when your team worked really well together.",
        "What are you most proud of accomplishing so far?",
        "How did you feel when you made progress on a tough problem?",
        "What’s one unexpected thing you discovered during your project?",
        "Who on your team inspired or motivated you today?",
        "Write about a small win you celebrated during the hackathon.",
        "How are you balancing stress and rest during this event?",
        "What was your favorite moment from the hackathon so far?",
        "How has this hackathon helped you grow as a person or teammate?",
        "What’s something that frustrated you today, and how did you handle it?",
        "Write about an idea your team had that made you feel excited.",
        "How does it feel to see your hard work come to life?",
        "What advice would you give yourself at the start of this hackathon?",
        "What’s one thing you’re grateful for about your hackathon experience?",
        "How did you support or encourage your teammates today?",
        "What’s one fun or memorable thing that happened during the hackathon?",
        "How has this hackathon boosted your confidence or skills?",
        "Write about a creative breakthrough you had while working.",
        "What’s one way this experience will help you in the future?",
        "How do you feel about presenting or sharing your project?",
        "What was a moment you laughed or felt lighthearted during hacking?",
        "Write about how your project could grow beyond this hackathon.",
        "How do you feel knowing you’re almost done with your project?",
        "What will you remember most about this hackathon?",
        "If you could thank your team in one sentence, what would you say?"
      ];
      
      const getRandomPrompt = () => {
        const randomIndex = Math.floor(Math.random() * prompts.length);
        setCurrentPrompt(prompts[randomIndex]);
      };

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
      <div className="journaling-container">
      <button className="save-button" onClick={getRandomPrompt}>
        Get Random Prompt
      </button>
      {currentPrompt && <h3 className="prompt-heading">{currentPrompt}</h3>}    
        <textarea className="" value={edit} onChange={(e) => setEdit(e.target.value)} rows={4} />
        <button className="save-button" onClick={saveNote}>Save</button>
        <p><strong>Saved note:</strong> {note}</p>
      </div>
    </div>
  );
}