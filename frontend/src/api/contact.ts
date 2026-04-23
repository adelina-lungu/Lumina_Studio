import { http } from "./client";
import type {
  ContactMessageDto,
  CreateContactMessageDto,
  ActionResponse,
} from "./types";

export const contactApi = {
  send: (dto: CreateContactMessageDto) =>
    http.post<ActionResponse>("/contact", dto),

  list: () =>
    http.get<ContactMessageDto[]>("/contact"),

  markRead: (id: number) =>
    http.patch<ActionResponse>(`/contact/${id}/read`),

  markResolved: (id: number) =>
    http.patch<ActionResponse>(`/contact/${id}/resolve`),
};
