import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PracticePrerequisite() {
  const navigate = useNavigate();

  const [cameraStatus, setCameraStatus] = useState("checking");
  const [microphoneStatus, setMicrophoneStatus] = useState("checking");
  const [cameraError, setCameraError] = useState("");
  const [microphoneError, setMicrophoneError] = useState("");

  const [config] = useState(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("interviewConfig") || "{}"
      );
    } catch {
      return {};
    }
  });

  useEffect(() => {
    let stream;

    async function checkDevices() {
      if (!config.audioEnabled && !config.videoEnabled) {
        setCameraStatus("disabled");
        setMicrophoneStatus("disabled");
        return;
      }

      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error(
            "Camera and microphone access are not supported in this browser."
          );
        }

        const constraints = {
          audio: Boolean(config.audioEnabled),
          video: Boolean(config.videoEnabled),
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);

        setCameraStatus(config.videoEnabled ? "ready" : "disabled");
        setMicrophoneStatus(config.audioEnabled ? "ready" : "disabled");
      } catch (error) {
        const message =
          error.name === "NotAllowedError"
            ? "Permission denied. Allow camera and microphone access in your browser."
            : error.name === "NotFoundError"
              ? "The requested camera or microphone could not be found."
              : error.message || "Unable to access your devices.";

        if (config.videoEnabled) {
          setCameraStatus("error");
          setCameraError(message);
        } else {
          setCameraStatus("disabled");
        }

        if (config.audioEnabled) {
          setMicrophoneStatus("error");
          setMicrophoneError(message);
        } else {
          setMicrophoneStatus("disabled");
        }
      }
    }

    checkDevices();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [config]);

  function getStatusText(status) {
    const labels = {
      checking: "Checking...",
      ready: "Ready",
      disabled: "Disabled",
      error: "Action required",
    };

    return labels[status] || "Unknown";
  }

  function getStatusStyle(status) {
    if (status === "ready") {
      return "bg-green-100 text-green-700";
    }

    if (status === "error") {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-600";
  }

  const devicesReady =
    (!config.videoEnabled || cameraStatus === "ready") &&
    (!config.audioEnabled || microphoneStatus === "ready");

  const hasConfig = Boolean(config.jobRole && config.round);

  return (
    <main className="min-h-screen bg-[#f5f3ff] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate("/interview/setup")}
          className="mb-6 text-sm font-semibold text-purple-700 hover:text-purple-900"
        >
          ← Back to interview details
        </button>

        <section className="rounded-3xl border border-purple-100 bg-white p-6 shadow-xl sm:p-9">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-3xl">
              🎙️
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Get Ready for Your Interview
            </h1>

            <p className="mt-3 text-gray-500">
              Let's make sure everything is ready before we begin.
            </p>
          </div>

          {!hasConfig && (
            <div className="mb-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
              No interview configuration was found. Please return to
              interview details and configure your practice session.
            </div>
          )}

          <div className="mb-8 rounded-2xl bg-purple-50 p-5">
            <h2 className="mb-3 font-bold text-gray-900">
              Your Interview
            </h2>

            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <p>
                <span className="text-gray-500">Job role:</span>{" "}
                <strong>{config.jobRole || "Not selected"}</strong>
              </p>

              <p>
                <span className="text-gray-500">Duration:</span>{" "}
                <strong>
                  {config.duration ? `${config.duration} minutes` : "Not selected"}
                </strong>
              </p>

              <p>
                <span className="text-gray-500">Round:</span>{" "}
                <strong>{config.round || "Not selected"}</strong>
              </p>

              <p>
                <span className="text-gray-500">Interviewer:</span>{" "}
                <strong>{config.interviewer || "Not selected"}</strong>
              </p>
            </div>
          </div>

          <h2 className="mb-4 text-lg font-bold text-gray-900">
            Device Checks
          </h2>

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 p-4">
              <div>
                <h3 className="font-semibold text-gray-800">
                  Camera Access
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {cameraError ||
                    (config.videoEnabled
                      ? "Checking whether your camera is available."
                      : "Video is disabled for this interview.")}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(cameraStatus)}`}
              >
                {getStatusText(cameraStatus)}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 p-4">
              <div>
                <h3 className="font-semibold text-gray-800">
                  Microphone Access
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {microphoneError ||
                    (config.audioEnabled
                      ? "Checking whether your microphone is available."
                      : "Audio is disabled for this interview.")}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(microphoneStatus)}`}
              >
                {getStatusText(microphoneStatus)}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
            <strong className="text-gray-900">Before you start</strong>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Find a quiet place with a stable internet connection.</li>
              <li>Speak clearly and answer questions as you would in a real interview.</li>
              <li>Keep your microphone enabled during the interview.</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/interview/setup")}
              className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Change Settings
            </button>

            <button
              type="button"
              disabled={!hasConfig || !devicesReady}
              onClick={() => navigate("/interview/live")}
              className="flex-1 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Continue to Interview →
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PracticePrerequisite;