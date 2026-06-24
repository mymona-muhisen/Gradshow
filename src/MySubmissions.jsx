import React from "react";
import { Link } from "react-router-dom";

export default function MySubmissions({ submissions }) {
  if (submissions.length === 0) {
    return (
      <div className="tasks-page">
        <h1>My Submissions</h1>
        <p>You have not submitted any tasks yet.</p>
      </div>
    );
  }

  return (
    <div className="tasks-page">
      <h1>My Submissions</h1>

      <div className="tasks-grid">
        {submissions.map((submission) => (
          <div key={submission.id} className="task-card">
            <h2>{submission.taskTitle}</h2>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`status-badge status-${submission.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {submission.status}
              </span>
            </p>

            <p>
              <strong>Submitted:</strong>{" "}
              {new Date(submission.submittedAt).toLocaleDateString()}
            </p>

            <p>
              <strong>GitHub:</strong>
            </p>
            <a href={submission.githubLink} target="_blank" rel="noreferrer">
              View Repository
            </a>

            {submission.liveUrl && (
              <>
                <p>
                  <strong>Live URL:</strong>
                </p>
                <a href={submission.liveUrl} target="_blank" rel="noreferrer">
                  Open Project
                </a>
              </>
            )}

            {submission.videoUrl && (
              <>
                <p>
                  <strong>Video:</strong>
                </p>
                <a href={submission.videoUrl} target="_blank" rel="noreferrer">
                  Watch Video
                </a>
              </>
            )}

            {/* FIX: was a plain <button>, now a <Link> that navigates to submission detail */}
            <Link to={`/submissions/${submission.id}`} className="btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}