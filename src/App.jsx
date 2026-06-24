import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./Sidebar";
import CurserAnimate from "./CurserAnimation";

import TasksDashboard from "./pages/TasksDashboard";
import MySubmissions from "./pages/MySubmissions";
import SubmissionDetails from "./pages/SubmissionDetails";
import { useState } from "react";
import Profile from "./pages/Profile";

function App() {
  const [submissions, setSubmissions] = useState([]);
  const [student, setStudent] = useState({
  id: "1",
  name: "Student Name",
  photo: "",
  bio: "Passionate about building web applications.",
  tagline: "Aspiring Full Stack Developer",

  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/username",

  track: "Full Stack Development",
  batch: "Batch 5",

  overallScore: 91,
});
  return (

    <Router>
      <Sidebar />

      <Routes>
        <Route path="/" element={<CurserAnimate />} />

        <Route
  path="/tasks"
  element={
    <TasksDashboard
      submissions={submissions}
      setSubmissions={setSubmissions}
    />
  }
/>

        <Route
  path="/submissions"
  element={
    <MySubmissions
      submissions={submissions}
    />
  }
/>
        <Route
  path="/submissions/:id"
  element={<SubmissionDetails />}
/>

        <Route
  path="/profile"
  element={
    <Profile
      student={student}
      submissions={submissions}
    />
  }
/>
      </Routes>
    </Router>
  );
}

export default App;
// import Patients from './PatientsDashboard';
// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import CurserAnimate from './CurserAnimation';
// import Sidebar from './Sidebar';
// function App() {

//   return (
//     <>
//       <Router>
//         <Sidebar />
//         <Routes>
//           <Route path="/" element={<CurserAnimate />} />
//           <Route path="/patients" element={<Patients />} />
//         </Routes>
//       </Router>
//     </>
//   )
// }

// export default App
