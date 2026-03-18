/**
 * @fileoverview Global application store
 *
 * Design Pattern: Flux / Command pattern
 *   • State is immutable — only actions produce new state.
 *   • Every mutation is expressed as a typed action object.
 *   • The reducer is a pure function: (state, action) → newState.
 *   • Components dispatch actions; they never mutate state directly.
 *
 * This keeps all domain state in one predictable tree, making time-travel
 * debugging, optimistic updates, and undo/redo trivial to add.
 */

import { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import {
  SEED_USERS, SEED_EMPLOYEES, SEED_STUDENTS, SEED_SCHOOLS,
} from "../constants";
import { nextId, todayISO, getInitials } from "../utils";

// ── Action Types ───────────────────────────────────────────────────────────
export const AT = Object.freeze({
  // Navigation & Theme
  SET_VIEW: "SET_VIEW",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  TOGGLE_THEME: "TOGGLE_THEME",

  // Generic CRUD actions — payload carries { resource, item/id }
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
});

// ── Initial State ──────────────────────────────────────────────────────────
const initialState = {
  view: "dashboard",
  sidebarOpen: true,
  theme: localStorage.getItem("theme") || "dark",
  users:     SEED_USERS,
  employees: SEED_EMPLOYEES,
  students:  SEED_STUDENTS,
  schools:   SEED_SCHOOLS,
};

// ── Reducer (pure function) ────────────────────────────────────────────────
function appReducer(state, action) {
  switch (action.type) {
    case AT.SET_VIEW:
      return { ...state, view: action.payload };

    case AT.TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case AT.TOGGLE_THEME: {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return { ...state, theme: newTheme };
    }

    case AT.CREATE: {
      const { resource, item } = action.payload;
      return { ...state, [resource]: [...state[resource], item] };
    }

    case AT.UPDATE: {
      const { resource, item } = action.payload;
      return {
        ...state,
        [resource]: state[resource].map((r) => (r.id === item.id ? { ...r, ...item } : r)),
      };
    }

    case AT.DELETE: {
      const { resource, id } = action.payload;
      return { ...state, [resource]: state[resource].filter((r) => r.id !== id) };
    }

    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────────────────────
const StoreContext = createContext(null);

// ── Provider ───────────────────────────────────────────────────────────────
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // ── Action creators (memoised) ─────────────────────────────────────────
  const setView       = useCallback((v)  => dispatch({ type: AT.SET_VIEW, payload: v }), []);
    const toggleSidebar = useCallback(()   => dispatch({ type: AT.TOGGLE_SIDEBAR }), []);
    const toggleTheme   = useCallback(()   => dispatch({ type: AT.TOGGLE_THEME }), []);

  /**
   * Add a new record.
   * @param {'users'|'employees'|'students'|'schools'} resource
   * @param {Object} fields - Raw form values
   */
  const createRecord = useCallback((resource, fields) => {
    const item = {
      ...fields,
      id: nextId(),
      joined: todayISO(),
      ...(resource === "users" ? { avatar: getInitials(fields.name) } : {}),
    };
    dispatch({ type: AT.CREATE, payload: { resource, item } });
  }, []);

  /**
   * Overwrite fields on an existing record.
   * @param {'users'|'employees'|'students'|'schools'} resource
   * @param {number} id
   * @param {Object} fields
   */
  const updateRecord = useCallback((resource, id, fields) => {
    dispatch({ type: AT.UPDATE, payload: { resource, item: { id, ...fields } } });
  }, []);

  /**
   * Remove a record by id.
   * @param {'users'|'employees'|'students'|'schools'} resource
   * @param {number} id
   */
  const deleteRecord = useCallback((resource, id) => {
    dispatch({ type: AT.DELETE, payload: { resource, id } });
  }, []);

  // Apply theme to HTML root
  useEffect(() => {
    if (state.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.theme]);

  return (
    <StoreContext.Provider
      value={{ state, setView, toggleSidebar, toggleTheme, createRecord, updateRecord, deleteRecord }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// ── Consumer hook ──────────────────────────────────────────────────────────
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
