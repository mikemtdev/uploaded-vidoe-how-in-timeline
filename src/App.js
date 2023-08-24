import "./styles.css";
import React from "react";

export default function App() {
  const inputRef = React.useRef();
  const durRef = React.useRef();
  const vidoeRef = React.useRef();
  const [duration, setDuration] = React.useState();

  const reader = new FileReader();
  const handleChange = async (e) => {
    const file = inputRef.current?.files[0];

    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      let buffer = e.target.result;

      let videoBlob = new Blob([new Uint8Array(buffer)], { type: file.type });

      let url = window.URL.createObjectURL(videoBlob);

      // console.log(url);
      vidoeRef.current.src = url;
    };
    vidoeRef.current.onloadedmetadata = (e) => {
      // window.URL.revokeObjectURL(vidoeRef.current.src);
      setDuration(vidoeRef.current.duration / 60 + "");
      console.log("duration", duration);
    };

    // console.log(duration);
    vidoeRef.current.type = file.type;
  };

  let playbacktime = 0;
  if (vidoeRef.current !== undefined) {
    const video = vidoeRef.current;
    video.addEventListener("timeupdate", function (e) {
      playbacktime = vidoeRef.current.currentTime;
      const playbacktimeID = document.getElementById("playbacktime");
      const playbackTrackerId = document.getElementById("playbackTracker");
      playbackTrackerId.style.left = vidoeRef.current.currentTime / 61.2 + "%";
      playbackTrackerId.style["margin-left"] = "5px";
      playbackTrackerId.style["margin-right"] = "-5px";
      playbacktimeID.innerText = duration - vidoeRef.current.currentTime / 60;
    });
  }

  // console.log(inputRef.current?.files[0]);

  // console.log((vidoeRef.current?.currenTime = (e) => e()));

  return (
    <div className="App">
      <div>
        <input ref={inputRef} type="file" onChange={handleChange} />
        <p>Duration: {Math.round(duration * 100) / 100} </p>
        <video
          width="320"
          height="240"
          ref={vidoeRef}
          controls
          type="video/mp4"
        ></video>
        <p id="playbacktime">time: {playbacktime}</p>
      </div>

      <div
        style={{
          borderWidth: "1px",
          boderColor: "#000000",
          padding: "5px",
          overflow: "scroll",
          backgroundColor: "lightgray",
          width: "95vw",
          position: "relative"
        }}
      >
        <div
          id="playbackTracker"
          style={{
            width: "3px",
            height: "40px",
            position: "absolute",
            top: 0,
            left: "5px",
            backgroundColor: "green"
          }}
        ></div>
        <div
          style={{
            width: duration + "%",
            height: "40px",
            backgroundColor: "red"
          }}
        >
          {Math.round(duration * 100) / 100}m
        </div>
      </div>
    </div>
  );
}
