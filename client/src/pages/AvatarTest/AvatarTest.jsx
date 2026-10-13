import { useState } from "react";
import RealisticAvatar from "../../components/RealisticAvatar/RealisticAvatar";

function AvatarTest() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  return (
    <main className="min-h-screen bg-[#f5f3ff] p-6">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Intervia Avatar Test
      </h1>

      <div className="mx-auto h-[600px] max-w-3xl overflow-hidden rounded-2xl">
        <RealisticAvatar
          name="Alex"
          image="/avatars/alex.png"
          video="/avatars/alex-speaking.mp4"
          isSpeaking={isSpeaking}
        />
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setIsSpeaking(true)}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white"
        >
          Test Speaking
        </button>

        <button
          onClick={() => setIsSpeaking(false)}
          className="rounded-xl bg-gray-800 px-6 py-3 font-semibold text-white"
        >
          Test Listening
        </button>
      </div>
    </main>
  );
}

export default AvatarTest;