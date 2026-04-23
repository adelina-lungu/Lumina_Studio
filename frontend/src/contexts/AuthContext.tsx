import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { authApi } from "../api/auth";
import { setToken } from "../api/client";

export type UserRole = "admin" | "client";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (name: string, email: string, phone: string, password: string) => Promise<string | null>;
  logout: () => void;
  updateUser: (fields: Partial<Pick<User, "name" | "phone">>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ADMIN_EMAILS = ["alex@lumina.md", "maria@lumina.md", "victor@lumina.md"];
const TOKEN_KEY = "lumina_token";
const USER_KEY = "lumina_user";
const USERS_KEY = "lumina_users";

type StoredUser = { id: number; name: string; email: string; phone: string; password: string; role: UserRole };

let nextId = 100;

function mockUsers(): StoredUser[] {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveUser(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restore = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        try {
          const dto = await authApi.me();
          const restored: User = {
            id: dto.id,
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
            role: dto.role === "Admin" || dto.role === "Owner" ? "admin" : "client",
          };
          setUser(restored);
          setLoading(false);
          return;
        } catch {
          // backend not available — fall through to localStorage
        }
      }

      const saved = localStorage.getItem(USER_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (!parsed.id) parsed.id = 0;
          setUser(parsed);
        } catch {
          localStorage.removeItem(USER_KEY);
        }
      }
      setLoading(false);
    };
    restore();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<string | null> => {
    try {
      const res = await authApi.login({ email, password });
      const loggedUser: User = {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        phone: res.user.phone,
        role: res.user.role === "Admin" || res.user.role === "Owner" ? "admin" : "client",
      };
      setUser(loggedUser);
      saveUser(loggedUser);
      return null;
    } catch {
      // backend not available — fallback to localStorage mock
    }

    const users = mockUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return "Email sau parola incorecta.";

    const loggedUser: User = { id: found.id, name: found.name, email: found.email, phone: found.phone, role: found.role };
    setUser(loggedUser);
    saveUser(loggedUser);
    return null;
  }, []);

  const register = useCallback(async (name: string, email: string, phone: string, password: string): Promise<string | null> => {
    try {
      const res = await authApi.register({ name, email, phone, password });
      const newUser: User = {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        phone: res.user.phone,
        role: res.user.role === "Admin" || res.user.role === "Owner" ? "admin" : "client",
      };
      setUser(newUser);
      saveUser(newUser);
      return null;
    } catch {
      // backend not available — fallback to localStorage mock
    }

    const users = mockUsers();
    if (users.some((u) => u.email === email)) return "Acest email este deja inregistrat.";

    const role: UserRole = ADMIN_EMAILS.includes(email) ? "admin" : "client";
    const id = nextId++;
    users.push({ id, name, email, phone, password, role });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const newUser: User = { id, name, email, phone, role };
    setUser(newUser);
    saveUser(newUser);
    return null;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_KEY);
  }, []);

  const updateUser = useCallback((fields: Partial<Pick<User, "name" | "phone">>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...fields };
      saveUser(updated);

      const users = mockUsers();
      const idx = users.findIndex((u) => u.email === prev.email);
      if (idx !== -1) {
        if (fields.name) users[idx].name = fields.name;
        if (fields.phone) users[idx].phone = fields.phone;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }

      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth trebuie folosit in interiorul AuthProvider");
  return ctx;
}
