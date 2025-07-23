import React, { useEffect } from "react";

function PlayerPage() {
  useEffect(() => {
    // Script को dynamically लोड करें
    const script = document.createElement("script");
    script.src = "/playerjs.js"; // public folder में JS फाइल
    script.async = true;
    script.onload = () => {
      // Query Parameters प्राप्त करें
      const params = new URLSearchParams(window.location.search);
      const fileurl = params.get("fileurl") || "yourfile.mp4";
      const tumbnailurl = params.get("tumbnailurl") || "yourthumbnail.jpg";
      const title = params.get("title") || "Title of File";
      // PlayerJS को इनिशियलाइज़ करें
      if (window.Playerjs) {
        new window.Playerjs({
          id: "player",
          file: fileurl,
          poster: tumbnailurl,
          title: title,
        });
      }
    };
    document.body.appendChild(script);
    // Cleanup (अनावश्यक script हटाएं)
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="player" style={{ width: "100%", height: "480px" }}></div>
    </div>
  );
}

export default PlayerPage;
