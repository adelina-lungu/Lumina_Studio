import { useCallback, useEffect, useState } from "react";
import { Mail, Eye, CheckCircle, Clock } from "lucide-react";
import { contactApi, useApiHandler } from "../../api";
import type { ContactMessageDto } from "../../api/types";

export default function AdminContactPage() {
  const { call, addToast } = useApiHandler();
  const [messages, setMessages] = useState<ContactMessageDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessageDto | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "resolved">("all");

  const load = useCallback(async () => {
    const res = await call(() => contactApi.list());
    if (res) setMessages(res);
    setLoading(false);
  }, [call]);

  useEffect(() => { load(); }, [load]);

  const handleMarkRead = async (msg: ContactMessageDto) => {
    const res = await call(() => contactApi.markRead(msg.id));
    if (res) {
      addToast("success", "Marcat ca citit.");
      load();
    }
  };

  const handleResolve = async (msg: ContactMessageDto) => {
    const res = await call(() => contactApi.markResolved(msg.id));
    if (res) {
      addToast("success", "Marcat ca rezolvat.");
      load();
    }
  };

  const filtered = messages.filter((m) => {
    if (filter === "unread") return !m.isRead;
    if (filter === "resolved") return m.isResolved;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="px-6 py-8 md:px-10">
      <div className="mb-8 flex items-center gap-3">
        <Mail size={24} className="text-gold-400" />
        <div>
          <h1 className="font-serif text-2xl font-semibold text-stone-100">Mesaje Contact</h1>
          <p className="mt-1 text-sm text-stone-500">Vizualizeaza mesajele primite din formularul de contact.</p>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        {(["all", "unread", "resolved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f
                ? "bg-gold-400/10 text-gold-400 border border-gold-400/20"
                : "text-stone-500 border border-stone-800 hover:text-stone-300"
            }`}
          >
            {f === "all" ? `Toate (${messages.length})` : f === "unread" ? `Necitite (${unreadCount})` : `Rezolvate (${messages.filter((m) => m.isResolved).length})`}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-5">
                  <div className="h-4 w-2/3 rounded bg-stone-800" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed border-stone-800 px-6 py-14 text-center">
              <Mail size={32} className="mx-auto mb-3 text-stone-700" />
              <p className="text-sm text-stone-500">Niciun mesaj gasit.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelected(msg)}
                  className={`w-full cursor-pointer rounded-lg border p-4 text-left transition-colors ${
                    selected?.id === msg.id
                      ? "border-gold-400/30 bg-gold-400/5"
                      : "border-stone-800 bg-stone-900/50 hover:border-stone-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-medium ${!msg.isRead ? "text-stone-100" : "text-stone-400"}`}>
                        {msg.name}
                      </p>
                      {!msg.isRead && <span className="h-2 w-2 rounded-full bg-gold-400" />}
                      {msg.isResolved && (
                        <CheckCircle size={12} className="text-emerald-400" />
                      )}
                    </div>
                    <span className="text-xs text-stone-600">
                      {new Date(msg.createdOn).toLocaleDateString("ro-RO", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-stone-500 truncate">{msg.subject}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <div className="hidden w-96 shrink-0 lg:block">
            <div className="sticky top-8 rounded-lg border border-stone-800 bg-stone-900/50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-stone-100">{selected.subject}</h3>
                <button
                  onClick={() => setSelected(null)}
                  className="cursor-pointer text-stone-600 hover:text-stone-400 text-xs"
                >
                  Inchide
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-stone-500">De la</p>
                  <p className="text-stone-300">{selected.name}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500">Email</p>
                  <p className="text-stone-300">{selected.email}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500">Telefon</p>
                  <p className="text-stone-300">{selected.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500">Data</p>
                  <p className="text-stone-300">
                    {new Date(selected.createdOn).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-stone-500 mb-1">Mesaj</p>
                  <p className="text-stone-300 whitespace-pre-wrap">{selected.message}</p>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                {!selected.isRead && (
                  <button
                    onClick={() => handleMarkRead(selected)}
                    className="cursor-pointer flex items-center gap-1.5 rounded-lg border border-stone-700 px-3 py-2 text-xs text-stone-400 hover:text-stone-100"
                  >
                    <Eye size={14} /> Marcheaza citit
                  </button>
                )}
                {!selected.isResolved && (
                  <button
                    onClick={() => handleResolve(selected)}
                    className="cursor-pointer flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-xs text-emerald-400 hover:bg-emerald-500/20"
                  >
                    <CheckCircle size={14} /> Rezolvat
                  </button>
                )}
                {selected.isRead && !selected.isResolved && (
                  <span className="flex items-center gap-1.5 text-xs text-stone-600">
                    <Clock size={14} /> Citit, nerezolvat
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
