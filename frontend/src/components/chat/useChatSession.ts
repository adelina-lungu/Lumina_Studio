import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "client" | "studio";
  timestamp: number;
  senderName?: string;
}

const CLIENT_LIST_KEY = "lumina_chat_list";

function registerChat(email: string, name: string) {
  const raw = localStorage.getItem(CLIENT_LIST_KEY) || "[]";
  const list = JSON.parse(raw) as Array<{ email: string; name: string }>;
  if (!list.some((c) => c.email === email)) {
    list.push({ email, name });
    localStorage.setItem(CLIENT_LIST_KEY, JSON.stringify(list));
  }
}

export function useChatSession(open: boolean) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const storageKey = user ? `lumina_chat_${user.email}` : null;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [seenStudioCount, setSeenStudioCount] = useState(0);

  useEffect(() => {
    if (!storageKey || isAdmin) {
      setMessages([]);
      return;
    }
    const saved = localStorage.getItem(storageKey);
    setMessages(saved ? JSON.parse(saved) : []);
  }, [storageKey, isAdmin]);

  useEffect(() => {
    if (!storageKey || isAdmin) return;
    const id = setInterval(() => {
      const saved = localStorage.getItem(storageKey);
      if (saved) setMessages(JSON.parse(saved));
    }, 2000);
    return () => clearInterval(id);
  }, [storageKey, isAdmin]);

  useEffect(() => {
    if (storageKey && !isAdmin && messages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey, isAdmin]);

  useEffect(() => {
    if (open) setSeenStudioCount(messages.filter((m) => m.sender === "studio").length);
  }, [open, messages]);

  const sendMessage = (text: string) => {
    if (!user) return;
    registerChat(user.email, user.name);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        sender: "client",
        timestamp: Date.now(),
        senderName: user.name,
      },
    ]);
  };

  const studioCount = messages.filter((m) => m.sender === "studio").length;
  const unreadCount = Math.max(0, studioCount - seenStudioCount);

  return { user, isAdmin, messages, sendMessage, unreadCount };
}
