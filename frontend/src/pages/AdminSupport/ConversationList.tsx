import { ArrowLeft, Inbox, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ChatClient } from "./useAdminChat";
import type { ChatMessage } from "../../components/chat/ChatWidget";
import { ROUTES } from "../../constants";

interface Props {
  clients: ChatClient[];
  selectedClient: ChatClient | null;
  onSelect: (c: ChatClient) => void;
  getLastMessage: (email: string) => ChatMessage | null;
  getUnreadCount: (email: string) => number;
}

const getInitials = (name: string) =>
  name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

const formatDate = (ts: number) =>
  new Date(ts).toLocaleDateString("ro-RO", { day: "numeric", month: "short" });

export default function ConversationList({ clients, selectedClient, onSelect, getLastMessage, getUnreadCount }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex w-80 flex-col border-r border-stone-800 lg:w-96">
      <div className="flex items-center justify-between border-b border-stone-800 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(ROUTES.home)} className="cursor-pointer text-stone-400 transition-colors hover:text-gold-400">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-serif text-lg font-semibold text-stone-100">Suport Chat</h1>
            <p className="text-[11px] text-stone-500">{clients.length} conversatii</p>
          </div>
        </div>
        <Inbox size={18} className="text-gold-400" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {clients.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <MessageCircle size={32} className="text-stone-700 mb-3" />
            <p className="text-sm text-stone-500">Nicio conversatie inca</p>
            <p className="mt-1 text-xs text-stone-600">Mesajele clientilor vor aparea aici.</p>
          </div>
        ) : (
          clients.map((client) => {
            const lastMsg = getLastMessage(client.email);
            const unread = getUnreadCount(client.email);
            const isSelected = selectedClient?.email === client.email;

            return (
              <button
                key={client.email}
                onClick={() => onSelect(client)}
                className={`flex w-full cursor-pointer items-center gap-3 border-b border-stone-800/50 px-4 py-4 text-left transition-all sm:px-6 ${
                  isSelected ? "bg-gold-400/5 border-l-2 border-l-gold-400" : "hover:bg-stone-900/50"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-800 text-xs font-bold text-stone-300">
                  {getInitials(client.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-stone-200 truncate">{client.name}</p>
                    {lastMsg && <span className="shrink-0 text-[10px] text-stone-600">{formatDate(lastMsg.timestamp)}</span>}
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-xs text-stone-500 truncate">
                      {lastMsg ? (lastMsg.sender === "studio" ? "Tu: " : "") + lastMsg.text : "Niciun mesaj"}
                    </p>
                    {unread > 0 && (
                      <span className="shrink-0 ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 text-[10px] font-bold text-stone-950">
                        {unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
