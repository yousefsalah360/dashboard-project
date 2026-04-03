/**
 * @fileoverview Students management page
 *
 * Design Pattern: Container / Presentational + Custom Hook
 */

import { useCrud, useSearch } from "../../hooks";
import { GRADES, SECTIONS, STU_STATUS } from "../../constants";
import { getInitials, gpaColor } from "../../utils";
import {
  Avatar, Badge, Modal, Field, ModalActions,
  RowActions, TableToolbar, EmptyState, AvatarDesigner
} from "../../components/common";

const EMPTY_FORM = {
  name: "", grade: "Grade 9", section: "A",
  gpa: "", status: "Enrolled", guardian: "", phone: "",
  avatarConfig: null
};
const SEARCH_KEYS = ["name", "grade", "guardian"];

// ── Table ──────────────────────────────────────────────────────────────────
function StudentTable({ students, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden dark:bg-white/5 bg-slate-100">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
        <thead>
          <tr className="border-b border-white/10 dark:bg-white/5 bg-slate-100">
            {["Student", "Grade", "Sec", "GPA", "Guardian", "Phone", "Status", "Actions"].map((h) => (
              <th key={h} className="text-left text-xs dark:text-gray-500 text-gray-400 font-semibold uppercase tracking-wide px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.length === 0
            ? <EmptyState message="No students match your search." />
            : students.map((s, i) => (
              <tr key={s.id} className={`border-b border-white/5 hover:dark:bg-white/5 hover:bg-slate-100 transition-colors ${i % 2 ? "bg-white/[0.02]" : ""}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar initials={getInitials(s.name)} config={s.avatarConfig} />
                    <span className="dark:text-white text-slate-900 font-medium">{s.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 dark:text-gray-400 text-gray-500 text-xs">{s.grade}</td>
                <td className="px-4 py-3 dark:text-gray-500 text-gray-400 font-mono">{s.section}</td>
                <td className={`px-4 py-3 font-mono font-bold tabular-nums ${gpaColor(Number(s.gpa))}`}>
                  {Number(s.gpa).toFixed(1)}
                </td>
                <td className="px-4 py-3 dark:text-gray-400 text-gray-500">{s.guardian}</td>
                <td className="px-4 py-3 dark:text-gray-500 text-gray-400 text-xs font-mono">{s.phone}</td>
                <td className="px-4 py-3"><Badge status={s.status} /></td>
                <td className="px-4 py-3">
                  <RowActions onEdit={() => onEdit(s)} onDelete={() => onDelete(s.id)} />
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
function StudentFormModal({ modal, form, setField, onClose, onSave }) {
  return (
    <Modal title={modal === "edit" ? "Edit Student" : "Add Student"} onClose={onClose}>
      <div className="grid grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto pr-2">
        <div className="col-span-2 space-y-2">
          <label className="text-xs dark:text-gray-400 text-gray-500 font-semibold uppercase tracking-wide">Avatar Design</label>
          <AvatarDesigner value={form.avatarConfig} onChange={(v) => setField("avatarConfig", v)} />
        </div>
        <div className="col-span-2">
          <Field label="Full Name" value={form.name} onChange={(v) => setField("name", v)} placeholder="Jane Smith" />
        </div>
        <Field label="Grade"   value={form.grade}   onChange={(v) => setField("grade",   v)} options={GRADES} />
        <Field label="Section" value={form.section} onChange={(v) => setField("section", v)} options={SECTIONS} />
        <Field label="GPA"     value={form.gpa}     onChange={(v) => setField("gpa",     v)} type="number" placeholder="3.5" />
        <Field label="Status"  value={form.status}  onChange={(v) => setField("status",  v)} options={STU_STATUS} />
        <div className="col-span-2">
          <Field label="Guardian Name" value={form.guardian} onChange={(v) => setField("guardian", v)} placeholder="John Smith" />
        </div>
        <div className="col-span-2">
          <Field label="Phone" value={form.phone} onChange={(v) => setField("phone", v)} placeholder="+1-555-0100" />
        </div>
        <div className="col-span-2">
          <ModalActions onCancel={onClose} onSave={onSave} />
        </div>
      </div>
    </Modal>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function StudentsPage() {
  const { items, modal, form, setField, openAdd, openEdit, closeModal, save, remove } =
    useCrud("students", EMPTY_FORM);
  const { query, setQuery, filtered } = useSearch(items, SEARCH_KEYS);

  return (
    <div>
      <TableToolbar
        title="Students"
        subtitle={`${filtered.length} student${filtered.length !== 1 ? "s" : ""}`}
        onAdd={openAdd}
        search={query}
        setSearch={setQuery}
      />
      <StudentTable students={filtered} onEdit={openEdit} onDelete={remove} />
      {modal && <StudentFormModal modal={modal} form={form} setField={setField} onClose={closeModal} onSave={save} />}
    </div>
  );
}
