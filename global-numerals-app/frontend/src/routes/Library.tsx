import React, { useEffect, useState } from "react";
import SystemCard, { NumeralSystem } from "../components/SystemCard";

const API_BASE = "http://localhost:8000";

const Library: React.FC = () => {
  const [systems, setSystems] = useState<NumeralSystem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/systems`)
      .then((r) => r.json())
      .then((data) => setSystems(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-sm">Loading systems…</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Numeral System Library</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {systems.map((s) => (
          <SystemCard key={s.id} system={s} />
        ))}
      </div>
    </div>
  );
};

export default Library;
