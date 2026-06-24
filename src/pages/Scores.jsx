import { motion } from "framer-motion";
import { useAnimatedCounter } from "../useAnimatedCounter";

const SKILL_COLORS = {
  "Code Quality":     "#1c777d",
  "Problem Solving":  "#7c3aed",
  "Architecture":     "#0ea5e9",
  "Testing":          "#f59e0b",
  "Documentation":    "#64748b",
  "Communication":    "#10b981",
  "Delivery":         "#ef4444",
  "Teamwork":         "#f97316",
  "Presentation":     "#ec4899",
  "PHP":              "#6366f1",
  "Laravel":          "#e11d48",
  "Sanctum":          "#0891b2",
  "React":            "#38bdf8",
  "Responsive Design":"#84cc16",
  "Node.js":          "#22c55e",
};

function ScoreBar({ skill, score, index }) {
  const animated = useAnimatedCounter(score ?? 0, 1000);
  const color = SKILL_COLORS[skill] || "#1c777d";

  const cardVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: index * 0.08, duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="score-skill-row"
      variants={cardVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="score-skill-header">
        <span className="score-skill-name">{skill}</span>
        <span className="score-skill-value" style={{ color }}>
          {score !== null && score !== undefined ? `${animated}/10` : "—"}
        </span>
      </div>
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{
            width: score !== null && score !== undefined ? `${(animated / 10) * 100}%` : "0%",
            backgroundColor: color,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Scores({ submissions, student }) {
  const overallAnimated = useAnimatedCounter(student.overallScore || 0, 1200);

  // Collect all unique skills from evaluations
  const allSkillScores = {};
  submissions.forEach((sub) => {
    if (sub.evaluations?.length) {
      sub.evaluations.forEach((ev) => {
        if (!allSkillScores[ev.skill]) allSkillScores[ev.skill] = [];
        allSkillScores[ev.skill].push(ev.score);
      });
    }
  });

  const avgBySkill = Object.entries(allSkillScores).map(([skill, scores]) => ({
    skill,
    avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
  }));

  const evaluatedSubmissions = submissions.filter(
    (s) => s.evaluations?.length > 0
  );

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.45, ease: "easeOut" },
    }),
  };

  return (
    <div className="tasks-page">
      <h1>My Scores</h1>

      {/* Overall score */}
      <motion.div
        className="scores-overall-card"
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div>
          <h2>{student.name}</h2>
          <p>{student.track} · {student.batch}</p>
        </div>
        <div className="score-ring">
          <svg>
            <circle className="circle-bg" cx="45" cy="45" r="38" />
            <circle
              className="circle"
              cx="45"
              cy="45"
              r="38"
              strokeDasharray={2 * Math.PI * 38}
              strokeDashoffset={
                2 * Math.PI * 38 * (1 - Math.min(overallAnimated, 100) / 100)
              }
            />
          </svg>
          <span className="score-number">{overallAnimated}%</span>
        </div>
      </motion.div>

      {/* Skills breakdown */}
      <motion.div
        className="scores-section"
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <h3 className="section-title">Skills Breakdown</h3>
        {avgBySkill.length === 0 ? (
          <p>No evaluations yet. Submit a task to get scored.</p>
        ) : (
          <div className="scores-skills-list">
            {avgBySkill.map((item, i) => (
              <ScoreBar
                key={item.skill}
                skill={item.skill}
                score={item.avg}
                index={i}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Per-submission scores */}
      <motion.div
        className="scores-section"
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <h3 className="section-title">Scores Per Submission</h3>
        {evaluatedSubmissions.length === 0 ? (
          <p>No evaluated submissions yet.</p>
        ) : (
          <div className="tasks-grid">
            {evaluatedSubmissions.map((sub, i) => {
              const avgScore =
                sub.evaluations.reduce((a, ev) => a + ev.score, 0) /
                sub.evaluations.length;

              return (
                <motion.div
                  key={sub.id}
                  className="task-card"
                  variants={cardVariant}
                  initial="hidden"
                  animate="visible"
                  custom={i + 3}
                >
                  <h2>{sub.taskTitle}</h2>
                  <p>
                    <strong>Avg Score:</strong>{" "}
                    <span style={{ color: "#1c777d", fontWeight: 700 }}>
                      {avgScore.toFixed(1)} / 10
                    </span>
                  </p>
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
                  <div className="scores-skills-list scores-skills-compact">
                    {sub.evaluations.map((ev, j) => (
                      <ScoreBar
                        key={ev.skill}
                        skill={ev.skill}
                        score={ev.score}
                        index={j}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}