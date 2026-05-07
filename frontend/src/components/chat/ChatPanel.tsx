import { useEffect, useRef, useState } from "react";
import { LogIn, MessageCircle, Send, X } from "lucide-react";
import type { User } from "../../contexts/AuthContext";
import type { ChatMessage } from "./useChatSession";

interface Props {
  user: User | null;
  messages: ChatMessage[];
  onClose: () => void;
  onSend: (text: string) => void;
}

const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" });

export default function ChatPanel({ user, messages, onClose, onSend }: Props) {
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[min(500px,80vh)] w-[min(360px,90vw)] flex-col overflow-hidden rounded-lg border border-stone-800 bg-stone-950 shadow-2xl animate-fade-in-up sm:right-10">
      <div className="flex items-center justify-between border-b border-stone-800 bg-stone-900/80 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-stone-950">LS</div>
          <div>
            <p className="text-sm font-semibold text-stone-100">Lumina Studio</p>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Online
            </p>
          </div>
        </div>
        <button onClick={onClose} className="cursor-pointer text-stone-500 transition-colors hover:text-stone-300">
          <X size={18} />
        </button>
      </div>

      {user ? (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageCircle size={32} className="text-stone-700 mb-3" />
                <p className="text-sm text-stone-500">Bine ai venit, {user.name.split(" ")[0]}!</p>
                <p className="mt-1 text-xs text-stone-600">Scrie-ne orice intrebare.</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-lg px-3.5 py-2.5 ${
                  msg.sender === "client" ? "bg-gold-400 text-stone-950" : "border border-stone-800 bg-stone-900 text-stone-200"
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`mt-1 text-xs text-right ${msg.sender === "client" ? "text-stone-950/50" : "text-stone-600"}`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="border-t border-stone-800 px-3 py-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Scrie un mesaj..."
                className="flex-1 rounded-lg border border-stone-800 bg-stone-900/60 px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors focus:border-gold-400/50"
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                  input.trim() ? "bg-gold-400 text-stone-950 cursor-pointer hover:bg-gold-500" : "bg-stone-800/60 text-stone-600 cursor-not-allowed"
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <LogIn size={32} className="text-stone-700 mb-4" />
          <p className="text-sm font-medium text-stone-300">Autentifica-te pentru a ne scrie</p>
          <p className="mt-2 text-xs text-stone-500">Mesajele tale vor fi salvate si vei primi raspuns de la echipa noastra.</p>
        </div>
      )}
    </div>
  );
}
