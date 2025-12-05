import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE = "http://localhost:8000";

interface PuzzleFull {
  id: string;
  system_id: string;
  title: string;
  difficulty: string;
  prompt: string;
  hints: string[];
  solution_explanation: string;
  answer_type: string;
}

interface CheckResponse {
  correct: boolean;
  feedback: string;
  expected: any;
}

const PracticePuzzle: React.FC = () => {
  const { id } = useParams();
  const [puzzle, setPuzzle] = useState<PuzzleFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState<string>("");
  const [checkResult, setCheckResult] = useState<CheckResponse | null>(null);
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE}/api/puzzles/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => setPuzzle(data))
      .catch(() => setPuzzle(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCheck = async () => {
    if (!puzzle) return;
    const res = await fetch(`${API_BASE}/api/puzzles/${puzzle.id}/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: answer })
    });
    const data: CheckResponse = await res.json();
    setCheckResult(data);
  };

  if (loading) return <div className="text-sm">Loading…</div>;
  if (!puzzle) return <div className="text-sm">Puzzle not found.</div>;

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-xl font-semibold">{puzzle.title}</h1>
        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-200 uppercase">
          {puzzle.difficulty}
        </span>
      </div>

      <p className="text-sm text-slate-200 whitespace-pre-line">
        {puzzle.prompt}
      </p>

      <div className="space-y-2 text-sm">
        <label className="block text-xs">
          Your answer ({puzzle.answer_type})
        </label>
        <input
          className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2 py-1 text-sm"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here"
        />
        <button
          onClick={handleCheck}
          className="mt-1 px-4 py-1.5 rounded-full text-xs bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400"
        >
          Check answer
        </button>
      </div>

      <button
        onClick={() => setShowHints((v) => !v)}
        className="text-xs text-emerald-300 underline"
      >
        {showHints ? "Hide hints" : "Show hints"}
      </button>

      {showHints && (
        <ul className="text-xs list-disc pl-5 text-slate-300 space-y-1">
          {puzzle.hints.map((h, idx) => (
            <li key={idx}>{h}</li>
          ))}
        </ul>
      )}

      {checkResult && (
        <div className="mt-3 text-sm border border-slate-800 rounded-2xl p-3 bg-slate-900/60">
          <div
            className={
              checkResult.correct ? "text-emerald-300" : "text-amber-300"
            }
          >
            {checkResult.feedback}
          </div>
          {!checkResult.correct && (
            <div className="text-xs text-slate-300 mt-2">
              Expected answer (for reference):{" "}
              <code className="bg-slate-800 px-1 py-0.5 rounded">
                {String(checkResult.expected)}
              </code>
            </div>
          )}
          <div className="text-xs text-slate-400 mt-2">
            Explanation: {puzzle.solution_explanation}
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticePuzzle;
