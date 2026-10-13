import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InterviewerCard from "./InterviewerCard";

const interviewers = [
  {
    id: "sarah",
    name: "Sarah",
    language: "English · Female interviewer",
    avatar: "/avatars/sarah.png",
  },
  {
    id: "alex",
    name: "Alex",
    language: "English · Male interviewer",
    avatar: "/avatars/alex.png",
  },
];

const rounds = [
  { id: "warmup", name: "Warm Up", description: "NON TECHNICAL" },
  { id: "coding", name: "Coding", description: "PROGRAMMING" },
  { id: "role", name: "Role Related", description: "TECHNICAL" },
  { id: "behavioral", name: "Behavioral", description: "HR" },
];

function InterviewDetails({ onClose }) {
  const navigate = useNavigate();

  const [jobRole, setJobRole] = useState("Software Engineer");
  const [resume, setResume] = useState(null);
  const [selectedRound, setSelectedRound] = useState("warmup");
  const [duration, setDuration] = useState(5);
  const [selectedInterviewer, setSelectedInterviewer] = useState("alex");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  function handleStartPractice() {
    if (!jobRole.trim()) {
      setError("Please enter a job role.");
      return;
    }

    if (!selectedRound || !selectedInterviewer) {
      setError("Please select an interview round and interviewer.");
      return;
    }

    if (!audioEnabled && !videoEnabled) {
      setError("Enable at least audio or video to continue.");
      return;
    }

    if (!agreed) {
      setError("Please accept the terms and conditions.");
      return;
    }

    const interviewConfig = {
      jobRole: jobRole.trim(),
      resumeName: resume?.name ?? null,
      round: selectedRound,
      duration,
      interviewer: selectedInterviewer,
      audioEnabled,
      videoEnabled,
    };

    sessionStorage.setItem(
      "interviewConfig",
      JSON.stringify(interviewConfig)
    );

    navigate("/interview/prerequisite");
    onClose?.();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-6">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="interview-details-title"
        className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <h2
            id="interview-details-title"
            className="text-xl font-bold text-gray-900"
          >
            Interview Details
          </h2>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close interview details"
              className="rounded-lg px-3 py-1 text-2xl text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              &times;
            </button>
          )}
        </header>

        {/* Scrollable form */}
        <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-7">
          {/* Job role */}
          <div>
            <label
              htmlFor="job-role"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Job Role
            </label>

            <input
              id="job-role"
              value={jobRole}
              onChange={(event) => setJobRole(event.target.value)}
              placeholder="e.g. Software Engineer"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-lg font-semibold text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {/* Resume upload */}
          <div className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">
                Resume Based Interview{" "}
                <span className="font-normal text-gray-500">
                  (Optional)
                </span>
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Get interview questions personalized to your resume.
              </p>

              {resume && (
                <p className="mt-2 break-all text-sm text-purple-700">
                  Selected: {resume.name}
                </p>
              )}
            </div>

            <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-purple-700">
              Upload Resume

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (file && file.size > 5 * 1024 * 1024) {
                    setError("Please choose a resume smaller than 5 MB.");
                    event.target.value = "";
                    return;
                  }

                  setError("");
                  setResume(file ?? null);
                }}
              />
            </label>
          </div>

          {/* Interview round */}
          <div>
            <h3 className="mb-3 font-semibold text-gray-800">
              Select Round <span className="text-red-500">*</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {rounds.map((round) => {
                const selected = selectedRound === round.id;

                return (
                  <button
                    key={round.id}
                    type="button"
                    onClick={() => setSelectedRound(round.id)}
                    aria-pressed={selected}
                    className={`rounded-xl border px-2 py-3 transition ${
                      selected
                        ? "border-purple-500 bg-purple-50 ring-2 ring-purple-100"
                        : "border-gray-300 bg-white hover:border-purple-300"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-gray-900">
                      {round.name}
                    </span>

                    <span className="mt-2 block text-[10px] font-bold text-gray-500">
                      {round.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Duration */}
          <div>
            <h3 className="mb-3 font-semibold text-gray-800">
              Interview Duration <span className="text-red-500">*</span>
            </h3>

            <div className="flex flex-wrap gap-3">
              {[5, 15, 30].map((minutes) => {
                const selected = duration === minutes;

                return (
                  <button
                    key={minutes}
                    type="button"
                    onClick={() => setDuration(minutes)}
                    aria-pressed={selected}
                    className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition ${
                      selected
                        ? "border-purple-500 bg-purple-100 text-purple-700"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-purple-300"
                    }`}
                  >
                    {minutes} mins
                    {minutes > 5 && (
                      <span className="ml-2" aria-label="Premium">
                        👑
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interviewer selection */}
          <div>
            <h3 className="mb-3 font-semibold text-gray-800">
              Select Your Interviewer{" "}
              <span className="text-red-500">*</span>
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {interviewers.map((interviewer) => (
                <InterviewerCard
                  key={interviewer.id}
                  {...interviewer}
                  selected={selectedInterviewer === interviewer.id}
                  onSelect={() =>
                    setSelectedInterviewer(interviewer.id)
                  }
                />
              ))}
            </div>
          </div>

          {/* Practice settings */}
          <div>
            <h3 className="mb-3 font-semibold text-gray-800">
              Practice Settings <span className="text-red-500">*</span>
            </h3>

            <div className="flex flex-wrap gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={audioEnabled}
                  onChange={(event) =>
                    setAudioEnabled(event.target.checked)
                  }
                  className="h-5 w-5 accent-purple-600"
                />
                Audio
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={videoEnabled}
                  onChange={(event) =>
                    setVideoEnabled(event.target.checked)
                  }
                  className="h-5 w-5 accent-purple-600"
                />
                Video
              </label>
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Camera and microphone permissions will be requested during setup.
            </p>
          </div>

          {/* Terms */}
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-purple-600"
            />

            <span className="text-sm text-gray-700">
              I agree with the{" "}
              <button
                type="button"
                onClick={() =>
                  window.alert("Terms and conditions will be added here.")
                }
                className="font-semibold text-purple-600 hover:underline"
              >
                terms and conditions
              </button>
              .
            </span>
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <footer className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-100"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={handleStartPractice}
            className="rounded-xl bg-purple-600 px-7 py-3 font-semibold text-white shadow-md transition hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-200"
          >
            Start Practice
          </button>
        </footer>
      </section>
    </div>
  );
}

export default InterviewDetails;