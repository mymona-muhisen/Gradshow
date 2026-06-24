import { useState } from "react";

export default function SubmissionForm({
  task,
  onSubmitSubmission,
}) {
  const [githubLink, setGithubLink] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmitSubmission({
      githubLink,
      description,
      videoUrl,
      liveUrl,
    });

    setGithubLink("");
    setDescription("");
    setVideoUrl("");
    setLiveUrl("");
  };

  return (
    <div>
      <h2 className="form-title">Submit Solution</h2>

      {/* اسم المهمة التي سيتم التسليم لها */}
      <p className="submission-task-title">
        Task: <strong>{task?.title}</strong>
      </p>

      <form
        className="task-form"
        onSubmit={handleSubmit}
      >
        <label className="form-label">
          GitHub Repository:
          <input
            className="form-input"
            type="url"
            placeholder="https://github.com/username/project"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            required
          />
        </label>

        <label className="form-label">
          Description:
          <textarea
            className="form-input"
            placeholder="Describe your solution and implementation details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label className="form-label">
          Video URL:
          <input
            className="form-input"
            type="url"
            placeholder="https://youtube.com/..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </label>

        <label className="form-label">
          Live URL:
          <input
            className="form-input"
            type="url"
            placeholder="https://your-project-demo.com"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
          />
        </label>

        <button type="submit">
          Submit Solution
        </button>
      </form>
    </div>
  );
}