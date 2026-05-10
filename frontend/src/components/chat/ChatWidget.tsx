import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useChatSession } from "./useChatSession";
import ChatPanel from "./ChatPanel";

export type { ChatMessage } from "./useChatSession";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, messages, sendMessage, unreadCount } = useChatSession(open);

  if (isAdmin) return null;

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gold-400 text-stone-950 shadow-lg shadow-gold-400/20 transition-all duration-300 hover:bg-gold-500 hover:scale-110 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
        >
          <MessageCircle size={24} />
          {user && unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {open && (
        <ChatPanel
          user={user}
          messages={messages}
          onClose={() => setOpen(false)}
          onSend={sendMessage}
        />
      )}
    </>
  );
}
