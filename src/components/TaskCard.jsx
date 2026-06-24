import { Link } from "react-router-dom";

export default function TaskCard({
  task,
  submissions = [],
  onSubmit,
}) {
  const existingSubmission = submissions.find(
    (submission) => submission.taskId === task.id
  );

  return (
    <div className="task-card">
      <h2>{task.title}</h2>

      <p>
        <strong>Type:</strong> {task.type}
      </p>

      <p>
        <strong>Skills:</strong>
      </p>

      <ul className="task-skills">
        {task.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      {existingSubmission ? (
        <Link
          to={`/submissions/${existingSubmission.id}`}
          className="btn"
        >
          View Submission
        </Link>
      ) : (
        <button
          className="btn btn-add"
          onClick={() => onSubmit(task)}
        >
          Submit Solution
        </button>
      )}
    </div>
  );
}