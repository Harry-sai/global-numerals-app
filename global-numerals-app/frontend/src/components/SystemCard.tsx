import React from "react";
import { Link } from "react-router-dom";

export interface NumeralExample {
  arabic: number;
  representation: string;
  explanation?: string;
}

export interface NumeralSystem {
  id: string;
  name: string;
  region: string;
  base?: number | null;
  description: string;
  morphology: string;
  construction_rules: string;
  recursive_logic?: string | null;
  cultural_context: string;
  examples: NumeralExample[];
}

const SystemCard: React.FC<{ system: NumeralSystem }> = ({ system }) => {
  return (
    <Link
      to={`/library/${system.id}`}
      className="block rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-500 hover:bg-slate-900 transition"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">{system.name}</h2>
        <span className="text-xs text-slate-400">{system.region}</span>
      </div>
      <p className="text-sm text-slate-200 line-clamp-2 mb-3">
        {system.description}
      </p>
      {system.examples && system.examples.length > 0 && (
        <div className="text-xs text-slate-300">
          <span className="font-semibold">Example:</span>{" "}
          {system.examples[0].arabic} → {system.examples[0].representation}
        </div>
      )}
    </Link>
  );
};

export default SystemCard;
