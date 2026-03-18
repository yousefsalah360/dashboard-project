/**
 * @fileoverview Dashboard overview page
 *
 * Design Pattern: Page Component (smart) + Presentational children
 *   This page is the only component that knows about static chart data.
 *   It composes purely presentational StatCard, BarChart, LineChart,
 *   DonutChart, and an activity feed — none of which touch the store.
 */

import { StatCard } from "../../components/common";
import { BarChart, LineChart, DonutChart } from "../../components/charts";

// ── Static chart datasets (would come from an analytics API in production) ─
const ENROLLMENT = [
  { label: "Jan", value: 820 }, { label: "Feb", value: 870 },
  { label: "Mar", value: 910 }, { label: "Apr", value: 950 },
  { label: "May", value: 990 }, { label: "Jun", value: 1030 },
  { label: "Jul", value: 980 }, { label: "Aug", value: 1100 },
];

const REVENUE = [
  { label: "Q1", value: 124000 }, { label: "Q2", value: 138000 },
  { label: "Q3", value: 119000 }, { label: "Q4", value: 154000 },
];

const DEPARTMENTS = [
  { label: "Math", value: 18 }, { label: "Sci", value: 22 },
  { label: "Eng",  value: 15 }, { label: "Art",  value: 9 },
  { label: "IT",   value: 12 }, { label: "PE",    value: 7 },
];

const STUDENT_STATUS = [
  { label: "Enrolled",  value: 1147, color: "#6366f1" },
  { label: "Graduated", value: 320,  color: "#10b981" },
  { label: "Suspended", value: 45,   color: "#ef4444" },
  { label: "On Leave",  value: 88,   color: "#f59e0b" },
];

const ACTIVITY = [
  { text: "New student Eliot Nash enrolled in Grade 10",     time: "2m ago",  dot: "#6366f1" },
  { text: "Employee Yuki Tanaka status changed to On Leave", time: "18m ago", dot: "#f59e0b" },
  { text: "Northgate Academy updated annual report",         time: "1h ago",  dot: "#10b981" },
  { text: "5 new user accounts created by Admin",            time: "3h ago",  dot: "#6366f1" },
  { text: "Layla Hassan marked as Graduated",                time: "5h ago",  dot: "#a78bfa" },
  { text: "System backup completed successfully",            time: "8h ago",  dot: "#10b981" },
];

// ── Page ───────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🎓" label="Total Students" value="1,600"  change={12} color="#6366f1" />
        <StatCard icon="👨‍🏫" label="Employees"      value="349"    change={5}  color="#10b981" />
        <StatCard icon="🏫" label="Schools"        value="5"      change={0}  color="#f59e0b" />
        <StatCard icon="👤" label="Active Users"   value="24"     change={-3} color="#ef4444" />
      </div>

      {/* Enrollment trend + status donut */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-2xl border border-white/10 dark:bg-white/5 bg-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="dark:text-white text-slate-900 font-bold">Student Enrollment Trend</h3>
              <p className="dark:text-gray-500 text-gray-400 text-xs">Monthly — 2024</p>
            </div>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full font-semibold">
              +12% YoY
            </span>
          </div>
          <LineChart data={ENROLLMENT} color="#6366f1" />
        </div>

        <div className="rounded-2xl border border-white/10 dark:bg-white/5 bg-slate-100 p-5">
          <h3 className="dark:text-white text-slate-900 font-bold mb-1">Student Status</h3>
          <p className="dark:text-gray-500 text-gray-400 text-xs mb-4">Current distribution</p>
          <DonutChart segments={STUDENT_STATUS} />
        </div>
      </div>

      {/* Revenue + Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 dark:bg-white/5 bg-slate-100 p-5">
          <h3 className="dark:text-white text-slate-900 font-bold mb-1">Revenue by Quarter</h3>
          <p className="dark:text-gray-500 text-gray-400 text-xs mb-4">Annual 2024 (USD)</p>
          <BarChart data={REVENUE} color="#10b981" />
        </div>
        <div className="rounded-2xl border border-white/10 dark:bg-white/5 bg-slate-100 p-5">
          <h3 className="dark:text-white text-slate-900 font-bold mb-1">Staff by Department</h3>
          <p className="dark:text-gray-500 text-gray-400 text-xs mb-4">Head-count distribution</p>
          <BarChart data={DEPARTMENTS} color="#f59e0b" />
        </div>
      </div>

      {/* Activity feed */}
      <div className="rounded-2xl border border-white/10 dark:bg-white/5 bg-slate-100 p-5">
        <h3 className="dark:text-white text-slate-900 font-bold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {ACTIVITY.map((a, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.dot }} />
              <span className="text-gray-300 text-sm flex-1">{a.text}</span>
              <span className="text-gray-600 text-xs flex-shrink-0 tabular-nums">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
