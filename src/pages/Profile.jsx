import { motion } from "framer-motion";
import { useAnimatedCounter } from "../useAnimatedCounter";

export default function Profile({ student, submissions }) {
  const acceptedCount = submissions.filter(
    (s) => s.status === "accepted"
  ).length;

  const totalSubmissions = submissions.length;

  const featuredProject =
    submissions
      .filter((s) => s.score !== null)
      .sort((a, b) => b.score - a.score)[0];

const animatedScore = useAnimatedCounter(student.overallScore || 0, 1200);
const progress = Math.min(animatedScore, 100);

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="profile-page">
      <h1 className="page-title">My Dashboard</h1>

      {/* HEADER */}
      <motion.div
        className="profile-card profile-header-card"
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div>
          <h2 className="profile-name">{student.name}</h2>
          <p className="profile-tagline">{student.tagline}</p>
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
        2 * Math.PI * 38 * (1 - progress / 100)
      }
    />
  </svg>

  <span className="score-number">{progress}%</span>
</div>
      </motion.div>

      {/* STATS */}
      <motion.div
        className="profile-stats"
        initial="hidden"
        animate="visible"
      >
        {[
          { title: "Accepted", value: acceptedCount },
          { title: "Submissions", value: totalSubmissions },
          { title: "Batch", value: student.batch },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="stat-card"
            variants={cardVariant}
            custom={i + 1}
            initial="hidden"
            animate="visible"
          >
            <h3>{item.value}</h3>
            <p>{item.title}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* FEATURED */}
      <motion.div
        className="profile-card"
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        custom={4}
      >
        <h3 className="section-title">Featured Project</h3>
        {featuredProject ? (
          <div className="featured-box">
            <h4>{featuredProject.taskTitle}</h4>
            <p>Score: {featuredProject.score}</p>
          </div>
        ) : (
          <p>No featured project yet</p>
        )}
      </motion.div>

      {/* BIO */}
      <motion.div
        className="profile-card"
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        custom={5}
      >
        <h3 className="section-title">About</h3>
        <p>{student.bio}</p>
      </motion.div>

      {/* LINKS */}
      <motion.div
        className="profile-card"
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        custom={6}
      >
        <h3 className="section-title">Links</h3>

        <div className="links">
          <a href={student.github}>GitHub</a>
          <a href={student.linkedin}>LinkedIn</a>
        </div>
      </motion.div>
    </div>
  );
}