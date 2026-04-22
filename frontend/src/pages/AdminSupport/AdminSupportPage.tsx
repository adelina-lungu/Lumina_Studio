import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../constants";
import { useAdminChat } from "./useAdminChat";
import ConversationList from "./ConversationList";
import MessageThread from "./MessageThread";
import MessageInput from "./MessageInput";

export default function AdminSupportPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const chat = useAdminChat();

  useEffect(() => {
    if (!user || user.role !== "admin") navigate(ROUTES.forbidden);
  }, [user, navigate]);

  if (!user || user.role !== "admin") return null;

  return (
    <div className="flex h-screen bg-stone-950 text-stone-100">
      <ConversationList
        clients={chat.clients}
        selectedClient={chat.selectedClient}
        onSelect={chat.setSelectedClient}
        getLastMessage={chat.getLastMessage}
        getUnreadCount={chat.getUnreadCount}
      />

      <div className="flex flex-1 flex-col">
        {chat.selectedClient ? (
          <>
            <MessageThread client={chat.selectedClient} messages={chat.messages} />
            <MessageInput onSend={(text) => chat.sendReply(text, user.name)} />
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
            <User size={48} className="text-stone-800 mb-4" />
            <p className="text-lg font-medium text-stone-400">Selecteaza o conversatie</p>
            <p className="mt-2 text-sm text-stone-600">Alege un client din lista din stanga pentru a-i raspunde.</p>
          </div>
        )}
      </div>
    </div>
  );
}
