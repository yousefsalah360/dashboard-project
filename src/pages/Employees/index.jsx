/**
 * @fileoverview Employees management page
 *
 * Design Pattern: Container / Presentational + Custom Hook
 */

import { useCrud, useSearch } from "../../hooks";
import { DEPARTMENTS, EMP_STATUS } from "../../constants";
import { getInitials, formatSalary } from "../../utils";
import {
  Avatar, Badge, Modal, Field, ModalActions,
  RowActions, TableToolbar, EmptyState, AvatarDesigner
} from "../../components/common";

const EMPTY_FORM = { name: "", dept: "Mathematics", position: "", salary: "", status: "Active", avatarConfig: null };
const SEARCH_KEYS = ["name", "dept", "position"];

// ── Table ──────────────────────────────────────────────────────────────────
function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden dark:bg-white/5 bg-slate-100">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
        <thead>
          <tr className="border-b border-white/10 dark:bg-white/5 bg-slate-100">
            {["Name", "Department", "Position", "Salary", "Joined", "Status", "Actions"].map((h) => (
              <th key={h} className="text-left text-xs dark:text-gray-500 text-gray-400 font-semibold uppercase tracking-wide px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.length === 0
            ? <EmptyState message="No employees match your search." />
            : employees.map((e, i) => (
              <tr key={e.id} className={`border-b border-white/5 hover:dark:bg-white/5 hover:bg-slate-100 transition-colors ${i % 2 ? "bg-white/[0.02]" : ""}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar initials={getInitials(e.name)} config={e.avatarConfig} />
                    <span className="dark:text-white text-slate-900 font-medium">{e.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 dark:text-gray-400 text-gray-500">{e.dept}</td>
                <td className="px-4 py-3 text-gray-300">{e.position}</td>
                <td className="px-4 py-3 text-emerald-400 font-mono font-semibold">{formatSalary(Number(e.salary))}</td>
                <td className="px-4 py-3 dark:text-gray-500 text-gray-400 font-mono text-xs">{e.joined}</td>
                <td className="px-4 py-3"><Badge status={e.status} /></td>
                <td className="px-4 py-3">
                  <RowActions onEdit={() => onEdit(e)} onDelete={() => onDelete(e.id)} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>
    </div>
  );
}

// ── Form Modal ─────────────────────────────────────────────────────────────
function EmployeeFormModal({ modal, form, setField, onClose, onSave }) {
  return (
    <Modal title={modal === "edit" ? "Edit Employee" : "Add Employee"} onClose={onClose}>
      <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
        <label className="text-xs dark:text-gray-400 text-gray-500 font-semibold uppercase tracking-wide">Avatar Design</label>
        <AvatarDesigner value={form.avatarConfig} onChange={(v) => setField("avatarConfig", v)} />
        <Field label="Full Name"        value={form.name}     onChange={(v) => setField("name",     v)} placeholder="James Thornton" />
        <Field label="Department"       value={form.dept}     onChange={(v) => setField("dept",     v)} options={DEPARTMENTS} />
        <Field label="Position"         value={form.position} onChange={(v) => setField("position", v)} placeholder="Senior Teacher" />
        <Field label="Annual Salary ($)"value={form.salary}   onChange={(v) => setField("salary",   v)} type="number" placeholder="55000" />
        <Field label="Status"           value={form.status}   onChange={(v) => setField("status",   v)} options={EMP_STATUS} />
        <ModalActions onCancel={onClose} onSave={onSave} />
      </div>
    </Modal>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function EmployeesPage() {
  const { items, modal, form, setField, openAdd, openEdit, closeModal, save, remove } =
    useCrud("employees", EMPTY_FORM);
  const { query, setQuery, filtered } = useSearch(items, SEARCH_KEYS);

  return (
    <div>
      <TableToolbar
        title="Employees"
        subtitle={`${filtered.length} staff member${filtered.length !== 1 ? "s" : ""}`}
        onAdd={openAdd}
        search={query}
        setSearch={setQuery}
      />
      <EmployeeTable employees={filtered} onEdit={openEdit} onDelete={remove} />
      {modal && <EmployeeFormModal modal={modal} form={form} setField={setField} onClose={closeModal} onSave={save} />}
    </div>
  );
}
