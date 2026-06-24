import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const MOCK_STUDENTS = {
  s1: {
    id: "s1", name: "مرح الحمصي", track: "Full Stack", batch: "Batch 5",
    overallScore: 91, tagline: "Aspiring Full Stack Developer",
    bio: "Passionate about building web applications with React and Laravel. Enjoys solving complex problems and writing clean, maintainable code.",
    github: "https://github.com/marah", linkedin: "https://linkedin.com/in/marah",
    skills: ["React", "Laravel", "Node.js", "Problem Solving", "Code Quality", "Delivery"],
    submissions: [
      {
        id: "sub1", taskTitle: "React Dashboard", type: "Final", status: "Accepted",
        submittedAt: "2025-03-10", githubLink: "https://github.com/marah/react-dashboard",
        liveUrl: "https://marah-dashboard.netlify.app", videoUrl: "https://youtube.com/watch?v=demo",
        description: "Built a full patient management dashboard with CRUD, modals, and GSAP animations.",
        evaluations: [
          { skill: "Code Quality", score: 9, comment: "Very clean and organized." },
          { skill: "Problem Solving", score: 8, comment: "Solid approach to state management." },
          { skill: "Delivery", score: 9, comment: "Delivered on time with full features." },
        ],
      },
      {
        id: "sub2", taskTitle: "Laravel Authentication", type: "HW", status: "Accepted",
        submittedAt: "2025-02-20", githubLink: "https://github.com/marah/laravel-auth",
        liveUrl: "", videoUrl: "",
        description: "Implemented full auth flow with Sanctum, token refresh, and protected routes.",
        evaluations: [
          { skill: "Code Quality", score: 8, comment: "Well structured." },
          { skill: "Problem Solving", score: 9, comment: "Smart implementation." },
        ],
      },
      {
        id: "sub3", taskTitle: "Portfolio Website", type: "Final", status: "Pending",
        submittedAt: "2025-04-01", githubLink: "https://github.com/marah/portfolio",
        liveUrl: "", videoUrl: "",
        description: "Responsive portfolio with dark mode.",
        evaluations: [],
      },
    ],
  },
  s2: {
    id: "s2", name: "ميمونة محيسن", track: "Frontend", batch: "Batch 5",
    overallScore: 87, tagline: "UI Engineer & Design Systems",
    bio: "Frontend engineer focused on pixel-perfect UIs and accessible design systems.",
    github: "https://github.com/mymona", linkedin: "https://linkedin.com/in/mymona",
    skills: ["React", "CSS", "Figma", "Communication", "Responsive Design"],
    submissions: [
      {
        id: "sub4", taskTitle: "React Dashboard", type: "Final", status: "Accepted",
        submittedAt: "2025-03-12", githubLink: "https://github.com/mymona/gradshow",
        liveUrl: "https://alhasan-hospital.netlify.app", videoUrl: "",
        description: "Hospital dashboard with GSAP cursor animation.",
        evaluations: [
          { skill: "Code Quality", score: 9, comment: "Clean component structure." },
          { skill: "Responsive Design", score: 9, comment: "Works great on all screen sizes." },
        ],
      },
    ],
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } }),
};

