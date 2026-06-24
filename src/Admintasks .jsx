import { useState } from "react";
import { motion } from "framer-motion";

const ALL_SKILLS = [
  "Code Quality", "Problem Solving", "Architecture", "Testing", "Documentation",
  "Communication", "Delivery", "Teamwork", "Presentation",
  "React", "Laravel", "PHP", "Node.js", "Responsive Design",
];

const INITIAL_TASKS = [
  {
    id: "1", title: "React Dashboard", type: "HW",
    description: "Build a dashboard using React with state management and API integration.",
    skills: ["Code Quality", "Problem Solving"],
    videoRequired: false, submissionsCount: 4,
  },
  {
    id: "2", title: "Laravel Authentication", type: "HW",
    description: "Implement authentication using Laravel and Sanctum.",
    skills: ["PHP", "Laravel", "Architecture"],
    videoRequired: false, submissionsCount: 3,
  },
  {
    id: "3", title: "Portfolio Website", type: "Final",
    description: "Create a fully responsive portfolio website showcasing your work.",
    skills: ["React", "Responsive Design", "Delivery", "Presentation"],
    videoRequired: true, submissionsCount: 5,
  },
  {
    id: "4", title: "Task Management App", type: "Final",
    description: "Build a task management application with full CRUD.",
    skills: ["React", "Node.js", "Code Quality"],
    videoRequired: true, submissionsCount: 2,
  },
];

export default function AdminTasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "", type: "HW", description: "", skills: [], videoRequired: false,
  });

  const toggleSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title || form.skills.length === 0) return;
    const newTask = {
      ...form,
      id: crypto.randomUUID(),
      submissionsCount: 0,
    };
    setTasks((prev) => [newTask, ...prev]);
    setForm({ title: "", type: "HW", description: "", skills: [], videoRequired: false });
    setShowModal(false);
  };

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const cardVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.35 } }),
  };

  return (
    <div className="tasks-page">
      <h1>Manage Tasks</h1>

      <div className="tasks-actions">
        <p>Total: {tasks.length} tasks · {tasks.filter((t) => t.type === "Final").length} Final · {tasks.filter((t) => t.type === "HW").length} HW</p>
        <button className="btn btn-add" onClick={() => setShowModal(true)}>
          + Create Task
        </button>
      </div>

      <div className="tasks-grid">
        {tasks.map((task, i) => (
          <motion.div key={task.id} className="task-card" variants={cardVariant} initial="hidden" animate="visible" custom={i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
              <span className={`type-badge type-${task.type.toLowerCase()}`}>{task.type}</span>
              {task.videoRequired && <span className="video-required-badge">📹 Video Required</span>}
            </div>

            <h2 style={{ marginBottom: "0.4rem" }}>{task.title}</h2>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "0.75rem", lineHeight: 1.6 }}>
              {task.description}
            </p>

            <div className="student-skills" style={{ marginBottom: "0.75rem" }}>
              {task.skills.map((sk) => (
                <span key={sk} className="skill-tag">{sk}</span>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                {task.submissionsCount} submissions
              </span>
              <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create task modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxHeight: "90vh", overflowY: "auto" }}>
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>

            <h2 className="form-title">Create New Task</h2>

            <form className="task-form" onSubmit={handleCreate}>
              <label className="form-label">
                Task Title
                <input
                  className="form-input"
                  type="text"
                  placeholder="e.g. Build a REST API with Laravel"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </label>

              <label className="form-label">
                Description
                <textarea
                  className="form-input"
                  placeholder="Describe what students need to build..."
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </label>

              {/* Task type toggle */}
              <div className="form-label">
                Task Type
                <div className="type-toggle">
                  {["HW", "Final"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`type-toggle-btn ${form.type === t ? "active" : ""}`}
                      onClick={() => setForm({ ...form, type: t, videoRequired: t === "Final" })}
                    >
                      {t === "HW" ? "📚 Homework" : "🏆 Final Project"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills selector */}
              <div className="form-label">
                Evaluation Skills
                <p style={{ fontWeight: 400, fontSize: "0.82rem", color: "#94a3b8", marginBottom: "0.5rem" }}>
                  Select which skills will be evaluated for this task
                </p>
                <div className="skills-picker">
                  {ALL_SKILLS.map((sk) => (
                    <button
                      key={sk}
                      type="button"
                      className={`skill-pick-btn ${form.skills.includes(sk) ? "selected" : ""}`}
                      onClick={() => toggleSkill(sk)}
                    >
                      {sk}
                    </button>
                  ))}
                </div>
                {form.skills.length === 0 && (
                  <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.4rem" }}>
                    Select at least one skill
                  </p>
                )}
              </div>

              {/* Video required */}
              <label className="form-label" style={{ flexDirection: "row", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.videoRequired}
                  onChange={(e) => setForm({ ...form, videoRequired: e.target.checked })}
                  style={{ width: "1.1rem", height: "1.1rem" }}
                />
                <span>Video required for submission</span>
                {form.type === "Final" && (
                  <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>(mandatory for Final)</span>
                )}
              </label>

              <button type="submit">Create Task</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}