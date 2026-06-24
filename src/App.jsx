// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Sidebar from "./Sidebar";
// import CurserAnimate from "./CurserAnimation";

// import TasksDashboard from "./pages/TasksDashboard";
// import MySubmissions from "./pages/MySubmissions";
// import SubmissionDetails from "./pages/SubmissionDetails";
// import { useState } from "react";
// import Profile from "./pages/Profile";

// function App() {
//   const [submissions, setSubmissions] = useState([]);
//   const [student, setStudent] = useState({
//   id: "1",
//   name: "Student Name",
//   photo: "",
//   bio: "Passionate about building web applications.",
//   tagline: "Aspiring Full Stack Developer",

//   github: "https://github.com/username",
//   linkedin: "https://linkedin.com/in/username",

//   track: "Full Stack Development",
//   batch: "Batch 5",

//   overallScore: 91,
// });
//   return (

//     <Router>
//       <Sidebar />

//       <Routes>
//         <Route path="/" element={<CurserAnimate />} />

//         <Route
//   path="/tasks"
//   element={
//     <TasksDashboard
//       submissions={submissions}
//       setSubmissions={setSubmissions}
//     />
//   }
// />

//         <Route
//   path="/submissions"
//   element={
//     <MySubmissions
//       submissions={submissions}
//     />
//   }
// />
//         <Route
//   path="/submissions/:id"
//   element={<SubmissionDetails />}
// />

//         <Route
//   path="/profile"
//   element={
//     <Profile
//       student={student}
//       submissions={submissions}
//     />
//   }
// />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
import Sidebar from "./Sidebar";
import CurserAnimate from "./CurserAnimation";
 
import TasksDashboard from "./pages/TasksDashboard";
import MySubmissions from "./pages/MySubmissions";
import SubmissionDetails from "./pages/SubmissionDetails";
import Dashboard from "./pages/Dashboard";
import Scores from "./pages/Scores";
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
          path="/dashboard"
          element={
            <Dashboard
              student={student}
              submissions={submissions}
            />
          }
        />
 
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
 
        {/* FIX: submissions now passed correctly to SubmissionDetails */}
        <Route
          path="/submissions/:id"
          element={
            <SubmissionDetails
              submissions={submissions}
            />
          }
        />
 
        <Route
          path="/scores"
          element={
            <Scores
              submissions={submissions}
              student={student}
            />
          }
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