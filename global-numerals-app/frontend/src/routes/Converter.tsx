import React, { useEffect, useState } from "react";
import { NumeralSystem } from "../components/SystemCard";
import StepExplanation, { ConversionStep } from "../components/StepExplanation";

const API_BASE = "http://localhost:8000";

interface ConversionResponse {
  system_id: string;
  direction: "arabic_to_system" | "system_to_arabic";
  input_value: string;
  output_value: string;
  steps: ConversionStep[];
}

const Converter: React.FC = () => {
  const [systems, setSystems] = useState<NumeralSystem[]>([]);
  const [systemId, setSystemId] = useState<string>("");
  const [arabic, setArabic] = useState<string>("");
  const [representation, setRepresentation] = useState<string>("");
  const [result, setResult] = useState<ConversionResponse | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch(`${API_BASE}/api/systems`)
      .then((r) => r.json())
      .then((data) => {
        setSystems(data);
        if (data.length > 0) setSystemId(data[0].id);
      });
  }, []);

  const handleConvert = async () => {
    setError("");
    setResult(null);
    if (!systemId) {
      setError("Select a numeral system.");
      return;
    }
    if (!arabic && !representation) {
      setError("Provide either an Arabic number or a numeral representation.");
      return;
    }
    if (arabic && representation) {
      setError("Fill only one of the two fields at a time.");
      return;
    }

    const payload: any = { system_id: systemId };
    if (arabic) payload.arabic = parseInt(arabic, 10);
    else payload.representation = representation;

    const res = await fetch(`${API_BASE}/api/convert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.detail || "Conversion error.");
      return;
    }

    const data: ConversionResponse = await res.json();
    setResult(data);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Interactive Converter</h1>

      <div className="space-y-3 text-sm">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-xs mb-1">Numeral System</label>
            <select
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2 py-1 text-sm"
              value={systemId}
              onChange={(e) => setSystemId(e.target.value)}
            >
              {systems.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">
              Arabic number (e.g., 127)
            </label>
            <input
              type="number"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2 py-1 text-sm"
              value={arabic}
              onChange={(e) => setArabic(e.target.value)}
              placeholder="Leave empty if you fill the other field"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">
              Numeral representation (e.g., XIX, —• / —••)
            </label>
            <input
              type="text"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2 py-1 text-sm"
              value={representation}
              onChange={(e) => setRepresentation(e.target.value)}
              placeholder="Leave empty if you fill the Arabic field"
            />
          </div>
        </div>

        <button
          onClick={handleConvert}
          className="mt-2 px-4 py-1.5 rounded-full text-xs bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400"
        >
          Convert
        </button>

        {error && <div className="text-xs text-rose-400 mt-2">{error}</div>}
      </div>

      {result && (
        <div className="mt-4 border border-slate-800 rounded-2xl p-4 text-sm bg-slate-900/60">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-slate-400">Result:</span>
            <span className="text-lg font-semibold">
              {result.output_value}
            </span>
          </div>
          <StepExplanation steps={result.steps} />
        </div>
      )}
    </div>
  );
};

export default Converter;
