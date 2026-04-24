import { User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useAdminChat } from "./useAdminChat";
import ConversationList from "./ConversationList";
import MessageThread from "./MessageThread";
import MessageInput from "./MessageInput";

export default function AdminSupportPage() {
  const { user } = useAuth();
  const chat = useAdminChat();

  if (!user) return null;

  return (
    <div className="flex h-full min-h-[calc(100vh-49px)] lg:min-h-screen">
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
            <MessageInput onSend={(text) => chat.sendReply(text)} />
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
