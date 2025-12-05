import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold mb-2">
          Explore how cultures encode numbers.
        </h1>
        <p className="text-slate-200 max-w-2xl text-sm">
          This app lets you browse global numeral systems, convert between Arabic
          numbers and cultural representations, and solve Olympiad-style
          puzzles that blend mathematics with linguistics.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3 text-sm">
        <Link
          to="/library"
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-emerald-500 transition"
        >
          <h2 className="font-semibold mb-1">Numeral System Library</h2>
          <p className="text-slate-300">
            Learn base structure, morphology, and cultural context across
            numeral systems.
          </p>
        </Link>

        <Link
          to="/converter"
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-emerald-500 transition"
        >
          <h2 className="font-semibold mb-1">Interactive Converter</h2>
          <p className="text-slate-300">
            Convert numbers back and forth with step-by-step reasoning.
          </p>
        </Link>

        <Link
          to="/practice"
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-emerald-500 transition"
        >
          <h2 className="font-semibold mb-1">Practice Zone</h2>
          <p className="text-slate-300">
            Train with Linguistics Olympiad-style puzzles focused on numeral
            patterns.
          </p>
        </Link>
      </section>
    </div>
  );
};

export default Home;
