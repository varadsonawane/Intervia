import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVoiceAgent } from "../../hooks/useVoiceAgent";

const STATUS_LABELS = {
  disconnected: "Ready to begin",
  connecting: "Connecting to interviewer...",
  connected: "Connected",
  ready: "Preparing interview...",
  listening: "Listening to you",
  muted: "Microphone muted",
  reconnecting: "Reconnecting...",
  error: "Connection error",
};

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remaining
  ).padStart(2, "0")}`;
}

function TalkingAvatar({ name, isSpeaking, status }) {
  const initials = name?.charAt(0)?.toUpperCase() || "I";

  const isListening = status === "listening";
  const isConnecting =
    status === "connecting" || status === "reconnecting";

  return (
    <div className="relative flex flex-col items-center">
      {/* Ambient glow */}
      <div
        className={`absolute inset-0 m-auto h-64 w-64 rounded-full bg-violet-600/20 blur-3xl transition-all duration-500 sm:h-80 sm:w-80 ${
          isSpeaking ? "scale-125 opacity-100" : "scale-90 opacity-50"
        }`}
      />

      {/* Avatar container */}
      <div
        className={`relative flex h-52 w-52 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-violet-400 via-purple-700 to-indigo-950 shadow-2xl transition-all duration-500 sm:h-64 sm:w-64 ${
          isSpeaking
            ? "shadow-purple-500/30 ring-4 ring-purple-400/20"
            : "shadow-black/30"
        }`}
      >
        {/* Head */}
        <div
          className={`relative h-40 w-32 rounded-[48%] bg-gradient-to-b from-amber-100 to-amber-200 shadow-inner transition-transform duration-300 sm:h-48 sm:w-36 ${
            isSpeaking ? "animate-[headTalk_1.8s_ease-in-out_infinite]" : ""
          }`}
        >
          {/* Hair */}
          <div className="absolute -top-2 left-0 h-14 w-full rounded-t-[65%] rounded-b-[35%] bg-[#292036]" />

          {/* Side hair */}
          <div className="absolute -left-1 top-7 h-24 w-7 rounded-full bg-[#292036]" />
          <div className="absolute -right-1 top-7 h-24 w-7 rounded-full bg-[#292036]" />

          {/* Eyes */}
          <div className="absolute left-6 top-[55px] flex gap-7 sm:left-7 sm:top-[65px]">
            <span className="h-2.5 w-3 rounded-full bg-[#302238]" />
            <span className="h-2.5 w-3 rounded-full bg-[#302238]" />
          </div>

          {/* Nose */}
          <div className="absolute left-1/2 top-[65px] h-5 w-3 -translate-x-1/2 rounded-full border-b-2 border-amber-300/80 sm:top-[76px]" />

          {/* Mouth */}
          <div className="absolute left-1/2 top-[92px] flex -translate-x-1/2 items-center justify-center sm:top-[108px]">
            <div
              className={`w-8 rounded-[50%] border border-rose-950/30 bg-rose-700 transition-all duration-100 ${
                isSpeaking
                  ? "h-5 animate-[mouthTalk_180ms_ease-in-out_infinite_alternate]"
                  : "h-1.5 rounded-b-full"
              }`}
            >
              {isSpeaking && (
                <div className="absolute left-1/2 top-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-rose-200/80" />
              )}
            </div>
          </div>

          {/* Neck */}
          <div className="absolute -bottom-5 left-1/2 -z-10 h-10 w-12 -translate-x-1/2 rounded-b-xl bg-amber-200" />

          {/* Clothing */}
          <div className="absolute -bottom-7 left-1/2 -z-20 h-12 w-40 -translate-x-1/2 rounded-t-[60%] bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 sm:h-16 sm:w-48" />
        </div>

        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-purple-300/30 bg-[#171323] px-3 py-1.5 shadow-lg">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-200">
              Speaking
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <div className="relative mt-9 text-center">
        <p className="text-2xl font-bold tracking-tight text-white">
          {name || "AI Interviewer"}
        </p>

        <p className="mt-1 text-sm text-gray-400">
          {isSpeaking
            ? "Your interviewer is speaking"
            : isListening
              ? "Listening to your answer"
              : isConnecting
                ? "Getting everything ready"
                : "AI Interview Coach"}
        </p>
      </div>

      {/* Audio waveform */}
      <div
        className="mt-5 flex h-10 items-center justify-center gap-1.5"
        aria-label={isSpeaking ? "Interviewer speaking" : "Interviewer idle"}
      >
        {[12, 22, 30, 18, 36, 24, 14, 28, 18, 32, 12].map(
          (height, index) => (
            <span
              key={index}
              style={{
                height: `${height}px`,
                animationDelay: `${index * 70}ms`,
              }}
              className={`w-1 rounded-full ${
                isSpeaking
                  ? "animate-[waveform_500ms_ease-in-out_infinite_alternate] bg-purple-400"
                  : "bg-purple-400/30"
              }`}
            />
          )
        )}
      </div>

      <span className="sr-only">
        {isConnecting ? "Connecting" : initials}
      </span>
    </div>
  );
}

function LiveInterview() {
  const navigate = useNavigate();

  // Load the saved setup.
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

  const statusLabel = STATUS_LABELS[status] || status;

  // Timer.
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

  // Update active state.
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

  // Keep the newest transcript visible.
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [transcript]);

  // Camera cleanup.
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);

      cameraStreamRef.current
        ?.getTracks()
        .forEach((track) => track.stop());
    };
  }, []);

  // End when the timer expires.
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
          "Unable to access your camera. Check browser permissions."
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

  // End interview and return home.
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

  const handleBack = useCallback(() => {
    if (isInterviewActive) {
      const confirmed = window.confirm(
        "Your interview is active. Are you sure you want to leave?"
      );

      if (!confirmed) {
        return;
      }

      disconnect();
    }

    navigate("/");
  }, [isInterviewActive, disconnect, navigate]);

  const displayRound = {
    warmup: "Warm Up",
    coding: "Coding",
    role: "Role Related",
    behavioral: "Behavioral",
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080811] text-white">
      {/* Custom animation definitions */}
      <style>
        {`
          @keyframes mouthTalk {
            0% { height: 4px; transform: scaleX(0.85); }
            100% { height: 20px; transform: scaleX(1); }
          }

          @keyframes headTalk {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-2px) rotate(0.5deg); }
          }

          @keyframes waveform {
            from { transform: scaleY(0.4); opacity: 0.55; }
            to { transform: scaleY(1); opacity: 1; }
          }

          * {
            scrollbar-width: thin;
            scrollbar-color: #51416f #11111c;
          }
        `}
      </style>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#080811]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-7">
          <button
            type="button"
            onClick={handleBack}
            className="text-xl font-extrabold tracking-tight sm:text-2xl"
          >
            Inter<span className="text-violet-400">via</span>
          </button>

          <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 sm:flex">
            <span
              className={`h-2 w-2 rounded-full ${
                isInterviewActive
                  ? "animate-pulse bg-emerald-400"
                  : "bg-gray-500"
              }`}
            />

            <span className="max-w-48 truncate text-sm text-gray-300">
              {config.jobRole || "Software Engineer"}
            </span>

            <span className="h-4 w-px bg-white/10" />

            <span className="text-xs text-gray-500">
              {displayRound[config.round] || "Warm Up"}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 sm:px-4">
            <span className="text-xs text-gray-500">TIME</span>
            <span className="font-mono text-lg font-semibold tabular-nums sm:text-xl">
              {formatTime(remainingSeconds)}
            </span>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="mx-auto grid max-w-[1600px] gap-5 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_370px]">
        {/* Main interview area */}
        <section className="min-w-0 space-y-5">
          {/* AI interviewer */}
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-gradient-to-br from-[#18112b] via-[#100e1b] to-[#0d0d15]">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-violet-700/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />

            {/* Panel header */}
            <div className="relative flex items-center justify-between border-b border-white/[0.06] px-5 py-4 sm:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">
                  Live interview
                </p>

                <h1 className="mt-1 text-lg font-bold sm:text-xl">
                  Meet your interviewer
                </h1>
              </div>

              <div
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium ${
                  isSpeaking
                    ? "border-violet-400/30 bg-violet-400/10 text-violet-200"
                    : status === "listening"
                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                      : "border-white/10 bg-white/[0.04] text-gray-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isSpeaking
                      ? "animate-pulse bg-violet-400"
                      : status === "listening"
                        ? "bg-emerald-400"
                        : "bg-gray-500"
                  }`}
                />

                {isSpeaking
                  ? "Speaking"
                  : status === "listening"
                    ? "Listening"
                    : isConnecting
                      ? "Connecting"
                      : "Standby"}
              </div>
            </div>

            {/* Avatar stage */}
            <div className="relative flex min-h-[480px] items-center justify-center overflow-hidden px-4 py-10 sm:min-h-[560px] sm:py-12">
              {/* Decorative grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
                  backgroundSize: "38px 38px",
                }}
              />

              <TalkingAvatar
                name={interviewer.name}
                isSpeaking={isSpeaking}
                status={status}
              />
            </div>

            {/* Current status */}
            <div className="relative border-t border-white/[0.06] px-5 py-4 sm:px-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-200">
                    {STATUS_LABELS[status] || status}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {isSpeaking
                      ? `${interviewer.name} is asking a question.`
                      : status === "listening"
                        ? "Your turn. Speak naturally."
                        : "Start the interview when you are ready."}
                  </p>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-gray-400">
                  <span className="text-base">✦</span>
                  AI powered interviewer
                </span>
              </div>
            </div>
          </div>

          {/* Candidate camera */}
          <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#11111b]">
            <div className="flex items-center justify-between gap-3 px-5 py-4">
              <div>
                <h2 className="font-semibold">Your camera</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Your video preview
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1.5 text-xs ${
                  cameraEnabled
                    ? "bg-emerald-400/10 text-emerald-300"
                    : "bg-white/[0.05] text-gray-400"
                }`}
              >
                {cameraEnabled ? "Camera on" : "Camera off"}
              </span>
            </div>

            <div className="relative flex min-h-[230px] items-center justify-center bg-black sm:min-h-[300px]">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={`max-h-[420px] w-full object-cover ${
                  cameraEnabled ? "block" : "hidden"
                }`}
              />

              {!cameraEnabled && (
                <div className="px-5 py-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-2xl">
                    👤
                  </div>

                  <p className="mt-4 font-medium text-gray-300">
                    Your camera is off
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Enable your camera for video interview practice.
                  </p>
                </div>
              )}

              {cameraEnabled && (
                <span className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-xs">
                  You
                </span>
              )}
            </div>
          </section>

          {/* Device and voice errors */}
          {deviceError && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
            >
              {deviceError}
            </div>
          )}

          {voiceError && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/20 bg-red-500/10 p-4"
            >
              <p className="font-semibold text-red-300">
                Voice connection error
              </p>

              <p className="mt-2 break-words text-sm text-red-200/80">
                {voiceError}
              </p>
            </div>
          )}

          {/* Controls */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#11111b] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Microphone */}
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
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                  isMicrophoneMuted
                    ? "border-red-400/20 bg-red-400/10 text-red-300"
                    : "border-white/10 bg-white/[0.04] text-gray-200 hover:bg-white/[0.08]"
                }`}
              >
                <span>{isMicrophoneMuted ? "🔇" : "🎙️"}</span>
                {isMicrophoneMuted ? "Unmute" : "Mute"}
              </button>

              {/* Camera */}
              <button
                type="button"
                onClick={handleToggleCamera}
                disabled={config.videoEnabled === false}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>{cameraEnabled ? "📷" : "📹"}</span>
                {cameraEnabled ? "Camera off" : "Camera on"}
              </button>

              {/* Start / End */}
              {!isInterviewActive ? (
                <button
                  type="button"
                  onClick={handleStartInterview}
                  disabled={
                    !canStart ||
                    isConnecting ||
                    remainingSeconds === 0 ||
                    config.audioEnabled === false
                  }
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isConnecting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Connecting...
                    </>
                  ) : status === "error" ? (
                    "Try again"
                  ) : (
                    "▶ Start interview"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleEndInterview}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-500/15 px-6 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/25"
                >
                  ■ End interview
                </button>
              )}
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-gray-500">
              {isSpeaking
                ? "Listen carefully to your interviewer's question."
                : status === "listening"
                  ? "Take your time and answer clearly."
                  : "Your interview controls will be available when you start."}
            </p>
          </section>

          {remainingSeconds === 0 && (
            <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-center text-sm text-amber-200">
              Your configured interview duration has ended.
            </div>
          )}
        </section>

        {/* Sidebar */}
        <aside className="min-w-0 space-y-5">
          {/* Interview details */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#11111b] p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Interview details</h2>

              <span className="rounded-lg bg-violet-500/10 px-2.5 py-1.5 text-xs font-semibold text-violet-300">
                LIVE
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-xs text-gray-500">Job role</p>
                <p className="mt-1 font-semibold text-gray-100">
                  {config.jobRole || "Software Engineer"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                  <p className="text-xs text-gray-500">Interview round</p>
                  <p className="mt-1 text-sm font-semibold">
                    {displayRound[config.round] || "Warm Up"}
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="mt-1 text-sm font-semibold">
                    {config.duration || 5} minutes
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-xs text-gray-500">Your interviewer</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-700 font-bold">
                    {interviewer.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold">{interviewer.name}</p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      AI Interview Coach
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <div>
                  <p className="text-xs text-gray-500">Connection</p>
                  <p className="mt-1 text-sm font-semibold">
                    {statusLabel}
                  </p>
                </div>

                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    status === "error"
                      ? "bg-red-400"
                      : isInterviewActive
                        ? "bg-emerald-400"
                        : "bg-gray-500"
                  }`}
                />
              </div>
            </div>
          </section>

          {/* Conversation */}
          <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#11111b]">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
              <div>
                <h2 className="font-bold">Conversation</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Your live transcript
                </p>
              </div>

              <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-xs font-semibold text-violet-300">
                {transcript.length}
              </span>
            </div>

            <div
              aria-live="polite"
              className="flex max-h-[480px] min-h-[260px] flex-col gap-3 overflow-y-auto p-4"
            >
              {transcript.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-2xl">
                    💬
                  </div>

                  <p className="mt-4 text-sm font-medium text-gray-300">
                    Your conversation starts here
                  </p>

                  <p className="mt-2 max-w-[240px] text-xs leading-5 text-gray-500">
                    Once the interview starts, your questions and answers will appear here.
                  </p>
                </div>
              ) : (
                transcript.map((message, index) => {
                  const isUser =
                    message.role === "user" ||
                    message.role === "human";

                  return (
                    <div
                      key={message.id || index}
                      className={`rounded-xl border p-3 ${
                        isUser
                          ? "border-violet-500/15 bg-violet-500/[0.08]"
                          : "border-white/[0.06] bg-white/[0.025]"
                      }`}
                    >
                      <p
                        className={`mb-2 text-[10px] font-bold uppercase tracking-[0.16em] ${
                          isUser
                            ? "text-violet-300"
                            : "text-emerald-300"
                        }`}
                      >
                        {isUser ? "You" : interviewer.name}
                      </p>

                      <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-300">
                        {message.content}
                      </p>
                    </div>
                  );
                })
              )}

              <div ref={transcriptEndRef} />
            </div>
          </section>

          {/* Interview tip */}
          <section className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-500/[0.10] to-indigo-500/[0.04] p-5">
            <div className="flex items-center gap-2">
              <span className="text-lg">✦</span>
              <h2 className="font-semibold text-violet-200">
                Interview tip
              </h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Structure your answers clearly. Explain your reasoning,
              give practical examples, and ask for clarification when
              you need it.
            </p>
          </section>

          {/* Privacy note */}
          <p className="px-2 text-center text-xs leading-5 text-gray-600">
            Your camera preview is displayed locally in this interface.
            This page does not send your camera video to the voice agent.
          </p>
        </aside>
      </div>
    </main>
  );
}

export default LiveInterview;