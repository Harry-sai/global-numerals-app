import React from "react";
import { Link, NavLink } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg">
            Global Numeral Systems
          </Link>
          <nav className="flex gap-4 text-sm">
            <NavLink
              to="/library"
              className={({ isActive }) =>
                isActive ? "text-emerald-400" : "text-slate-300"
              }
            >
              Library
            </NavLink>
            <NavLink
              to="/converter"
              className={({ isActive }) =>
                isActive ? "text-emerald-400" : "text-slate-300"
              }
            >
              Converter
            </NavLink>
            <NavLink
              to="/practice"
              className={({ isActive }) =>
                isActive ? "text-emerald-400" : "text-slate-300"
              }
            >
              Practice Zone
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6">{children}</main>
      <footer className="border-t border-slate-800 text-xs text-slate-500 py-3 text-center">
        Numeral systems • math × linguistics
      </footer>
    </div>
  );
};

export default Layout;
