/**
 * @fileoverview Application-wide constants
 *
 * Design Pattern: Constant Object / Immutable Config
 * Nothing here is ever mutated — all runtime state lives in the store.
 */

// ── Navigation ─────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { id: "dashboard",  label: "Dashboard",  icon: "◈" },
  { id: "users",      label: "Users",      icon: "◎" },
  { id: "employees",  label: "Employees",  icon: "◉" },
  { id: "students",   label: "Students",   icon: "◇" },
  { id: "schools",    label: "Schools",    icon: "◆" },
];

// ── Seed / mock data ───────────────────────────────────────────────────────
export const SEED_USERS = [
  { id: 1, name: "Alexandra Reeve",  email: "a.reeve@edu.org",   role: "Admin",   status: "Active",   avatar: "AR", joined: "2023-01-15" },
  { id: 2, name: "Marcus Osei",      email: "m.osei@edu.org",    role: "Manager", status: "Active",   avatar: "MO", joined: "2023-03-22" },
  { id: 3, name: "Priya Nair",       email: "p.nair@edu.org",    role: "Staff",   status: "Inactive", avatar: "PN", joined: "2023-05-10" },
  { id: 4, name: "Chen Wei",         email: "c.wei@edu.org",     role: "Staff",   status: "Active",   avatar: "CW", joined: "2023-07-01" },
  { id: 5, name: "Sofia Delgado",    email: "s.delgado@edu.org", role: "Manager", status: "Active",   avatar: "SD", joined: "2023-09-14" },
];

export const SEED_EMPLOYEES = [
  { id: 1, name: "James Thornton", dept: "Mathematics", position: "Senior Teacher",  salary: 68000, joined: "2019-08-20", status: "Active"   },
  { id: 2, name: "Amara Diallo",   dept: "Sciences",    position: "Lab Coordinator", salary: 54000, joined: "2020-01-15", status: "Active"   },
  { id: 3, name: "Luke Patterson", dept: "English",     position: "Teacher",         salary: 52000, joined: "2021-06-01", status: "Active"   },
  { id: 4, name: "Yuki Tanaka",    dept: "Arts",        position: "Art Director",    salary: 49000, joined: "2022-03-10", status: "On Leave" },
  { id: 5, name: "Fatima Al-Amin", dept: "IT",          position: "Systems Admin",   salary: 71000, joined: "2020-11-25", status: "Active"   },
  { id: 6, name: "Carlos Rivera",  dept: "Sports",      position: "PE Coach",        salary: 47000, joined: "2023-01-08", status: "Active"   },
];

export const SEED_STUDENTS = [
  { id: 1, name: "Eliot Nash",     grade: "Grade 10", section: "A", gpa: 3.8, status: "Enrolled",  guardian: "Helen Nash",    phone: "+1-555-0101" },
  { id: 2, name: "Zoe Winters",    grade: "Grade 11", section: "B", gpa: 3.5, status: "Enrolled",  guardian: "Mark Winters",  phone: "+1-555-0102" },
  { id: 3, name: "Aiden Park",     grade: "Grade 9",  section: "C", gpa: 2.9, status: "Enrolled",  guardian: "Ji-Woo Park",   phone: "+1-555-0103" },
  { id: 4, name: "Layla Hassan",   grade: "Grade 12", section: "A", gpa: 4.0, status: "Graduated", guardian: "Omar Hassan",   phone: "+1-555-0104" },
  { id: 5, name: "Noah Becker",    grade: "Grade 10", section: "B", gpa: 3.2, status: "Enrolled",  guardian: "Claire Becker", phone: "+1-555-0105" },
  { id: 6, name: "Isla Fernandez", grade: "Grade 11", section: "A", gpa: 3.7, status: "Enrolled",  guardian: "Rosa Fernandez",phone: "+1-555-0106" },
  { id: 7, name: "Owen Okafor",    grade: "Grade 9",  section: "D", gpa: 3.0, status: "Suspended", guardian: "Ngozi Okafor",  phone: "+1-555-0107" },
];

export const SEED_SCHOOLS = [
  { id: 1, name: "Northgate Academy",   city: "Chicago", students: 1240, employees: 89, founded: 2001, rating: 4.5, status: "Active"   },
  { id: 2, name: "Riverside High",       city: "Austin",  students:  980, employees: 74, founded: 1998, rating: 4.2, status: "Active"   },
  { id: 3, name: "Sunridge Institute",   city: "Miami",   students:  650, employees: 52, founded: 2010, rating: 3.9, status: "Active"   },
  { id: 4, name: "Crestwood Prep",       city: "Seattle", students:  430, employees: 38, founded: 2015, rating: 4.7, status: "Active"   },
  { id: 5, name: "Hillside College",     city: "Denver",  students: 1100, employees: 96, founded: 1995, rating: 4.1, status: "Inactive" },
];

// ── Dropdown option lists ──────────────────────────────────────────────────
export const ROLES        = ["Admin", "Manager", "Staff"];
export const USER_STATUS  = ["Active", "Inactive"];
export const EMP_STATUS   = ["Active", "Inactive", "On Leave"];
export const DEPARTMENTS  = ["Mathematics", "Sciences", "English", "Arts", "IT", "Sports", "Administration"];
export const GRADES       = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"];
export const SECTIONS     = ["A", "B", "C", "D"];
export const STU_STATUS   = ["Enrolled", "Graduated", "Suspended"];
export const SCH_STATUS   = ["Active", "Inactive"];
