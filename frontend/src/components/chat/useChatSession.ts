import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { chatApi } from "../../api";
import type { ChatMessageDto } from "../../api/types";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "client" | "studio";
  timestamp: number;
  senderName?: string;
}

function toLocal(dto: ChatMessageDto): ChatMessage {
  return {
    id: String(dto.id),
    text: dto.text,
    sender: dto.sender === "Client" ? "client" : "studio",
    timestamp: new Date(dto.createdOn).getTime(),
    senderName: dto.senderName,
  };
}

export function useChatSession(open: boolean) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.role === "owner";

  const [conversationId, setConversationId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [seenStudioCount, setSeenStudioCount] = useState(0);

  const loadConversation = useCallback(async () => {
    if (!user || isAdmin) return;
    try {
      const conv = await chatApi.startConversation(user.email, user.name);
      setConversationId(conv.id);
      setMessages(conv.messages.map(toLocal));
    } catch {
      // server unavailable
    }
  }, [user, isAdmin]);

  useEffect(() => {
    if (open) loadConversation();
  }, [open, loadConversation]);

  useEffect(() => {
    if (!open || !conversationId || isAdmin) return;
    const id = setInterval(async () => {
      try {
        const conv = await chatApi.getConversation(conversationId);
        setMessages(conv.messages.map(toLocal));
      } catch {
        // silent
      }
    }, 5000);
    return () => clearInterval(id);
  }, [open, conversationId, isAdmin]);

  useEffect(() => {
    if (open) setSeenStudioCount(messages.filter((m) => m.sender === "studio").length);
  }, [open, messages]);

  useEffect(() => {
    if (open && conversationId) {
      chatApi.markRead(conversationId).catch(() => {});
    }
  }, [open, conversationId]);

  const sendMessage = async (text: string) => {
    if (!user || !conversationId) return;

    const optimistic: ChatMessage = {
      id: `tmp-${Date.now()}`,
      text,
      sender: "client",
      timestamp: Date.now(),
      senderName: user.name,
    };
    setMessages((prev) => [...prev, optimistic]);

    try {
      await chatApi.sendMessage(conversationId, { text });
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
    }
  };

  const studioCount = messages.filter((m) => m.sender === "studio").length;
  const unreadCount = Math.max(0, studioCount - seenStudioCount);

  return { user, isAdmin, messages, sendMessage, unreadCount };
}
