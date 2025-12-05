import React, { useEffect, useState } from "react";
import PuzzleCard, { Puzzle } from "../components/PuzzleCard";

const API_BASE = "http://localhost:8000";

const Practice: React.FC = () => {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/puzzles`)
      .then((r) => r.json())
      .then((data) => setPuzzles(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-sm">Loading puzzles…</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Practice Zone</h1>
      <p className="text-sm text-slate-300 max-w-xl">
        Solve pattern-based puzzles inspired by Linguistics Olympiad problems.
        Focus on how languages encode numbers through structure.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {puzzles.map((p) => (
          <PuzzleCard key={p.id} puzzle={p} />
        ))}
      </div>
    </div>
  );
};

export default Practice;
