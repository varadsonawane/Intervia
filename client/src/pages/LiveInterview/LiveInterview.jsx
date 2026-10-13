import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVoiceAgent } from "../../hooks/useVoiceAgent";

const STATUS_LABELS = {
  disconnected: "Ready to begin",
  connecting: "Connecting...",
  connected: "Connected",
  ready: "Ready",
  listening: "Listening to you",
  muted: "Microphone muted",
  reconnecting: "Reconnecting...",
  error: "Connection error",
};

const INTERVIEWER_PROFILES = {
  payal: {
    name: "Payal",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=85",
  },
  emma: {
    name: "Emma",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=85",
  },
  jatin: {
    name: "Jatin",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=85",
  },
  john: {
    name: "John",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1400&q=85",
  },
  kapil: {
    name: "Kapil",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1400&q=85",
  },
};

const ROUND_LABELS = {
  warmup: "Warm Up",
  coding: "Coding Interview",
  role: "Role Related",
  behavioral: "Behavioral Interview",
};

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remaining
  ).padStart(2, "0")}`;
}

function LiveInterview() {
  const navigate = useNavigate();

  const [config] = useState(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("interviewConfig") || "{}"
      );
    } catch {
      return {};
    }
  });

  const {
    connect,
    disconnect,
    toggleMicrophone,
    status,
    transcript,
    error: voiceError,
    isSpeaking,
    interviewer,
  } = useVoiceAgent(
    config.jobRole || "Software Engineer",
    config.interviewer || "john",
    config.round || "warmup"
  );

  const videoRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const timerRef = useRef(null);
  const transcriptEndRef = useRef(null);

  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [deviceError, setDeviceError] = useState("");
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(
    "Your interview question will appear here."
  );

  const durationSeconds = (Number(config.duration) || 5) * 60;

  const remainingSeconds = Math.max(
    0,
    durationSeconds - elapsedSeconds
  );

  const isConnecting =
    status === "connecting" || status === "reconnecting";

  const isMicrophoneMuted = status === "muted";

  const canStart =
    status === "disconnected" || status === "error";

  const selectedInterviewer =
    INTERVIEWER_PROFILES[config.interviewer] ||
    INTERVIEWER_PROFILES.john;

  const interviewerName =
    interviewer?.name || selectedInterviewer.name;

  const interviewerImage = selectedInterviewer.image;

  const statusLabel = STATUS_LABELS[status] || status;

  // Display the latest AI question.
  useEffect(() => {
    const lastAssistantMessage = [...transcript]
      .reverse()
      .find(
        (message) =>
          message.role === "assistant" ||
          message.role === "agent"
      );

    if (lastAssistantMessage?.content) {
      setCurrentQuestion(lastAssistantMessage.content);
    }
  }, [transcript]);

  // Keep the latest transcript message visible.
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [transcript]);

  // Interview timer.
  useEffect(() => {
    if (!isInterviewActive) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsedSeconds((previous) =>
        Math.min(previous + 1, durationSeconds)
      );
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isInterviewActive, durationSeconds]);

  // Update active interview state.
  useEffect(() => {
    const activeStatuses = [
      "connected",
      "ready",
      "listening",
      "muted",
    ];

    if (activeStatuses.includes(status)) {
      setIsInterviewActive(true);
    }

    if (status === "disconnected" || status === "error") {
      setIsInterviewActive(false);
    }
  }, [status]);

  // Camera cleanup.
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);

      cameraStreamRef.current
        ?.getTracks()
        .forEach((track) => track.stop());
    };
  }, []);

  // Automatically end the interview when the timer expires.
  useEffect(() => {
    if (remainingSeconds === 0 && isInterviewActive) {
      disconnect();
      setIsInterviewActive(false);
    }
  }, [remainingSeconds, isInterviewActive, disconnect]);

  // Start camera.
  const startCamera = useCallback(async () => {
    try {
      setDeviceError("");

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Camera access is not supported by this browser."
        );
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      cameraStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraEnabled(true);
    } catch (error) {
      console.error("Camera access failed:", error);

      setDeviceError(
        error.message ||
          "Unable to access your camera. Check your browser permissions."
      );
    }
  }, []);

  // Toggle camera.
  const handleToggleCamera = useCallback(async () => {
    const videoTrack =
      cameraStreamRef.current?.getVideoTracks()[0];

    if (videoTrack) {
      const nextEnabled = !videoTrack.enabled;

      videoTrack.enabled = nextEnabled;
      setCameraEnabled(nextEnabled);

      return;
    }

    await startCamera();
  }, [startCamera]);

  // Start interview.
  const handleStartInterview = useCallback(async () => {
    if (!canStart || remainingSeconds === 0) {
      return;
    }

    setDeviceError("");
    setElapsedSeconds(0);

    await connect();
  }, [canStart, remainingSeconds, connect]);

  // End interview.
  const handleEndInterview = useCallback(() => {
    disconnect();

    clearInterval(timerRef.current);

    cameraStreamRef.current
      ?.getTracks()
      .forEach((track) => track.stop());

    cameraStreamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraEnabled(false);
    setIsInterviewActive(false);

    navigate("/");
  }, [disconnect, navigate]);

  // Repeat the latest question using the existing AI voice.
  const handleRepeatQuestion = useCallback(() => {
    if (!currentQuestion) return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(
        currentQuestion
      );

      utterance.lang = "en-US";
      utterance.rate = 0.95;

      window.speechSynthesis.speak(utterance);
    }
  }, [currentQuestion]);

  const latestUserMessage = [...transcript]
    .reverse()
    .find(
      (message) =>
        message.role === "user" ||
        message.role === "human"
    );

  return (
    <main className="min-h-screen bg-[#fbfaff] text-slate-900">
      <style>
        {`
          @keyframes speakingGlow {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.15);
            }
            50% {
              box-shadow: 0 0 0 10px rgba(139, 92, 246, 0.04);
            }
          }

          @keyframes audioWave {
            from { transform: scaleY(0.4); }
            to { transform: scaleY(1); }
          }

          .interviewer-speaking {
            animation: speakingGlow 1.5s ease-in-out infinite;
          }

          .audio-wave {
            transform-origin: center;
            animation: audioWave 450ms ease-in-out infinite alternate;
          }
        `}
      </style>

      {/* Header */}
      <header className="border-b border-violet-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-4 sm:px-7">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-2xl font-extrabold tracking-tight"
          >
            Inter<span className="text-violet-600">via</span>
          </button>

          <div className="hidden items-center gap-3 rounded-full bg-violet-50 px-4 py-2 sm:flex">
            <span
              className={`h-2 w-2 rounded-full ${
                isInterviewActive
                  ? "animate-pulse bg-emerald-500"
                  : "bg-gray-400"
              }`}
            />

            <span className="text-sm font-medium text-slate-600">
              {isInterviewActive
                ? "Interview in progress"
                : "Interview practice"}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 shadow-sm">
            <span className="text-violet-500">◷</span>

            <span className="font-mono text-lg font-bold">
              {formatTime(remainingSeconds)}
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-5 px-3 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_305px]">
        {/* Left side */}
        <section className="min-w-0 space-y-4">
          {/* Interviewer video panel */}
          <div
            className={`relative h-[360px] overflow-hidden rounded-2xl bg-slate-900 shadow-lg sm:h-[470px] lg:h-[525px] xl:h-[570px] ${
              isSpeaking ? "interviewer-speaking" : ""
            }`}
          >
            <img
              src={interviewerImage}
              alt={`${interviewerName}, AI interviewer`}
              className="absolute inset-0 h-full w-full object-cover object-center"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

            {/* Interviewer identity */}
            <div className="absolute left-4 top-4 flex items-center gap-3 rounded-full border border-white/20 bg-black/35 px-3 py-2 backdrop-blur-md sm:left-6 sm:top-6">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isSpeaking
                    ? "animate-pulse bg-violet-400"
                    : "bg-emerald-400"
                }`}
              />

              <div>
                <p className="text-sm font-semibold text-white">
                  {interviewerName}
                </p>

                <p className="text-[10px] text-white/70">
                  AI INTERVIEWER
                </p>
              </div>
            </div>

            {/* Timer badge */}
            <div className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 font-mono text-lg font-bold text-slate-900 shadow-lg sm:bottom-6 sm:left-6">
              {formatTime(remainingSeconds)}
            </div>

            {/* Speaking indicator */}
            {isSpeaking && (
              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
                {[12, 20, 15, 25, 14, 20, 11].map(
                  (height, index) => (
                    <span
                      key={index}
                      style={{
                        height: `${height}px`,
                        animationDelay: `${index * 70}ms`,
                      }}
                      className="audio-wave w-1 rounded-full bg-violet-300"
                    />
                  )
                )}

                <span className="ml-2 text-xs font-medium text-white">
                  Speaking
                </span>
              </div>
            )}

            {/* Start button */}
            {!isInterviewActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <button
                  type="button"
                  onClick={handleStartInterview}
                  disabled={!canStart || isConnecting}
                  className="rounded-xl bg-emerald-600 px-7 py-4 font-bold text-white shadow-xl transition hover:bg-emerald-500 disabled:opacity-50"
                >
                  {isConnecting
                    ? "Connecting..."
                    : status === "error"
                      ? "Try Again"
                      : "🎙 Start Interview"}
                </button>
              </div>
            )}
          </div>

          {/* Current question */}
          <section className="relative rounded-xl border border-violet-200 bg-white px-5 py-7 shadow-sm sm:px-7">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-violet-600">
                Interview question
              </span>

              <button
                type="button"
                onClick={handleRepeatQuestion}
                disabled={!transcript.length}
                className="rounded-full bg-violet-50 px-4 py-2 text-sm font-medium text-violet-600 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                🔊 Repeat Question
              </button>
            </div>

            <p className="text-center text-lg font-semibold leading-8 text-slate-900 sm:text-xl">
              {currentQuestion}
            </p>

            {latestUserMessage && (
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Your latest answer
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {latestUserMessage.content}
                </p>
              </div>
            )}
          </section>

          {/* Controls */}
          <section className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-violet-100 bg-white p-4 shadow-sm">
            <button
              type="button"
              onClick={toggleMicrophone}
              disabled={
                config.audioEnabled === false ||
                ![
                  "connected",
                  "ready",
                  "listening",
                  "muted",
                ].includes(status)
              }
              className={`rounded-xl border px-5 py-3 text-sm font-semibold transition disabled:opacity-40 ${
                isMicrophoneMuted
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {isMicrophoneMuted ? "🔇 Unmute" : "🎙 Mute"}
            </button>

            <button
              type="button"
              onClick={handleToggleCamera}
              disabled={config.videoEnabled === false}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
            >
              {cameraEnabled ? "📷 Camera Off" : "📹 Camera On"}
            </button>

            <button
              type="button"
              onClick={() => setShowTranscript((value) => !value)}
              className="rounded-xl border border-violet-200 bg-violet-50 px-5 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
            >
              {showTranscript ? "Hide Transcript" : "Show Transcript"}
            </button>

            {isInterviewActive && (
              <button
                type="button"
                onClick={handleEndInterview}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                End Interview
              </button>
            )}
          </section>

          {/* Errors */}
          {(deviceError || voiceError) && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {deviceError || voiceError}
            </div>
          )}

          {/* Transcript */}
          {showTranscript && (
            <section className="rounded-xl border border-violet-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Interview Transcript
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Your conversation with {interviewerName}
                  </p>
                </div>

                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                  {transcript.length} messages
                </span>
              </div>

              <div className="mt-4 max-h-[400px] space-y-3 overflow-y-auto">
                {transcript.length === 0 ? (
                  <p className="py-8 text-center text-sm text-slate-400">
                    Your interview transcript will appear here.
                  </p>
                ) : (
                  transcript.map((message, index) => {
                    const isUser =
                      message.role === "user" ||
                      message.role === "human";

                    return (
                      <div
                        key={message.id || index}
                        className={`rounded-xl p-4 ${
                          isUser
                            ? "ml-4 bg-violet-50"
                            : "mr-4 bg-slate-50"
                        }`}
                      >
                        <p
                          className={`mb-2 text-xs font-bold uppercase tracking-wide ${
                            isUser
                              ? "text-violet-600"
                              : "text-emerald-700"
                          }`}
                        >
                          {isUser ? "You" : interviewerName}
                        </p>

                        <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                          {message.content}
                        </p>
                      </div>
                    );
                  })
                )}

                <div ref={transcriptEndRef} />
              </div>
            </section>
          )}
        </section>

        {/* Right sidebar */}
        <aside className="space-y-4">
          {/* Candidate camera */}
          <section className="overflow-hidden rounded-xl border border-violet-100 bg-white shadow-sm">
            <div className="relative flex h-[180px] items-center justify-center bg-slate-900 sm:h-[220px]">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={`h-full w-full object-cover ${
                  cameraEnabled ? "block" : "hidden"
                }`}
              />

              {!cameraEnabled && (
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl">
                    👤
                  </div>

                  <p className="mt-3 text-sm text-white/80">
                    Camera is off
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleToggleCamera}
                disabled={config.videoEnabled === false}
                aria-label={
                  cameraEnabled ? "Turn camera off" : "Turn camera on"
                }
                className="absolute right-3 top-3 rounded-full bg-white p-2 text-slate-900 shadow-md transition hover:bg-violet-100 disabled:opacity-40"
              >
                ⚙
              </button>

              <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
                You
              </span>
            </div>
          </section>

          {/* Interview details */}
          <section className="rounded-xl border border-violet-100 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-violet-600">
              {config.jobRole || "Software Engineer"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {ROUND_LABELS[config.round] || "Warm Up"}
            </p>

            <div className="my-5 h-px bg-slate-100" />

            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-violet-500">
                Interviewer
              </span>

              <span className="text-sm font-semibold text-slate-700">
                {interviewerName}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-violet-500">
                Status
              </span>

              <span className="text-sm text-slate-600">
                {statusLabel}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() =>
                  window.alert(
                    "Evaluation criteria will be available when interview evaluation is implemented."
                  )
                }
                className="text-xs font-medium text-violet-600 hover:text-violet-800"
              >
                ⓘ Evaluation Criteria
              </button>

              <button
                type="button"
                onClick={handleEndInterview}
                className="text-sm font-medium text-red-500 hover:text-red-700"
              >
                ⇥ Exit
              </button>
            </div>
          </section>

          {/* Interview progress */}
          <section className="rounded-xl border border-violet-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900">
                Session Progress
              </h2>

              <span className="text-sm font-semibold text-violet-600">
                {Math.min(
                  100,
                  Math.round(
                    (elapsedSeconds / durationSeconds) * 100
                  )
                )}
                %
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-400 transition-all duration-500"
                style={{
                  width: `${
                    Math.min(
                      100,
                      (elapsedSeconds / durationSeconds) * 100
                    )
                  }%`,
                }}
              />
            </div>

            <div className="mt-3 flex justify-between text-xs text-slate-400">
              <span>{formatTime(elapsedSeconds)} elapsed</span>

              <span>{formatTime(remainingSeconds)} remaining</span>
            </div>
          </section>

          {/* Interview tip */}
          <section className="rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5">
            <h2 className="font-bold text-violet-700">
              Interview Tip
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Take a moment to understand the question. Structure your
              response clearly and support your answer with examples.
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default LiveInterview;