import React from "react";

export interface ConversionStep {
  step: string;
  details: string;
}

const StepExplanation: React.FC<{ steps: ConversionStep[] }> = ({ steps }) => {
  if (!steps || steps.length === 0) return null;
  return (
    <ol className="mt-4 space-y-2 text-sm">
      {steps.map((s, idx) => (
        <li
          key={idx}
          className="border-l-2 border-emerald-500/70 pl-3 text-slate-100"
        >
          <div className="font-semibold">{s.step}</div>
          <div className="text-slate-300 text-xs">{s.details}</div>
        </li>
      ))}
    </ol>
  );
};

export default StepExplanation;
