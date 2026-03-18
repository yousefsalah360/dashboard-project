/**
 * @fileoverview Atomic / common UI primitives
 *
 * Design Pattern: Atomic Design (atoms & molecules)
 *   Every component here is:
 *   • Presentational — zero business logic, zero store access
 *   • Compositional — accepts children / render-props where needed
 *   • Single-responsibility — does exactly one visual job
 */

import NiceAvatar from "react-nice-avatar";
export { AvatarDesigner } from "./AvatarDesigner";

// ── Avatar ─────────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "bg-violet-600", "bg-rose-600", "bg-emerald-600",
  "bg-amber-600",  "bg-sky-600",  "bg-pink-600",
];

export function Avatar({ initials = "?", size = "sm", config = null }) {
  const sz = size === "lg" ? "w-10 h-10 text-sm" : "w-8 h-8 text-xs";
  
  if (config) {
    return (
      <div className={`flex-shrink-0 flex items-center justify-center ${sz}`}>
        <NiceAvatar style={{ width: size === 'lg' ? '2.5rem' : '2rem', height: size === 'lg' ? '2.5rem' : '2rem' }} {...config} />
      </div>
    );
  }

  const color = AVATAR_COLORS[initials.charCodeAt(0) % AVATAR_COLORS.length];
  return (
    <div className={`${sz} ${color} rounded-full flex items-center justify-center font-bold dark:text-white text-slate-900 flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ── Badge ──────────────────────────────────────────────────────────────────
const BADGE_MAP = {
  Active:    "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Inactive:  "bg-gray-500/20   dark:text-gray-400 text-gray-500    border-gray-500/30",
  Enrolled:  "bg-blue-500/20   text-blue-300    border-blue-500/30",
  Graduated: "bg-violet-500/20 text-violet-300  border-violet-500/30",
  Suspended: "bg-red-500/20    text-red-400     border-red-500/30",
  "On Leave":"bg-amber-500/20  text-amber-300   border-amber-500/30",
  Admin:     "bg-rose-500/20   text-rose-300    border-rose-500/30",
  Manager:   "bg-indigo-500/20 text-indigo-300  border-indigo-500/30",
  Staff:     "bg-teal-500/20   text-teal-300    border-teal-500/30",
};

export function Badge({ status }) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${BADGE_MAP[status] ?? "dark:bg-white/10 bg-slate-200 dark:text-white text-slate-900/70 border-white/20"}`}>
      {status}
    </span>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────
export function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="dark:bg-slate-900 bg-white border border-white/10 rounded-2xl w-full max-w-lg mx-4 shadow-2xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="dark:text-white text-slate-900 font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="dark:text-gray-400 text-gray-500 hover:dark:text-white hover:text-slate-900 transition-colors text-xl leading-none">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ── Form Field ─────────────────────────────────────────────────────────────
const INPUT_CLS =
  "w-full dark:bg-white/5 bg-slate-100 border border-white/10 rounded-xl px-3 py-2 dark:text-white text-slate-900 text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-600";

export function Field({ label, value, onChange, type = "text", options, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs dark:text-gray-400 text-gray-500 font-semibold uppercase tracking-wide">{label}</label>
      {options
        ? (
          <select value={value} onChange={(e) => onChange(e.target.value)} className={INPUT_CLS}>
            {options.map((o) => <option key={o} value={o} className="bg-slate-800">{o}</option>)}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={INPUT_CLS}
          />
        )
      }
    </div>
  );
}

// ── Modal Action Buttons ───────────────────────────────────────────────────
export function ModalActions({ onCancel, onSave, saveLabel = "Save" }) {
  return (
    <div className="flex gap-3 pt-2">
      <button
        onClick={onCancel}
        className="flex-1 py-2.5 rounded-xl border border-white/10 dark:text-gray-400 text-gray-500 hover:dark:text-white hover:text-slate-900 text-sm transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 dark:text-white text-slate-900 font-semibold text-sm transition-colors"
      >
        {saveLabel}
      </button>
    </div>
  );
}

// ── Table Row Actions ──────────────────────────────────────────────────────
export function RowActions({ onEdit, onDelete }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="text-xs dark:bg-white/5 bg-slate-100 hover:bg-indigo-600/30 border border-white/10 hover:border-indigo-500/50 text-gray-300 hover:text-indigo-300 px-2.5 py-1 rounded-lg transition-all"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="text-xs dark:bg-white/5 bg-slate-100 hover:bg-red-600/30 border border-white/10 hover:border-red-500/50 text-gray-300 hover:text-red-300 px-2.5 py-1 rounded-lg transition-all"
      >
        Del
      </button>
    </div>
  );
}

// ── Table Toolbar ──────────────────────────────────────────────────────────
export function TableToolbar({ title, subtitle, onAdd, search, setSearch }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
      <div>
        <h2 className="dark:text-white text-slate-900 font-black text-xl">{title}</h2>
        {subtitle && <p className="dark:text-gray-500 text-gray-400 text-sm">{subtitle}</p>}
      </div>
      <div className="flex gap-2">
        <div className="relative">
          <span className="absolute left-3 top-2.5 dark:text-gray-400 text-gray-500 text-sm select-none">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="dark:bg-white/5 bg-slate-100 border border-white/10 rounded-xl pl-8 pr-3 py-2 dark:text-white text-slate-900 text-sm w-48 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          onClick={onAdd}
          className="bg-indigo-600 hover:bg-indigo-500 dark:text-white text-slate-900 px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5"
        >
          <span className="text-base leading-none">+</span> Add
        </button>
      </div>
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────
export function StatCard({ icon, label, value, change, color }) {
  const isPos = change >= 0;
  return (
    <div className="rounded-2xl border border-white/10 dark:bg-white/5 bg-slate-100 backdrop-blur-sm p-5 flex flex-col gap-3 hover:border-white/20 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${isPos ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
          {isPos ? "▲" : "▼"} {Math.abs(change)}%
        </span>
      </div>
      <div>
        <div className="text-3xl font-black dark:text-white text-slate-900 tracking-tight">{value}</div>
        <div className="text-sm dark:text-gray-400 text-gray-500 mt-0.5">{label}</div>
      </div>
      <div className="h-1 rounded-full dark:bg-white/10 bg-slate-200">
        <div className="h-1 rounded-full transition-all" style={{ width: `${Math.min(100, Math.abs(change) * 3)}%`, background: color }} />
      </div>
    </div>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────
export function EmptyState({ message = "No records found." }) {
  return (
    <tr>
      <td colSpan={99} className="text-center py-12 dark:text-gray-500 text-gray-400 text-sm">{message}</td>
    </tr>
  );
}
