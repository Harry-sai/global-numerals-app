import React from "react";
import { Link } from "react-router-dom";

export interface Puzzle {
  id: string;
  system_id: string;
  title: string;
  difficulty: string;
  prompt: string;
}

const difficultyColor: Record<string, string> = {
  easy: "bg-emerald-500/20 text-emerald-300",
  medium: "bg-amber-500/20 text-amber-300",
  hard: "bg-rose-500/20 text-rose-300"
};

const PuzzleCard: React.FC<{ puzzle: Puzzle }> = ({ puzzle }) => {
  return (
    <Link
      to={`/practice/${puzzle.id}`}
      className="block rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-500 hover:bg-slate-900 transition"
    >
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold text-base">{puzzle.title}</h3>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide ${
            difficultyColor[puzzle.difficulty] ||
            "bg-slate-700 text-slate-200"
          }`}
        >
          {puzzle.difficulty}
        </span>
      </div>
      <p className="text-xs text-slate-300 line-clamp-3">{puzzle.prompt}</p>
    </Link>
  );
};

export default PuzzleCard;
