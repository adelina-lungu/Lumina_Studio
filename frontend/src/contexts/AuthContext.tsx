import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { authApi } from "../api/auth";
import { ApiError, setToken } from "../api/client";
import type { UserRole as ApiRole } from "../api/types";

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
  updateUser: (fields: Partial<Pick<User, "name" | "phone">>) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USER_KEY = "lumina_user";

function mapRole(apiRole: ApiRole): UserRole {
  return apiRole === "Admin" || apiRole === "Owner" ? "admin" : "client";
}

function toUser(dto: { id: number; name: string; email: string; phone: string; role: ApiRole }): User {
  return { id: dto.id, name: dto.name, email: dto.email, phone: dto.phone, role: mapRole(dto.role) };
}

function cacheUser(u: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(u));
}

function extractError(err: unknown): string {
  if (err instanceof ApiError) {
    if (typeof err.body === "object" && err.body && "message" in err.body) {
      return (err.body as { message: string }).message;
    }
    if (err.status === 401) return "Email sau parola incorecta.";
    if (err.status === 409) return "Acest email este deja inregistrat.";
    return `Eroare ${err.status}`;
  }
  if (err instanceof TypeError && err.message === "Failed to fetch") {
    return "Nu s-a putut conecta la server.";
  }
  return "A aparut o eroare neasteptata.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restore = async () => {
      const token = localStorage.getItem("lumina_token");
      if (token) {
        try {
          const dto = await authApi.me();
          const u = toUser(dto);
          setUser(u);
          cacheUser(u);
          setLoading(false);
          return;
        } catch {
          setToken(null);
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
      const u = toUser(res.user);
      setUser(u);
      cacheUser(u);
      return null;
    } catch (err) {
      return extractError(err);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, phone: string, password: string): Promise<string | null> => {
    try {
      const res = await authApi.register({ name, email, phone, password });
      const u = toUser(res.user);
      setUser(u);
      cacheUser(u);
      return null;
    } catch (err) {
      return extractError(err);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_KEY);
  }, []);

  const updateUser = useCallback(async (fields: Partial<Pick<User, "name" | "phone">>): Promise<string | null> => {
    if (!user) return "Nu esti autentificat.";
    try {
      const dto = { name: fields.name ?? user.name, phone: fields.phone ?? user.phone };
      await authApi.updateProfile(user.id, dto);
      const updated = { ...user, ...fields };
      setUser(updated);
      cacheUser(updated);
      return null;
    } catch (err) {
      return extractError(err);
    }
  }, [user]);

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
