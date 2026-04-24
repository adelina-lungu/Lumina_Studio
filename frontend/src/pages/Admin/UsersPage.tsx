import { useCallback, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Users, Shield, ShieldOff, UserX, Search } from "lucide-react";
import { usersApi, useApiHandler } from "../../api";
import type { UserDto } from "../../api/types";

const ROLE_BADGE: Record<string, { text: string; className: string }> = {
  Owner: { text: "Owner", className: "border-gold-400/30 bg-gold-400/10 text-gold-400" },
  Admin: { text: "Admin", className: "border-purple-500/30 bg-purple-500/10 text-purple-400" },
  Client: { text: "Client", className: "border-stone-600/30 bg-stone-800/50 text-stone-400" },
};

export default function UsersPage() {
  const { isOwner } = useOutletContext<{ isOwner: boolean }>();
  const { call, addToast } = useApiHandler();
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    const res = await call(() => usersApi.list());
    if (res) setUsers(res);
    setLoading(false);
  }, [call]);

  useEffect(() => { load(); }, [load]);

  const handleBan = async (user: UserDto) => {
    const res = await call(() => usersApi.ban(user.id));
    if (res) { addToast("success", `${user.name} a fost banat.`); load(); }
  };

  const handlePromote = async (user: UserDto) => {
    const res = await call(() => usersApi.promote(user.id));
    if (res) { addToast("success", `${user.name} a fost promovat la Admin.`); load(); }
  };

  const handleDemote = async (user: UserDto) => {
    const res = await call(() => usersApi.demote(user.id));
    if (res) { addToast("success", `${user.name} a fost retrogradat la Client.`); load(); }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-6 py-8 md:px-10">
      <div className="mb-8 flex items-center gap-3">
        <Users size={24} className="text-gold-400" />
        <div>
          <h1 className="font-serif text-2xl font-semibold text-stone-100">Utilizatori</h1>
          <p className="mt-1 text-sm text-stone-500">Gestioneaza utilizatorii platformei.</p>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            placeholder="Cauta dupa nume sau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-stone-800 bg-stone-900/50 py-2.5 pl-10 pr-4 text-sm text-stone-100 placeholder:text-stone-600 focus:border-gold-400/50 focus:outline-none"
          />
        </div>
        <span className="text-sm text-stone-500">{filtered.length} utilizatori</span>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-5">
              <div className="h-4 w-1/3 rounded bg-stone-800" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-stone-800 px-6 py-14 text-center">
          <Users size={32} className="mx-auto mb-3 text-stone-700" />
          <p className="text-sm text-stone-500">Niciun utilizator gasit.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((u) => {
            const role = ROLE_BADGE[u.role] ?? ROLE_BADGE.Client;
            return (
              <div
                key={u.id}
                className="group flex items-center gap-4 rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-4 transition-colors hover:border-stone-700"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-800 text-xs font-bold text-stone-300">
                  {u.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-100">{u.name}</p>
                  <p className="text-xs text-stone-500">{u.email} &middot; {u.phone}</p>
                </div>

                <span className={`rounded border px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase ${role.className}`}>
                  {role.text}
                </span>

                <p className="hidden text-xs text-stone-600 sm:block">
                  {new Date(u.registeredOn).toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric" })}
                </p>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {u.role === "Client" && (
                    <button
                      onClick={() => handleBan(u)}
                      className="cursor-pointer rounded-lg border border-transparent p-2 text-stone-600 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                      title="Baneaza"
                    >
                      <UserX size={15} />
                    </button>
                  )}

                  {isOwner && u.role === "Client" && (
                    <button
                      onClick={() => handlePromote(u)}
                      className="cursor-pointer rounded-lg border border-transparent p-2 text-stone-600 hover:border-emerald-500/20 hover:bg-emerald-500/10 hover:text-emerald-400"
                      title="Promoveaza la Admin"
                    >
                      <Shield size={15} />
                    </button>
                  )}

                  {isOwner && u.role === "Admin" && (
                    <>
                      <button
                        onClick={() => handleDemote(u)}
                        className="cursor-pointer rounded-lg border border-transparent p-2 text-stone-600 hover:border-amber-500/20 hover:bg-amber-500/10 hover:text-amber-400"
                        title="Retrogradeaza la Client"
                      >
                        <ShieldOff size={15} />
                      </button>
                      <button
                        onClick={() => handleBan(u)}
                        className="cursor-pointer rounded-lg border border-transparent p-2 text-stone-600 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                        title="Baneaza"
                      >
                        <UserX size={15} />
                      </button>
                    </>
                  )}

                  {/* unban would be shown for banned users - the backend doesn't expose isBanned in the DTO list currently, but we keep the action available */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
