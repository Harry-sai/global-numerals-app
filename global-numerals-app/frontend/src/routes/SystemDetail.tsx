import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NumeralSystem } from "../components/SystemCard";

const API_BASE = "http://localhost:8000";

const SystemDetail: React.FC = () => {
  const { id } = useParams();
  const [system, setSystem] = useState<NumeralSystem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE}/api/systems/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => setSystem(data))
      .catch(() => setSystem(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-sm">Loading…</div>;
  if (!system) return <div className="text-sm">System not found.</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{system.name}</h1>
        <Link
          to="/converter"
          className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
        >
          Convert with this system
        </Link>
      </div>
      <p className="text-xs text-slate-400">{system.region}</p>

      <div className="grid gap-3 md:grid-cols-2 text-sm">
        <div className="space-y-2">
          <h2 className="font-semibold text-sm">Base / Structure</h2>
          <p className="text-slate-200">
            {system.base ? `Base ${system.base}` : "Non-positional / mixed base"}
          </p>
          <p className="text-slate-300">{system.description}</p>
          <h2 className="font-semibold text-sm mt-3">Morphology</h2>
          <p className="text-slate-300 whitespace-pre-line">
            {system.morphology}
          </p>
          <h2 className="font-semibold text-sm mt-3">Construction Rules</h2>
          <p className="text-slate-300 whitespace-pre-line">
            {system.construction_rules}
          </p>
        </div>
        <div className="space-y-2">
          {system.recursive_logic && (
            <>
              <h2 className="font-semibold text-sm">Recursive / Hierarchical Logic</h2>
              <p className="text-slate-300 whitespace-pre-line">
                {system.recursive_logic}
              </p>
            </>
          )}
          <h2 className="font-semibold text-sm mt-3">Cultural Context</h2>
          <p className="text-slate-300 whitespace-pre-line">
            {system.cultural_context}
          </p>
          <h2 className="font-semibold text-sm mt-3">Examples</h2>
          <ul className="text-xs space-y-1">
            {system.examples.map((ex, idx) => (
              <li key={idx} className="border border-slate-800 rounded-lg p-2">
                <span className="font-semibold">
                  {ex.arabic} → {ex.representation}
                </span>
                {ex.explanation && (
                  <div className="text-slate-300">{ex.explanation}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SystemDetail;
