import Youtube from "react-youtube";
import Navbar from "./components/Navbar";
import { useState } from "react";
import "./StretchingGuide.css";

export default function StretchingGuide() {
    const [selectedVideoId, setSelectedVideoId] = useState<string>("");

    // Array of video IDs used for random generate
    const stretchingVideos = [
    "XMhyk4Ym15I",
    "TIjnkwaFkwM",
    "0XBcrjkkwQo",
    "5bGrjl0ZeN4",
    "n0sCHcQK4_0",
    ];

        // Randomly select a video ID from the array
        const getRandomVideo = () => {
        const randomIndex = Math.floor(Math.random() * stretchingVideos.length);
        setSelectedVideoId(stretchingVideos[randomIndex]);
        };

    return (
        <div> 
            <Navbar />
        <div className="stretching-guide">
            <h1 className="title">Stretching Guide</h1>
            <p>Take a break and try one of these relaxing stretching tutorials to refresh your body and mind!</p>
            <p className="description">Click the button to get a stretching tutorial you can simply do at your workstation!</p>
            <button className="save-button" onClick={getRandomVideo}>Get Random Stretching Video</button>
                {selectedVideoId && (
                    <>
                        <h3 className="youtube-video-id">Now Playing!</h3>
                        <Youtube className="youtube-video" videoId={selectedVideoId} opts={{ width: "100%", height: "300" }} />
                    </>
                )}
            </div>
        </div>
    );

};