export default function CompanyStudentProfile() {
  const { id } = useParams();
  const student = MOCK_STUDENTS[id];

  if (!student) {
    return (
      <div className="tasks-page">
        <h1>Student Not Found</h1>
        <Link to="/company/students" className="btn btn-add" style={{ marginTop: "1rem" }}>
          Back to Students
        </Link>
      </div>
    );
  }

  const accepted = student.submissions.filter((s) => s.status === "Accepted");
  const allEvals = student.submissions.flatMap((s) => s.evaluations);
  const avgScore = allEvals.length
    ? (allEvals.reduce((a, ev) => a + ev.score, 0) / allEvals.length).toFixed(1)
    : null;

  return (
    <div className="tasks-page">
      <div style={{ width: "min(980px,100%)", marginBottom: "0.5rem" }}>
        <Link to="/company/students" className="btn">← Back to Students</Link>
      </div>

      {/* Header */}
      <motion.div className="student-profile-header" variants={cardVariant} initial="hidden" animate="visible" custom={0}>
        <div className="student-avatar student-avatar-lg">{student.name.charAt(0)}</div>
        <div className="student-profile-info">
          <h2>{student.name}</h2>
          <p className="student-tagline">{student.tagline}</p>
          <div className="student-meta" style={{ marginTop: "0.5rem" }}>
            <span className="meta-badge">{student.track}</span>
            <span className="meta-badge">{student.batch}</span>
          </div>
          <p style={{ marginTop: "0.75rem", color: "#64748b", lineHeight: 1.7 }}>{student.bio}</p>
          <div className="student-links" style={{ marginTop: "0.75rem" }}>
            {student.github && <a href={student.github} target="_blank" rel="noreferrer" className="btn">GitHub ↗</a>}
            {student.linkedin && <a href={student.linkedin} target="_blank" rel="noreferrer" className="btn">LinkedIn ↗</a>}
          </div>
        </div>
        <div className="student-profile-score">
          <div className="score-big">{student.overallScore}%</div>
          <div style={{ color: "#64748b", fontSize: "0.85rem" }}>Overall Score</div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div className="dashboard-stats" style={{ marginTop: "1rem", width: "min(980px,100%)" }} variants={cardVariant} initial="hidden" animate="visible" custom={1}>
        {[
          { label: "Submissions", value: student.submissions.length, icon: "📋" },
          { label: "Accepted", value: accepted.length, icon: "✅" },
          { label: "Avg Skill Score", value: avgScore ? `${avgScore}/10` : "—", icon: "⭐" },
        ].map((stat) => (
          <div key={stat.label} className="dashboard-stat-card">
            <span className="dashboard-stat-icon">{stat.icon}</span>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Skills */}
      <motion.div className="dashboard-section" variants={cardVariant} initial="hidden" animate="visible" custom={2}>
        <h3 className="section-title">Skills</h3>
        <div className="student-skills" style={{ marginTop: "0.5rem" }}>
          {student.skills.map((sk) => (
            <span key={sk} className="skill-tag">{sk}</span>
          ))}
        </div>
      </motion.div>

      {/* Accepted showcase */}
      {accepted.length > 0 && (
        <motion.div className="dashboard-section" variants={cardVariant} initial="hidden" animate="visible" custom={3}>
          <h3 className="section-title">🏆 Accepted Showcase</h3>
          <div className="tasks-grid">
            {accepted.map((sub) => (
              <div key={sub.id} className="task-card showcase-card">
                <span className="showcase-badge">✓ Accepted</span>
                <h2 style={{ marginBottom: "0.4rem" }}>{sub.taskTitle}</h2>
                <span className="meta-badge">{sub.type}</span>
                <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "0.75rem 0" }}>{sub.description}</p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {sub.githubLink && <a href={sub.githubLink} target="_blank" rel="noreferrer" className="btn">GitHub ↗</a>}
                  {sub.liveUrl && <a href={sub.liveUrl} target="_blank" rel="noreferrer" className="btn btn-add">Live Demo ↗</a>}
                  {sub.videoUrl && <a href={sub.videoUrl} target="_blank" rel="noreferrer" className="btn">▶ Video</a>}
                </div>
                {sub.evaluations.length > 0 && (
                  <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {sub.evaluations.map((ev) => (
                      <div key={ev.skill} className="eval-row">
                        <span className="eval-skill">{ev.skill}</span>
                        <span className="eval-score">{ev.score}/10</span>
                        <span className="eval-comment">{ev.comment}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* All submissions */}
      <motion.div className="dashboard-section" variants={cardVariant} initial="hidden" animate="visible" custom={4}>
        <h3 className="section-title">All Submissions</h3>
        <div className="tasks-grid">
          {student.submissions.map((sub) => (
            <div key={sub.id} className="task-card">
              <h2 style={{ marginBottom: "0.5rem" }}>{sub.taskTitle}</h2>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                <span className="meta-badge">{sub.type}</span>
                <span className={`status-badge status-${sub.status.toLowerCase()}`}>{sub.status}</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                {new Date(sub.submittedAt).toLocaleDateString("ar-SA")}
              </p>
              {sub.githubLink && (
                <a href={sub.githubLink} target="_blank" rel="noreferrer" className="btn" style={{ marginTop: "0.75rem", display: "inline-block" }}>
                  View Repo ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}