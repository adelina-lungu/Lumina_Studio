import { useEffect, useRef } from "react";
import type { ChatClient, ChatMessage } from "./useAdminChat";

interface Props {
  client: ChatClient;
  messages: ChatMessage[];
}

const getInitials = (name: string) =>
  name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" });

export default function MessageThread({ client, messages }: Props) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="flex items-center gap-3 border-b border-stone-800 px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-stone-950">
          {getInitials(client.name)}
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-100">{client.name}</p>
          <p className="text-xs text-stone-500">{client.email}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "studio" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[60%] rounded-lg px-4 py-3 ${
              msg.sender === "studio" ? "bg-gold-400 text-stone-950" : "border border-stone-800 bg-stone-900 text-stone-200"
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`mt-1 text-[10px] text-right ${msg.sender === "studio" ? "text-stone-950/50" : "text-stone-600"}`}>
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </>
  );
}
