import { http } from "./client";
import type {
  ChatConversationDto,
  ChatMessageDto,
  SendChatMessageDto,
  ActionResponse,
} from "./types";

export const chatApi = {
  myConversation: () =>
    http.get<ChatConversationDto>("/chat/mine"),

  sendMessage: (dto: SendChatMessageDto) =>
    http.post<ChatMessageDto>("/chat/messages", dto),

  listConversations: () =>
    http.get<ChatConversationDto[]>("/chat/conversations"),

  getConversation: (id: number) =>
    http.get<ChatConversationDto>(`/chat/conversations/${id}`),

  replyToConversation: (id: number, dto: SendChatMessageDto) =>
    http.post<ChatMessageDto>(`/chat/conversations/${id}/messages`, dto),

  markRead: (conversationId: number) =>
    http.patch<ActionResponse>(`/chat/conversations/${conversationId}/read`),
};
