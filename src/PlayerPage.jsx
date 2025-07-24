import React, { useEffect } from "react";

function PlayerPage() {
  useEffect(() => {
    // Create script tag to load playerjs.js
    const script = document.createElement("script");
    script.src = "/playerjs.js"; // Your playerjs.js path
    script.async = true;

    script.onload = () => {
      const params = new URLSearchParams(window.location.search);

      const fileurl = params.get("fileurl") || "yourfile.mp4";
      const tumbnailurl = params.get("tumbnailurl") || "yourthumbnail.jpg";
      const title = params.get("title") || "Title of File";

      let vttfileurl = params.get("vttfileurl") || "";

      if (window.Playerjs) {
        new window.Playerjs({
          id: "player",
          file: fileurl,
          poster: tumbnailurl,
          title: title,
          ...(vttfileurl && { thumbnails: vttfileurl }),
        });
      }
    };

    // Append script tag to body
    document.body.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Responsive container with 16:9 aspect ratio
  return (
      <div
        id="player"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
        }}
      ></div>
  );
}

export default PlayerPage;
