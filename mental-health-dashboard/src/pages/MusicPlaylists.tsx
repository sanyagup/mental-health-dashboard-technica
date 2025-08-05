import YouTube from "react-youtube";
import Navbar from "./components/Navbar";
import { useState } from "react";
import "./MusicPlaylists.css"; // Import your CSS file for styling

export default function MusicPlaylists() {
  const [selectedVideoId, setRandomSong] = useState<string>(""); // State for selected prompt
  const [videoID, setVideoID] = useState<string>(""); // State for video ID input
  // Array of video IDs
  const videoIds = [ 
    "FPEJZ2NN8wE",
    "bcuCxCuBac0",
    "F9ozjFFohtg", 
    "3L_i0VqAC94",
    "HTc5GUGgCpc",
  ];

    // Randomly select a video ID from the array
    const getRandomSong = () => {
        const randomIndex = Math.floor(Math.random() * videoIds.length);
        setRandomSong(videoIds[randomIndex]);
      };
    
  return (
    <div className="music-playlists">
      <Navbar />
      <h1 className="title">Music Playlists</h1>
      <p>Here you can find curated music playlists to help improve your mental well-being. Or you can input your own! Put the video ID in this box.</p>
      <p className="description">To get the video ID of a YouTube video, open the video on YouTube and look at the URL in your browser’s address bar. The video ID is the unique string of letters and numbers that comes after v= in the URL. For example, in https://www.youtube.com/watch?v=FPEJZ2NN8wE, the video ID is FPEJZ2NN8wE. Copy this ID and paste it into the box above to play your chosen video.</p>     
      <textarea
        value={videoID}
        onChange={(e) => setVideoID(e.target.value)}
        placeholder="Enter the video ID of your music video"
      />
        {videoID && (<YouTube className="youtube-video" videoId={videoID} opts={{ width: "100%", height: "300" }} />)}
      <div className="playlist-container">
        <div className="playlist-item">
          <h2>Relaxing Tunes</h2>
          <p>A collection of calming music to help you unwind.</p>
          <button className="save-button" onClick={getRandomSong}>
            Get Random Song
          </button>

          {/* Show the selected video ID */}
          {selectedVideoId && <h3 className="youtube-video-id">Now Playing!</h3>}

          {/* Only render YouTube if we have a selected video */}
          {selectedVideoId && (
            <YouTube className="youtube-video" videoId={selectedVideoId} opts={{ width: "100%", height: "300" }} />
          )}
        </div>
      </div>
    </div>
  );
}
