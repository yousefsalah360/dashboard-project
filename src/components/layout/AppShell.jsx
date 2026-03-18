/**
 * @fileoverview Layout components
 *
 * Design Pattern: Composite + Container/Presentational split
 *   AppShell  — container: reads store, wires navigation
 *   Sidebar   — presentational: receives props, emits callbacks
 *   Header    — presentational: current view label + user avatar
 */

import { useStore } from "../../store";
import { NAV_ITEMS } from "../../constants";

// ── Sidebar ────────────────────────────────────────────────────────────────
function Sidebar({ open, currentView, onNav, onToggle }) {
  return (
    <aside
      className={`${open ? "w-60" : "w-16"} transition-all duration-300 flex-shrink-0 flex flex-col border-r dark:border-white/8 border-slate-200 dark:bg-slate-950 bg-slate-50/80 backdrop-blur-xl relative z-10`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b dark:border-white/8 border-slate-200">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center dark:text-white text-slate-900 font-black text-sm flex-shrink-0 shadow-lg shadow-indigo-900/50">
          E
        </div>
        {open && (
          <span className="dark:text-white text-slate-900 font-black tracking-tight text-lg">EduCore</span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            title={!open ? item.label : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              currentView === item.id
                ? "bg-indigo-600 dark:text-white text-slate-900 shadow-lg shadow-indigo-900/50"
                : "dark:text-gray-400 text-gray-500 hover:dark:text-white hover:text-slate-900 hover:dark:bg-white/5 hover:bg-slate-100"
            }`}
          >
            <span className="text-base flex-shrink-0">{item.icon}</span>
            {open && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="px-2 pb-4 border-t dark:border-white/8 border-slate-200 pt-3">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white text-xs py-2 rounded-xl transition-all"
        >
          {open ? "← Collapse" : "→"}
        </button>
      </div>
    </aside>
  );
}

// ── Header ─────────────────────────────────────────────────────────────────
function Header({ view, theme, onToggleTheme }) {
  const label = view === "dashboard" ? "Overview" : view.charAt(0).toUpperCase() + view.slice(1);
  const date  = new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b dark:border-white/8 border-slate-200 dark:bg-slate-950 bg-slate-50/60 backdrop-blur-xl flex-shrink-0">
      <h1 className="dark:text-white text-slate-900 font-black text-lg">{label}</h1>
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleTheme}
          className="p-1.5 rounded-full dark:hover:bg-white/10 hover:bg-slate-200 text-slate-500 dark:text-gray-400 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        <span className="text-xs dark:text-gray-500 text-gray-400 hidden sm:block">{date}</span>
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center dark:text-white text-slate-900 text-xs font-bold shadow-md">
          AD
        </div>
      </div>
    </header>
  );
}

// ── AppShell (Container) ───────────────────────────────────────────────────
export function AppShell({ children }) {
  const { state, setView, toggleSidebar, toggleTheme } = useStore();
  const { view, sidebarOpen, theme } = state;

  return (
    <div className="min-h-screen dark:bg-slate-950 bg-slate-50 flex" style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl" />
      </div>

      <Sidebar
        open={sidebarOpen}
        currentView={view}
        onNav={setView}
        onToggle={toggleSidebar}
      />

      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Header view={view} theme={theme} onToggleTheme={toggleTheme} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
