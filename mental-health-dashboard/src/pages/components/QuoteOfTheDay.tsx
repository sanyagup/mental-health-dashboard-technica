import { useState } from "react";
import "./QuoteOfTheDay.css";

export default function MusicPlaylists() {
  const [selectedQuote, setRandomQuote] = useState<string>(""); // State for selected prompt
  // Array of quotes
  const Quotes = [
    "Start where you are. Use what you have. Do what you can.",
    "If it costs you your peace, it’s too expensive.",
    "No rain, no flowers.",
    "Be a voice, not an echo.",
    "Done is better than perfect.",
    "What we think, we become.",
    "Why be moody when you can shake your booty?",
    "I’m not lazy, I’m on energy-saving mode.",
    "Happiness is not something ready-made. It comes from your own actions.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
  ];
  

    // Randomly select quote
    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * Quotes.length);
        setRandomQuote(Quotes[randomIndex]);
      };
    
  return (
    <div className="quote-of-the-day">
      <h2>Quotes</h2>
      <p className="description-quote">An inspirational quote can make you feel better!</p>
      <div className="quote-container">
        <div className="random-quote">
          <button className="save-button" onClick={getRandomQuote}>
            Get Random Quote
          </button>
          {/* Show the selected quote */}
          {<h3 className="quote-id">{selectedQuote}</h3>}
        </div>
      </div>
    </div>
  );
}
