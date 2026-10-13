import { useEffect, useRef } from "react";

function RealisticAvatar({
  name = "Alex",
  image = "/avatars/alex.png",
  video = "/avatars/alex-speaking.mp4",
  isSpeaking = false,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    if (isSpeaking) {
      // Show and play the speaking animation immediately.
      videoElement.play().catch((error) => {
        console.error("Avatar video playback failed:", error);
      });
    } else {
      // Return to the static portrait when audio playback ends.
      videoElement.pause();
      videoElement.currentTime = 0;
    }

    return () => {
      videoElement.pause();
    };
  }, [isSpeaking, video]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#e9e4dc]">
      {/* Static portrait */}
      <img
        src={image}
        alt={`${name}, AI interviewer`}
        className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-200 ${
          isSpeaking ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Speaking animation */}
      <video
        ref={videoRef}
        src={video}
        muted
        playsInline
        loop
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-200 ${
          isSpeaking ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Interviewer information */}
      <div className="absolute left-4 top-4 rounded-xl bg-black/65 px-4 py-3 text-white backdrop-blur-sm">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm text-white/75">AI Interviewer</p>
      </div>

      {/* Speaking status */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-sm font-medium text-white ${
          isSpeaking ? "bg-indigo-600" : "bg-black/60"
        }`}
      >
        {isSpeaking ? "Speaking..." : "Listening"}
      </div>
    </div>
  );
}

export default RealisticAvatar;