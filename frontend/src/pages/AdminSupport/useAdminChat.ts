import { useEffect, useState } from "react";
import type { ChatMessage } from "../../components/chat/ChatWidget";

export interface ChatClient {
  email: string;
  name: string;
}

const CLIENT_LIST_KEY = "lumina_chat_list";
const threadKey = (email: string) => `lumina_chat_${email}`;

const readJSON = <T,>(key: string, fallback: T): T => {
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : fallback;
};

export function useAdminChat() {
  const [clients, setClients] = useState<ChatClient[]>([]);
  const [selectedClient, setSelectedClient] = useState<ChatClient | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    setClients(readJSON<ChatClient[]>(CLIENT_LIST_KEY, []));
  }, []);

  useEffect(() => {
    if (!selectedClient) {
      setMessages([]);
      return;
    }
    setMessages(readJSON<ChatMessage[]>(threadKey(selectedClient.email), []));
  }, [selectedClient]);

  useEffect(() => {
    if (!selectedClient) return;
    const id = setInterval(() => {
      setMessages(readJSON<ChatMessage[]>(threadKey(selectedClient.email), []));
      setClients(readJSON<ChatClient[]>(CLIENT_LIST_KEY, []));
    }, 2000);
    return () => clearInterval(id);
  }, [selectedClient]);

  const sendReply = (text: string, senderName: string) => {
    if (!selectedClient) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: "studio",
      timestamp: Date.now(),
      senderName,
    };
    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem(threadKey(selectedClient.email), JSON.stringify(updated));
  };

  const getLastMessage = (email: string): ChatMessage | null => {
    const msgs = readJSON<ChatMessage[]>(threadKey(email), []);
    return msgs.length > 0 ? msgs[msgs.length - 1] : null;
  };

  const getUnreadCount = (email: string): number =>
    readJSON<ChatMessage[]>(threadKey(email), []).filter((m) => m.sender === "client").length;

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
