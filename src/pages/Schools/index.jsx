/**
 * @fileoverview Schools & Institutions management page
 *
 * Design Pattern: Container / Presentational + Custom Hook
 * Uses a card-grid layout instead of a table — shows how the same
 * CRUD hook composes with a completely different presentation layer.
 */

import { useCrud, useSearch } from "../../hooks";
import { SCH_STATUS } from "../../constants";
import { formatNumber, starString } from "../../utils";
import {
  Badge, Modal, Field, ModalActions, TableToolbar,
} from "../../components/common";

const EMPTY_FORM = {
  name: "", city: "", students: "", employees: "", founded: "", rating: "", status: "Active",
};
const SEARCH_KEYS = ["name", "city"];

// ── School Card ────────────────────────────────────────────────────────────
function SchoolCard({ school, onEdit, onDelete }) {
  const { name, city, students, employees, founded, rating, status } = school;
  return (
    <div className="rounded-2xl border border-white/10 dark:bg-white/5 bg-slate-100 p-5 hover:border-white/20 transition-all flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="dark:text-white text-slate-900 font-bold leading-tight">{name}</h3>
          <p className="dark:text-gray-400 text-gray-500 text-sm mt-0.5">📍 {city}</p>
        </div>
        <Badge status={status} />
      </div>

      <div className="text-amber-400 text-sm">
        {starString(Number(rating))}
        <span className="dark:text-gray-500 text-gray-400 text-xs ml-1.5">{Number(rating).toFixed(1)}</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Students",  value: formatNumber(students),  color: "#6366f1" },
          { label: "Staff",     value: formatNumber(employees), color: "#10b981" },
          { label: "Founded",   value: founded,                 color: "#f59e0b" },
        ].map(({ label, value, color }) => (
          <div key={label} className="dark:bg-white/5 bg-slate-100 rounded-xl p-2.5 text-center">
            <div className="font-bold text-sm tabular-nums" style={{ color }}>{value}</div>
            <div className="dark:text-gray-500 text-gray-400 text-xs mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={onEdit}
          className="flex-1 text-xs dark:bg-white/5 bg-slate-100 hover:bg-indigo-600/30 border border-white/10 hover:border-indigo-500/50 text-gray-300 hover:text-indigo-300 py-1.5 rounded-lg transition-all"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 text-xs dark:bg-white/5 bg-slate-100 hover:bg-red-600/30 border border-white/10 hover:border-red-500/50 text-gray-300 hover:text-red-300 py-1.5 rounded-lg transition-all"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

// ── Form Modal ─────────────────────────────────────────────────────────────
function SchoolFormModal({ modal, form, setField, onClose, onSave }) {
  return (
    <Modal title={modal === "edit" ? "Edit School" : "Add School"} onClose={onClose}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Field label="School Name" value={form.name} onChange={(v) => setField("name", v)} placeholder="Northgate Academy" />
        </div>
        <Field label="City"          value={form.city}      onChange={(v) => setField("city",      v)} placeholder="Chicago" />
        <Field label="Founded Year"  value={form.founded}   onChange={(v) => setField("founded",   v)} type="number" placeholder="2000" />
        <Field label="Total Students"value={form.students}  onChange={(v) => setField("students",  v)} type="number" placeholder="800" />
        <Field label="Employees"     value={form.employees} onChange={(v) => setField("employees", v)} type="number" placeholder="60" />
        <Field label="Rating (1–5)"  value={form.rating}    onChange={(v) => setField("rating",    v)} type="number" placeholder="4.2" />
        <Field label="Status"        value={form.status}    onChange={(v) => setField("status",    v)} options={SCH_STATUS} />
        <div className="col-span-2">
          <ModalActions onCancel={onClose} onSave={onSave} />
        </div>
      </div>
    </Modal>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function SchoolsPage() {
  const { items, modal, form, setField, openAdd, openEdit, closeModal, save, remove } =
    useCrud("schools", EMPTY_FORM);
  const { query, setQuery, filtered } = useSearch(items, SEARCH_KEYS);

  return (
    <div>
      <TableToolbar
        title="Schools & Institutions"
        subtitle={`${filtered.length} institution${filtered.length !== 1 ? "s" : ""}`}
        onAdd={openAdd}
        search={query}
        setSearch={setQuery}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0
          ? <p className="dark:text-gray-500 text-gray-400 text-sm col-span-full text-center py-12">No schools match your search.</p>
          : filtered.map((s) => (
            <SchoolCard
              key={s.id}
              school={s}
              onEdit={() => openEdit(s)}
              onDelete={() => remove(s.id)}
            />
          ))
        }
      </div>
      {modal && <SchoolFormModal modal={modal} form={form} setField={setField} onClose={closeModal} onSave={save} />}
    </div>
  );
}
