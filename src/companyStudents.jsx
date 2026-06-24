import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./CompanyStudents.css";
// بيانات طلاب تجريبية
const MOCK_STUDENTS = [
  {
    id: "s1", name: "مرح الحمصي",      track: "Full Stack", batch: "Batch 5",
    overallScore: 91, tagline: "Aspiring Full Stack Developer",
    github: "https://github.com/marah", linkedin: "https://linkedin.com/in/marah",
    submissionsCount: 6, acceptedCount: 4,
    skills: ["React", "Laravel", "Node.js", "Problem Solving"],
  },
  {
    id: "s2", name: "ميمونة محيسن",     track: "Frontend",   batch: "Batch 5",
    overallScore: 87, tagline: "UI Engineer & Design Systems",
    github: "https://github.com/mymona", linkedin: "https://linkedin.com/in/mymona",
    submissionsCount: 5, acceptedCount: 3,
    skills: ["React", "CSS", "Figma", "Communication"],
  },
  {
    id: "s3", name: "خزامى العبد الحميد", track: "Backend",  batch: "Batch 5",
    overallScore: 83, tagline: "Backend Developer · API First",
    github: "https://github.com/khuzama", linkedin: "",
    submissionsCount: 7, acceptedCount: 4,
    skills: ["Laravel", "PHP", "Architecture", "Testing"],
  },
  {
    id: "s4", name: "سارة العمري",       track: "Full Stack", batch: "Batch 5",
    overallScore: 78, tagline: "Building things that matter",
    github: "", linkedin: "https://linkedin.com/in/sarah",
    submissionsCount: 4, acceptedCount: 2,
    skills: ["React", "Node.js", "Delivery"],
  },
  {
    id: "s5", name: "لينا الشمري",       track: "Frontend",   batch: "Batch 5",
    overallScore: 72, tagline: "Creative developer · UX focused",
    github: "https://github.com/lena", linkedin: "",
    submissionsCount: 3, acceptedCount: 1,
    skills: ["React", "CSS", "Figma"],
  },
];

const MEDALS = ["🥇", "🥈", "🥉"];

export default function CompanyStudents() {
  const [search, setSearch] = useState("");
  const [filterTrack, setFilterTrack] = useState("all");

  const tracks = ["all", ...new Set(MOCK_STUDENTS.map((s) => s.track))];

  const filtered = MOCK_STUDENTS
    .filter((s) =>
      s.name.includes(search) ||
      s.tagline.toLowerCase().includes(search.toLowerCase()) ||
      s.skills.some((sk) => sk.toLowerCase().includes(search.toLowerCase()))
    )
    .filter((s) => filterTrack === "all" || s.track === filterTrack)
    .sort((a, b) => b.overallScore - a.overallScore);

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
  };

  return (
    <div className="tasks-page">
      <h1>Students</h1>
      <p style={{ marginBottom: "1rem", color: "#64748b" }}>
        Sorted best → worst by overall score
      </p>

      {/* Filters */}
      <div className="company-filters">
        <input
          className="form-input company-search"
          type="text"
          placeholder="ابحث باسم الطالب أو الـ skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-tabs">
          {tracks.map((t) => (
            <button
              key={t}
              className={`filter-tab ${filterTrack === t ? "active" : ""}`}
              onClick={() => setFilterTrack(t)}
            >
              {t === "all" ? "الكل" : t}
            </button>
          ))}
        </div>
      </div>

      {/* Students grid */}
      <div className="students-grid">
        {filtered.map((student, i) => (
          <motion.div
            key={student.id}
            className="student-card"
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            {/* Rank badge */}
            <div className="student-rank">
              {i < 3 ? (
                <span className="medal">{MEDALS[i]}</span>
              ) : (
                <span className="rank-num">#{i + 1}</span>
              )}
            </div>

            {/* Avatar */}
            <div className="student-avatar">
              {student.name.charAt(0)}
            </div>

            <h2 className="student-name">{student.name}</h2>
            <p className="student-tagline">{student.tagline}</p>

            <div className="student-meta">
              <span className="meta-badge">{student.track}</span>
              <span className="meta-badge">{student.batch}</span>
            </div>

            {/* Score bar */}
            <div className="student-score-row">
              <span>Overall Score</span>
              <span className="student-score-val">{student.overallScore}%</span>
            </div>
            <div className="score-bar-track">
              <div
                className="score-bar-fill"
                style={{
                  width: `${student.overallScore}%`,
                  backgroundColor: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : i === 2 ? "#cd7c3a" : "#1c777d",
                }}
              />
            </div>

            {/* Stats */}
            <div className="student-stats-row">
              <div className="student-stat">
                <strong>{student.submissionsCount}</strong>
                <span>Submissions</span>
              </div>
              <div className="student-stat">
                <strong>{student.acceptedCount}</strong>
                <span>Accepted</span>
              </div>
            </div>

            {/* Skills */}
            <div className="student-skills">
              {student.skills.slice(0, 3).map((sk) => (
                <span key={sk} className="skill-tag">{sk}</span>
              ))}
              {student.skills.length > 3 && (
                <span className="skill-tag skill-more">+{student.skills.length - 3}</span>
              )}
            </div>

            {/* Links */}
            <div className="student-links">
              {student.github && (
                <a href={student.github} target="_blank" rel="noreferrer" className="btn">
                  GitHub
                </a>
              )}
              {student.linkedin && (
                <a href={student.linkedin} target="_blank" rel="noreferrer" className="btn">
                  LinkedIn
                </a>
              )}
              <Link to={`/company/students/${student.id}`} className="btn btn-add">
                View Profile
              </Link>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#94a3b8" }}>
            لا يوجد طلاب مطابقون للبحث
          </p>
        )}
      </div>
    </div>
  );
}