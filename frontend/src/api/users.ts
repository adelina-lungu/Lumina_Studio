import { http } from "./client";
import type { UserDto, ActionResponse } from "./types";

export const usersApi = {
  list: () =>
    http.get<UserDto[]>("/users"),

  getById: (id: number) =>
    http.get<UserDto>(`/users/${id}`),

  ban: (id: number) =>
    http.post<ActionResponse>(`/users/${id}/ban`),

  unban: (id: number) =>
    http.post<ActionResponse>(`/users/${id}/unban`),

  promote: (id: number) =>
    http.post<ActionResponse>(`/users/${id}/promote`),

  demote: (id: number) =>
    http.post<ActionResponse>(`/users/${id}/demote`),
};
