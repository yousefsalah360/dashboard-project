/**
 * @fileoverview API / Repository layer
 *
 * Design Pattern: Repository Pattern
 * All data-access is mediated through typed repository objects.
 * Consumers never call axios directly — they call a repository method.
 * Swapping the backend (REST → GraphQL, mock → real) only touches this file.
 *
 * In this demo the app operates fully offline using seed data from the store,
 * so every method is a no-op stub that resolves immediately.  When a real
 * backend is available, replace the stub bodies with axios calls.
 */

import axios from "axios";

// ── Axios instance (Singleton) ─────────────────────────────────────────────
const http = axios.create({
  baseURL: import.meta.env?.VITE_API_BASE_URL ?? "/api",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — attach JWT if present
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — unwrap `.data`, normalise errors
http.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err.response?.data?.message ?? err.message ?? "Unknown error";
    return Promise.reject(new Error(message));
  }
);

// ── Base Repository (Template Method pattern) ──────────────────────────────
class BaseRepository {
  /** @param {string} resource - REST resource segment, e.g. "users" */
  constructor(resource) {
    this.resource = resource;
  }

  async findAll()        { return http.get(`/${this.resource}`); }
  async findById(id)     { return http.get(`/${this.resource}/${id}`); }
  async create(payload)  { return http.post(`/${this.resource}`, payload); }
  async update(id, data) { return http.put(`/${this.resource}/${id}`, data); }
  async remove(id)       { return http.delete(`/${this.resource}/${id}`); }
}

// ── Concrete Repositories ──────────────────────────────────────────────────
class UserRepository extends BaseRepository {
  constructor() { super("users"); }
  // Domain-specific endpoint example:
  async changeRole(id, role) { return http.patch(`/users/${id}/role`, { role }); }
}

class EmployeeRepository extends BaseRepository {
  constructor() { super("employees"); }
  async byDepartment(dept) { return http.get(`/employees?dept=${dept}`); }
}

class StudentRepository extends BaseRepository {
  constructor() { super("students"); }
  async byGrade(grade) { return http.get(`/students?grade=${encodeURIComponent(grade)}`); }
}

class SchoolRepository extends BaseRepository {
  constructor() { super("schools"); }
  async stats(id) { return http.get(`/schools/${id}/stats`); }
}

// ── Exported singletons (Singleton pattern) ────────────────────────────────
export const userRepo     = new UserRepository();
export const employeeRepo = new EmployeeRepository();
export const studentRepo  = new StudentRepository();
export const schoolRepo   = new SchoolRepository();
