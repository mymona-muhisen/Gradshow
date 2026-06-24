import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAnimatedCounter } from "../useAnimatedCounter";
 
export default function Dashboard({ student, submissions }) {
  const totalSubmissions = submissions.length;
  const acceptedCount = submissions.filter(
    (s) => s.status === "accepted" || s.status === "Accepted"
  ).length;
  const pendingCount = submissions.filter(
    (s) => s.status === "Pending" || s.status === "pending"
  ).length;
 
  const animatedScore = useAnimatedCounter(student.overallScore || 0, 1200);
  const progress = Math.min(animatedScore, 100);
 
  const recentSubmissions = [...submissions]
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, 3);
 
  const cardVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.45, ease: "easeOut" },
    }),
  };
 
  return (
    <div className="tasks-page">
      <h1>Dashboard</h1>
 
      {/* Welcome banner */}
      <motion.div
        className="dashboard-welcome"
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div className="dashboard-welcome-text">
          <h2>Welcome back, {student.name} 👋</h2>
          <p>{student.tagline}</p>
        </div>
        <div className="score-ring score-ring-sm">
          <svg>
            <circle className="circle-bg" cx="45" cy="45" r="38" />
            <circle
              className="circle"
              cx="45"
              cy="45"
              r="38"
              strokeDasharray={2 * Math.PI * 38}
              strokeDashoffset={2 * Math.PI * 38 * (1 - progress / 100)}
            />
          </svg>
          <span className="score-number">{progress}%</span>
        </div>
      </motion.div>
 
      {/* Stats row */}
      <div className="dashboard-stats">
        {[
          { label: "Total Submissions", value: totalSubmissions, icon: "📋" },
          { label: "Accepted", value: acceptedCount, icon: "✅" },
          { label: "Pending Review", value: pendingCount, icon: "⏳" },
          { label: "Overall Score", value: `${animatedScore}%`, icon: "🏆" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="dashboard-stat-card"
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            custom={i + 1}
          >
            <span className="dashboard-stat-icon">{stat.icon}</span>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </div>
 
      {/* Quick actions */}
      <motion.div
        className="dashboard-section"
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        custom={5}
      >
        <h3 className="section-title">Quick Actions</h3>
        <div className="dashboard-actions">
          <Link to="/tasks" className="btn btn-add">
            📝 View Tasks
          </Link>
          <Link to="/submissions" className="btn">
            📂 My Submissions
          </Link>
          <Link to="/scores" className="btn">
            🏅 My Scores
          </Link>
          <Link to="/profile" className="btn">
            👤 My Profile
          </Link>
        </div>
      </motion.div>
 
      {/* Recent submissions */}
      <motion.div
        className="dashboard-section"
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        custom={6}
      >
        <h3 className="section-title">Recent Submissions</h3>
 
        {recentSubmissions.length === 0 ? (
          <p>No submissions yet. <Link to="/tasks">Start with a task →</Link></p>
        ) : (
          <div className="tasks-grid">
            {recentSubmissions.map((sub) => (
              <div key={sub.id} className="task-card">
                <h2>{sub.taskTitle}</h2>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`status-badge status-${sub.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {sub.status}
                  </span>
                </p>
                <p>
                  <strong>Submitted:</strong>{" "}
                  {new Date(sub.submittedAt).toLocaleDateString()}
                </p>
                <Link to={`/submissions/${sub.id}`} className="btn">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
