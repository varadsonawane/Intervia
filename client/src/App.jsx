import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import InterviewSetup from "./pages/InterviewSetup/InterviewSetup";
import LiveInterview from "./pages/LiveInterview/LiveInterview";
import PracticePrerequisite from "./components/Interview/PracticePrerequisite";


import AvatarTest from "./pages/AvatarTest/AvatarTest";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/avatar-test" element={<AvatarTest />} />
        <Route
          path="/interview/setup"
          element={<InterviewSetup />}
        />

        <Route
          path="/interview/prerequisite"
          element={<PracticePrerequisite />}
        />

        <Route
          path="/interview/live"
          element={<LiveInterview />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;