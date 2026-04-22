import { useState } from "react";
import { Send } from "lucide-react";

interface Props {
  onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: Props) {
  const [input, setInput] = useState("");

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
    <div className="border-t border-stone-800 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Scrie un raspuns..."
          className="flex-1 rounded-lg border border-stone-800 bg-stone-900/60 px-4 py-3 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors focus:border-gold-400/50"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
            input.trim() ? "bg-gold-400 text-stone-950 cursor-pointer hover:bg-gold-500" : "bg-stone-800/60 text-stone-600 cursor-not-allowed"
          }`}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
