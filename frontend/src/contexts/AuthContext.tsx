import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { authApi } from "../api/auth";
import { ApiError, setToken } from "../api/client";
import type { UserRole as ApiRole } from "../api/types";

export type UserRole = "owner" | "admin" | "client";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

export function isStaff(user: User | null): boolean {
  return user?.role === "admin" || user?.role === "owner";
}

export function isOwner(user: User | null): boolean {
  return user?.role === "owner";
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

function mapRole(apiRole: ApiRole): UserRole {
  if (apiRole === "Owner") return "owner";
  if (apiRole === "Admin") return "admin";
  return "client";
}

function toUser(dto: { id: number; name: string; email: string; phone: string; role: ApiRole }): User {
  return { id: dto.id, name: dto.name, email: dto.email, phone: dto.phone, role: mapRole(dto.role) };
}

const ERROR_MAP: Record<number, string> = {
  400: "Datele introduse nu sunt valide.",
  401: "Email sau parola incorecta.",
  403: "Nu ai permisiunea necesara.",
  409: "Acest email este deja inregistrat.",
  429: "Prea multe incercari. Asteapta putin.",
};

function extractError(err: unknown): string {
  if (err instanceof ApiError) {
    return ERROR_MAP[err.status] ?? `Eroare ${err.status}`;
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
          setUser(toUser(dto));
          setLoading(false);
          return;
        } catch {
          setToken(null);
        }
      }
      setLoading(false);
    };
    restore();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<string | null> => {
    try {
      const res = await authApi.login({ email, password });
      setUser(toUser(res.user));
      return null;
    } catch (err) {
      return extractError(err);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, phone: string, password: string): Promise<string | null> => {
    try {
      const res = await authApi.register({ name, email, phone, password });
      setUser(toUser(res.user));
      return null;
    } catch (err) {
      return extractError(err);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  const updateUser = useCallback(async (fields: Partial<Pick<User, "name" | "phone">>): Promise<string | null> => {
    if (!user) return "Nu esti autentificat.";
    try {
      const dto = { name: fields.name ?? user.name, phone: fields.phone ?? user.phone };
      await authApi.updateProfile(user.id, dto);
      setUser({ ...user, ...fields });
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
