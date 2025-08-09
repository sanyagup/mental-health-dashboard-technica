import { useState } from "react";
import "./EmojiSlider.css";

export default function EmojiSlider() {
  const [emoji, setEmoji] = useState<number>(0);

  const EMOJIS = ["😞", "😐", "🙂", "😃", "🤩"];
  return (
    <div className="checkin-card">
      <h2>How are you feeling today?</h2>
        <div className="emoji-row">
          {EMOJIS.map((e, idx) => (
            <button key={idx} className={`emoji-btn ${emoji === idx ? "selected" : ""}`} onClick={() => setEmoji(idx)}> {e} </button>
          ))}
        </div>
    </div>
  );
}
