import React, { useState } from "react";
import SubmissionForm from "../components/SubmissionForm.jsx";
import TaskCard from "../components/TaskCard.jsx";

export default function TasksDashboard({
  submissions,
  setSubmissions,
}) {
    const [tasks] = useState([
    {
    id: "1",
    title: "React Dashboard",
    description: "Build a dashboard using React.",
    type: "HW",
    skills: [
      "Code Quality",
      "Problem Solving",
    ],
  },
    {
      id: "2",
      title: "Laravel Authentication",
      description: "Implement authentication using Laravel and Sanctum.",
      type: "HW",
      skills: [
        "PHP",
        "Laravel",
        "Sanctum",
      ],
      status: "Pending",
      score: null,
    },
    {
      id: "3",
      title: "Portfolio Website",
      description: "Create a responsive portfolio website.",
      type: "Project",
      skills: [
        "React",
        "Responsive Design",
      ],
      status: "Accepted",
      score: null,
    },
    {
      id: "4",
      title: "Task Management App",
      description: "Build a task management application.",
      type: "Project",
      skills: [
        "React",
        "Node.js",
      ],
      status: "Submitted",
      score: null,
    },
    {
      id: "5",
      title: "E-Commerce Platform",
      description: "Build a task management application.",
      type: "Project",
      skills: [
        "React",
        "Node.js",
      ],
      status: "Pending",
      score: null,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpenSubmission = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };
const handleSubmitSubmission = (submission) => {

  const newSubmission = {
    id: crypto.randomUUID(),
    taskId: selectedTask.id,
    taskTitle: selectedTask.title,
    submittedAt: new Date().toISOString(),
    status: "Pending",
    ...submission,
  };

  setSubmissions((prev) => [
    ...prev,
    newSubmission,
  ]);

  setShowModal(false);
  setSelectedTask(null);
};

  return (
    <div className="tasks-page">
      <h1>My Tasks</h1>

      <div className="tasks-actions">
        <p>
          Select a task and submit your solution.
        </p>
      </div>

      <div className="tasks-grid">
        {tasks.map((task) => {
          // التحقق هل تم تسليم هذه المهمة مسبقاً
          const submitted = submissions.some(
            (submission) => submission.taskId === task.id
          );

          return (
            <TaskCard
  key={task.id}
  task={task}
  submissions={submissions}
  onSubmit={handleOpenSubmission}
/>
          );
        })}
      </div>

      {showModal && selectedTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={handleCloseModal}
            >
              ✕
            </button>

            <SubmissionForm
              task={selectedTask}
              onSubmitSubmission={handleSubmitSubmission}
            />
          </div>
        </div>
      )}
    </div>
  );
}