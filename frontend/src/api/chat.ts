import { http } from "./client";
import type {
  ChatConversationDto,
  SendChatMessageDto,
  ActionResponse,
} from "./types";

export const chatApi = {
  startConversation: (email: string, name: string) =>
    http.post<ChatConversationDto>(`/chat/start?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`),

  sendMessage: (conversationId: number, dto: SendChatMessageDto) =>
    http.post<ActionResponse>(`/chat/${conversationId}/messages`, dto),

  listConversations: () =>
    http.get<ChatConversationDto[]>("/chat"),

  getConversation: (id: number) =>
    http.get<ChatConversationDto>(`/chat/${id}`),

  markRead: (conversationId: number) =>
    http.post<ActionResponse>(`/chat/${conversationId}/read`),
};
