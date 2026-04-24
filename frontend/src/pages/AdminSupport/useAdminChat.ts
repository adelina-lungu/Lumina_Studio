import { useEffect, useState, useCallback } from "react";
import { chatApi } from "../../api";
import type { ChatConversationDto } from "../../api/types";

export interface ChatClient {
  id: number;
  email: string;
  name: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: "client" | "studio";
  timestamp: number;
  senderName?: string;
}

function toClient(conv: ChatConversationDto): ChatClient {
  return { id: conv.id, email: conv.clientEmail, name: conv.clientName };
}

function toMessage(m: ChatConversationDto["messages"][number]): ChatMessage {
  return {
    id: String(m.id),
    text: m.text,
    sender: m.sender === "Client" ? "client" : "studio",
    timestamp: new Date(m.createdOn).getTime(),
    senderName: m.senderName,
  };
}

export function useAdminChat() {
  const [conversations, setConversations] = useState<ChatConversationDto[]>([]);
  const [selectedClient, setSelectedClient] = useState<ChatClient | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const loadConversations = useCallback(async () => {
    try {
      const data = await chatApi.listConversations();
      setConversations(data);
    } catch {
      // server unavailable
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    const id = setInterval(loadConversations, 5000);
    return () => clearInterval(id);
  }, [loadConversations]);

  useEffect(() => {
    if (!selectedClient) {
      setMessages([]);
      return;
    }
    const conv = conversations.find((c) => c.id === selectedClient.id);
    if (conv) setMessages(conv.messages.map(toMessage));
  }, [selectedClient, conversations]);

  useEffect(() => {
    if (selectedClient) chatApi.markRead(selectedClient.id).catch(() => {});
  }, [selectedClient]);

  const clients = conversations.map(toClient);

  const sendReply = async (text: string) => {
    if (!selectedClient) return;
    try {
      await chatApi.sendMessage(selectedClient.id, { text });
      const conv = await chatApi.getConversation(selectedClient.id);
      setMessages(conv.messages.map(toMessage));
    } catch {
      // silent
    }
  };

  const getLastMessage = (email: string): ChatMessage | null => {
    const conv = conversations.find((c) => c.clientEmail === email);
    if (!conv || conv.messages.length === 0) return null;
    return toMessage(conv.messages[conv.messages.length - 1]);
  };

  const getUnreadCount = (email: string): number => {
    const conv = conversations.find((c) => c.clientEmail === email);
    return conv?.unreadCount ?? 0;
  };

  return {
    clients,
    selectedClient,
    setSelectedClient,
    messages,
    sendReply,
    getLastMessage,
    getUnreadCount,
  };
}
