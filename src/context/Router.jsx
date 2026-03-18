/**
 * @fileoverview Client-side view router
 *
 * Design Pattern: Strategy Pattern
 *   The `ROUTES` map is a Strategy registry: each view-id maps to a render
 *   strategy (component).  Switching views = swapping the active strategy.
 *   Adding a new page = register one new entry; zero other changes needed.
 */

import { useStore } from "../store";
import DashboardPage  from "../pages/Dashboard";
import UsersPage      from "../pages/Users";
import EmployeesPage  from "../pages/Employees";
import StudentsPage   from "../pages/Students";
import SchoolsPage    from "../pages/Schools";

// ── Strategy registry ──────────────────────────────────────────────────────
const ROUTES = {
  dashboard: DashboardPage,
  users:     UsersPage,
  employees: EmployeesPage,
  students:  StudentsPage,
  schools:   SchoolsPage,
};

// ── Fallback ───────────────────────────────────────────────────────────────
function NotFound({ view }) {
  return (
    <div className="flex items-center justify-center h-64">
      <p className="dark:text-gray-500 text-gray-400">No route registered for <code className="text-indigo-400">{view}</code>.</p>
    </div>
  );
}

// ── Router component ───────────────────────────────────────────────────────
export default function Router() {
  const { state } = useStore();
  const Page = ROUTES[state.view] ?? (() => <NotFound view={state.view} />);
  return (
    <div key={state.view} className="animate-fadeIn block w-full h-full">
      <Page />
    </div>
  );
}
