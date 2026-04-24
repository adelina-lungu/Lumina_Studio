import { useCallback, useEffect, useState } from "react";
import { Star, CheckCircle, Trash2 } from "lucide-react";
import { testimonialsApi, useApiHandler } from "../../api";
import type { TestimonialDto } from "../../api/types";

export default function AdminTestimonialsPage() {
  const { call, addToast } = useApiHandler();
  const [testimonials, setTestimonials] = useState<TestimonialDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  const load = useCallback(async () => {
    const res = await call(() => testimonialsApi.listAll());
    if (res) setTestimonials(res);
    setLoading(false);
  }, [call]);

  useEffect(() => { load(); }, [load]);

  const handleApprove = async (t: TestimonialDto) => {
    const res = await call(() => testimonialsApi.approve(t.id));
    if (res) {
      addToast("success", `Recenzia de la ${t.name} a fost aprobata.`);
      load();
    }
  };

  const handleDelete = async (t: TestimonialDto) => {
    const res = await call(() => testimonialsApi.delete(t.id));
    if (res !== null) {
      addToast("success", "Recenzie stearsa.");
      setTestimonials((prev) => prev.filter((i) => i.id !== t.id));
    }
  };

  const filtered = testimonials.filter((t) => {
    if (filter === "pending") return !t.isApproved;
    if (filter === "approved") return t.isApproved;
    return true;
  });

  const pendingCount = testimonials.filter((t) => !t.isApproved).length;

  return (
    <div className="px-6 py-8 md:px-10">
      <div className="mb-8 flex items-center gap-3">
        <Star size={24} className="text-gold-400" />
        <div>
          <h1 className="font-serif text-2xl font-semibold text-stone-100">Recenzii</h1>
          <p className="mt-1 text-sm text-stone-500">Aproba sau sterge recenziile clientilor.</p>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        {(["all", "pending", "approved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f
                ? "bg-gold-400/10 text-gold-400 border border-gold-400/20"
                : "text-stone-500 border border-stone-800 hover:text-stone-300"
            }`}
          >
            {f === "all" ? `Toate (${testimonials.length})` : f === "pending" ? `In Asteptare (${pendingCount})` : `Aprobate (${testimonials.length - pendingCount})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-5">
              <div className="h-4 w-1/2 rounded bg-stone-800" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-stone-800 px-6 py-14 text-center">
          <Star size={32} className="mx-auto mb-3 text-stone-700" />
          <p className="text-sm text-stone-500">Nicio recenzie gasita.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((t) => (
            <div key={t.id} className="group rounded-lg border border-stone-800 bg-stone-900/50 p-5">
              <div className="flex items-start gap-4">
                {t.avatarUrl ? (
                  <img src={t.avatarUrl} alt={t.name} className="h-10 w-10 rounded-full object-cover border border-stone-800" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-xs font-bold text-stone-400">
                    {t.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-stone-100">{t.name}</p>
                    <span className="text-xs text-stone-600">{t.role}</span>
                    {t.isApproved ? (
                      <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 uppercase">Aprobat</span>
                    ) : (
                      <span className="rounded border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400 uppercase">In asteptare</span>
                    )}
                  </div>
                  <div className="mt-1 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className={i < t.rating ? "fill-gold-400 text-gold-400" : "text-stone-700"} />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-stone-400">{t.text}</p>
                  <p className="mt-1 text-xs text-stone-600">
                    {new Date(t.createdOn).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!t.isApproved && (
                    <button
                      onClick={() => handleApprove(t)}
                      className="cursor-pointer rounded-lg border border-transparent p-2 text-stone-600 hover:border-emerald-500/20 hover:bg-emerald-500/10 hover:text-emerald-400"
                      title="Aproba"
                    >
                      <CheckCircle size={15} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(t)}
                    className="cursor-pointer rounded-lg border border-transparent p-2 text-stone-600 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                    title="Sterge"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
