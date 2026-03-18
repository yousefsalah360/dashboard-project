/**
 * @fileoverview Reusable React hooks
 *
 * Design Pattern: Custom Hook (encapsulate & reuse stateful logic)
 *   • useCrud  — wraps store CRUD operations + local modal/form state
 *   • useSearch — controlled search with debounce
 *
 * Components stay thin: they own only presentation decisions.
 * All orchestration logic lives here.
 */

import { useState, useCallback, useEffect, useRef } from "react";
import { useStore } from "../store";
import { fuzzyFilter } from "../utils";

// ── useCrud ────────────────────────────────────────────────────────────────
/**
 * Provides full CRUD workflow for a named resource:
 *   open add-modal → fill form → save (create or update)
 *   open edit-modal → fill form → save (update)
 *   delete with optimistic removal
 *
 * @param {string} resource  - Key in the store (e.g. "users")
 * @param {Object} emptyForm - Default form shape for the add flow
 * @returns {{
 *   items: any[],
 *   modal: 'add'|'edit'|null,
 *   form: Object,
 *   setField: (key: string, value: any) => void,
 *   openAdd: () => void,
 *   openEdit: (record: Object) => void,
 *   closeModal: () => void,
 *   save: () => void,
 *   remove: (id: number) => void,
 * }}
 */
export function useCrud(resource, emptyForm) {
  const { state, createRecord, updateRecord, deleteRecord } = useStore();

  const [modal,   setModal]   = useState(null);   // null | 'add' | 'edit'
  const [editId,  setEditId]  = useState(null);
  const [form,    setForm]    = useState(emptyForm);

  const setField = useCallback(
    (key, value) => setForm((prev) => ({ ...prev, [key]: value })),
    []
  );

  const openAdd = useCallback(() => {
    setForm(emptyForm);
    setEditId(null);
    setModal("add");
  }, [emptyForm]);

  const openEdit = useCallback((record) => {
    // Coerce all values to strings for controlled inputs
    const stringified = Object.fromEntries(
      Object.entries(record).map(([k, v]) => [k, String(v)])
    );
    setForm({ ...emptyForm, ...stringified });
    setEditId(record.id);
    setModal("edit");
  }, [emptyForm]);

  const closeModal = useCallback(() => setModal(null), []);

  const save = useCallback(() => {
    if (modal === "edit") {
      updateRecord(resource, editId, form);
    } else {
      createRecord(resource, form);
    }
    setModal(null);
  }, [modal, editId, form, resource, createRecord, updateRecord]);

  const remove = useCallback(
    (id) => deleteRecord(resource, id),
    [resource, deleteRecord]
  );

  return {
    items: state[resource],
    modal,
    form,
    setField,
    openAdd,
    openEdit,
    closeModal,
    save,
    remove,
  };
}

// ── useSearch ──────────────────────────────────────────────────────────────
/**
 * Controlled search with optional debounce.
 *
 * @param {any[]}    items   - Full item list
 * @param {string[]} keys    - Object keys to search against
 * @param {number}   [delay] - Debounce delay in ms (default 200)
 * @returns {{ query: string, setQuery: Function, filtered: any[] }}
 */
export function useSearch(items, keys, delay = 200) {
  const [query,    setQuery]    = useState("");
  const [debounced, setDebounced] = useState("");
  const timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDebounced(query), delay);
    return () => clearTimeout(timer.current);
  }, [query, delay]);

  const filtered = fuzzyFilter(items, debounced, keys);

  return { query, setQuery, filtered };
}
