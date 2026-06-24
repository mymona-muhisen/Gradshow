import React from "react";
import { useParams } from "react-router-dom";

export default function SubmissionDetails({
  submissions,
}) {
  const { id } = useParams();

  const submission = submissions?.find(
    (item) => item.id === id
  );

  if (!submission) {
    return (
      <div className="tasks-page">
        <h1>Submission Details</h1>

        <p>
          Submission not found.
        </p>
      </div>
    );
  }

  return (
    <div className="tasks-page">
      <h1>Submission Details</h1>

      <div className="task-card">

        <h2>{submission.taskTitle}</h2>

        <p>
          <strong>Status:</strong>{" "}
          {submission.status}
        </p>

        <p>
          <strong>Submitted At:</strong>{" "}
          {new Date(
            submission.submittedAt
          ).toLocaleString()}
        </p>

        <p>
          <strong>Description:</strong>
        </p>

        <p>
          {submission.description}
        </p>

        <p>
          <strong>GitHub Repository:</strong>
        </p>

        <a
          href={submission.githubLink}
          target="_blank"
          rel="noreferrer"
        >
          Open Repository
        </a>

        {submission.liveUrl && (
          <>
            <p>
              <strong>Live URL:</strong>
            </p>

            <a
              href={submission.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open Live Project
            </a>
          </>
        )}

        {submission.videoUrl && (
          <>
            <p>
              <strong>Video URL:</strong>
            </p>

            <a
              href={submission.videoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Watch Video
            </a>
          </>
        )}

        <hr />

        <h3>Evaluation</h3>

        {submission.evaluations?.length ? (
          submission.evaluations.map(
            (evaluation) => (
              <div
                key={evaluation.skill}
                className="evaluation-item"
              >
                <p>
                  <strong>
                    {evaluation.skill}
                  </strong>
                </p>

                <p>
                  Score: {evaluation.score}
                </p>

                <p>
                  {evaluation.comment}
                </p>
              </div>
            )
          )
        ) : (
          <p>
            This submission has not
            been evaluated yet.
          </p>
        )}

      </div>
    </div>
  );
}