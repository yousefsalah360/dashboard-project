/**
 * @fileoverview Users management page
 *
 * Design Pattern: Container / Presentational + Custom Hook
 *   • The page component is a thin container that delegates all state and
 *     CRUD orchestration to `useCrud` and `useSearch`.
 *   • The table and modal are purely presentational fragments.
 *   • Adding a new column = one-line change; business logic is untouched.
 */

import { useCrud, useSearch } from "../../hooks";
import { ROLES, USER_STATUS } from "../../constants";
import { getInitials } from "../../utils";
import {
  Avatar, Badge, Modal, Field, ModalActions,
  RowActions, TableToolbar, EmptyState, AvatarDesigner
} from "../../components/common";

const EMPTY_FORM = { name: "", email: "", role: "Staff", status: "Active", avatarConfig: null };
const SEARCH_KEYS = ["name", "email", "role"];

// ── Table ──────────────────────────────────────────────────────────────────
function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden dark:bg-white/5 bg-slate-100">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
        <thead>
          <tr className="border-b border-white/10 dark:bg-white/5 bg-slate-100">
            {["User", "Email", "Role", "Status", "Joined", "Actions"].map((h) => (
              <th key={h} className="text-left text-xs dark:text-gray-500 text-gray-400 font-semibold uppercase tracking-wide px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.length === 0
            ? <EmptyState message="No users match your search." />
            : users.map((u, i) => (
              <tr key={u.id} className={`border-b border-white/5 hover:dark:bg-white/5 hover:bg-slate-100 transition-colors ${i % 2 ? "bg-white/[0.02]" : ""}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar initials={u.avatar || getInitials(u.name)} config={u.avatarConfig} />
                    <span className="dark:text-white text-slate-900 font-medium">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 dark:text-gray-400 text-gray-500">{u.email}</td>
                <td className="px-4 py-3"><Badge status={u.role} /></td>
                <td className="px-4 py-3"><Badge status={u.status} /></td>
                <td className="px-4 py-3 dark:text-gray-500 text-gray-400 font-mono text-xs">{u.joined}</td>
                <td className="px-4 py-3">
                  <RowActions onEdit={() => onEdit(u)} onDelete={() => onDelete(u.id)} />
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
function UserFormModal({ modal, form, setField, onClose, onSave }) {
  return (
    <Modal title={modal === "edit" ? "Edit User" : "Add User"} onClose={onClose}>
      <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
        <label className="text-xs dark:text-gray-400 text-gray-500 font-semibold uppercase tracking-wide">Avatar Design</label>
        <AvatarDesigner value={form.avatarConfig} onChange={(v) => setField("avatarConfig", v)} />
        <Field label="Full Name"  value={form.name}   onChange={(v) => setField("name",   v)} placeholder="Jane Doe" />
        <Field label="Email"      value={form.email}  onChange={(v) => setField("email",  v)} type="email" placeholder="jane@edu.org" />
        <Field label="Role"       value={form.role}   onChange={(v) => setField("role",   v)} options={ROLES} />
        <Field label="Status"     value={form.status} onChange={(v) => setField("status", v)} options={USER_STATUS} />
        <ModalActions onCancel={onClose} onSave={onSave} />
      </div>
    </Modal>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function UsersPage() {
  const { items, modal, form, setField, openAdd, openEdit, closeModal, save, remove } =
    useCrud("users", EMPTY_FORM);
  const { query, setQuery, filtered } = useSearch(items, SEARCH_KEYS);

  return (
    <div>
      <TableToolbar
        title="User Management"
        subtitle={`${filtered.length} record${filtered.length !== 1 ? "s" : ""}`}
        onAdd={openAdd}
        search={query}
        setSearch={setQuery}
      />
      <UserTable users={filtered} onEdit={openEdit} onDelete={remove} />
      {modal && <UserFormModal modal={modal} form={form} setField={setField} onClose={closeModal} onSave={save} />}
    </div>
  );
}
