import { useCallback, useEffect, useState } from "react";
import { HelpCircle, Plus, Edit3, Trash2, X, Check } from "lucide-react";
import { faqApi, useApiHandler } from "../../api";
import type { FaqItemDto, CreateFaqItemDto, UpdateFaqItemDto } from "../../api/types";

export default function AdminFaqPage() {
  const { call, addToast } = useApiHandler();
  const [items, setItems] = useState<FaqItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [createForm, setCreateForm] = useState<CreateFaqItemDto>({ question: "", answer: "", displayOrder: 0 });
  const [editForm, setEditForm] = useState<UpdateFaqItemDto | null>(null);

  const load = useCallback(async () => {
    const res = await call(() => faqApi.list());
    if (res) setItems(res);
    setLoading(false);
  }, [call]);

  useEffect(() => { load(); }, [load]);

  const validateFaq = (q: string, a: string): string | null => {
    if (!q.trim() || !a.trim()) return "Completeaza intrebarea si raspunsul.";
    if (q.trim().length < 5) return "Intrebarea trebuie sa aiba minim 5 caractere.";
    if (q.trim().length > 250) return "Intrebarea nu poate depasi 250 caractere.";
    if (a.trim().length < 5) return "Raspunsul trebuie sa aiba minim 5 caractere.";
    if (a.trim().length > 2000) return "Raspunsul nu poate depasi 2000 caractere.";
    return null;
  };

  const handleCreate = async () => {
    const err = validateFaq(createForm.question, createForm.answer);
    if (err) { addToast("error", err); return; }
    const res = await call(() => faqApi.create(createForm));
    if (res) {
      addToast("success", "Intrebare adaugata.");
      setShowCreate(false);
      setCreateForm({ question: "", answer: "", displayOrder: 0 });
      load();
    }
  };

  const startEdit = (item: FaqItemDto) => {
    setEditingId(item.id);
    setEditForm({ question: item.question, answer: item.answer, displayOrder: item.displayOrder, isActive: item.isActive });
  };

  const handleUpdate = async () => {
    if (!editForm || editingId === null) return;
    const err = validateFaq(editForm.question, editForm.answer);
    if (err) { addToast("error", err); return; }
    const res = await call(() => faqApi.update(editingId, editForm));
    if (res) {
      addToast("success", "Intrebare actualizata.");
      setEditingId(null);
      setEditForm(null);
      load();
    }
  };

  const handleDelete = async (item: FaqItemDto) => {
    const res = await call(() => faqApi.delete(item.id));
    if (res) {
      addToast("success", "Intrebare stearsa.");
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  return (
    <div className="px-6 py-8 md:px-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <HelpCircle size={24} className="text-gold-400" />
          <div>
            <h1 className="font-serif text-2xl font-semibold text-stone-100">FAQ</h1>
            <p className="mt-1 text-sm text-stone-500">Gestioneaza intrebarile frecvente.</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-gold-400/40 bg-gold-400/10 px-4 py-2.5 text-sm font-medium text-gold-400 transition-all hover:bg-gold-400/20"
        >
          {showCreate ? <X size={16} /> : <Plus size={16} />}
          {showCreate ? "Anuleaza" : "Adauga Intrebare"}
        </button>
      </div>

      {showCreate && (
        <div className="mb-6 rounded-lg border border-stone-800 bg-stone-900/50 p-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-400">Intrebare *</label>
            <input type="text" value={createForm.question} onChange={(e) => setCreateForm({ ...createForm, question: e.target.value })} maxLength={250}
              className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 placeholder:text-stone-600 focus:border-gold-400/50 focus:outline-none"
              placeholder="Ex: Cat dureaza o sedinta foto?" />
            <p className="mt-1 text-[11px] text-stone-600">{createForm.question.length}/250 (minim 5)</p>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-400">Raspuns *</label>
            <textarea value={createForm.answer} onChange={(e) => setCreateForm({ ...createForm, answer: e.target.value })} rows={3} maxLength={2000}
              className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 placeholder:text-stone-600 focus:border-gold-400/50 focus:outline-none resize-none"
              placeholder="Raspunsul la intrebare..." />
            <p className="mt-1 text-[11px] text-stone-600">{createForm.answer.length}/2000 (minim 5)</p>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs font-medium text-stone-400 mr-2">Ordine:</label>
              <input type="text" inputMode="numeric" value={createForm.displayOrder} onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); setCreateForm({ ...createForm, displayOrder: v === "" ? 0 : Number(v) }); }}
                className="w-20 rounded-lg border border-stone-800 bg-stone-900 py-1.5 px-3 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
            </div>
            <button onClick={handleCreate} className="cursor-pointer rounded-lg bg-gold-400 px-5 py-2.5 text-sm font-medium text-stone-950 hover:bg-gold-300">
              Salveaza
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-5">
              <div className="h-4 w-2/3 rounded bg-stone-800" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-stone-800 px-6 py-14 text-center">
          <HelpCircle size={32} className="mx-auto mb-3 text-stone-700" />
          <p className="text-sm text-stone-500">Nicio intrebare FAQ.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="group rounded-lg border border-stone-800 bg-stone-900/50 p-5">
              {editingId === item.id && editForm ? (
                <div className="space-y-3">
                  <input type="text" value={editForm.question} onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                    className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
                  <textarea value={editForm.answer} onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })} rows={3}
                    className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none resize-none" />
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-stone-400 cursor-pointer">
                      <input type="checkbox" checked={editForm.isActive} onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })} className="accent-gold-400" />
                      Activ
                    </label>
                    <button onClick={handleUpdate} className="cursor-pointer flex items-center gap-1 rounded-lg bg-gold-400 px-4 py-2 text-sm font-medium text-stone-950 hover:bg-gold-300">
                      <Check size={14} /> Salveaza
                    </button>
                    <button onClick={() => { setEditingId(null); setEditForm(null); }} className="cursor-pointer rounded-lg border border-stone-700 px-4 py-2 text-sm text-stone-400 hover:text-stone-100">
                      Anuleaza
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-stone-100">{item.question}</p>
                      {!item.isActive && (
                        <span className="rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-400 uppercase">Inactiv</span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-stone-400 line-clamp-2">{item.answer}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(item)} className="cursor-pointer rounded-lg border border-transparent p-2 text-stone-600 hover:border-gold-400/20 hover:text-gold-400">
                      <Edit3 size={15} />
                    </button>
                    <button onClick={() => handleDelete(item)} className="cursor-pointer rounded-lg border border-transparent p-2 text-stone-600 hover:border-red-500/20 hover:text-red-400">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
