import { useCallback, useEffect, useState } from "react";
import { Camera, Edit3, Check, Globe, Instagram, Plus, Trash2 } from "lucide-react";
import { photographersApi, useApiHandler } from "../../api";
import type { PhotographerDto, CreatePhotographerDto, UpdatePhotographerDto } from "../../api/types";

const emptyCreate: CreatePhotographerDto = {
  name: "",
  specialty: "",
  bio: "",
  avatarUrl: "",
  coverUrl: "",
  instagramUrl: null,
  facebookUrl: null,
  websiteUrl: null,
  displayOrder: 0,
};

export default function PhotographersPage() {
  const { call, addToast } = useApiHandler();
  const [photographers, setPhotographers] = useState<PhotographerDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<UpdatePhotographerDto | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState<CreatePhotographerDto>(emptyCreate);

  const load = useCallback(async () => {
    const res = await call(() => photographersApi.listAll());
    if (res) setPhotographers(res);
    setLoading(false);
  }, [call]);

  useEffect(() => { load(); }, [load]);

  const startEdit = (p: PhotographerDto) => {
    setEditingId(p.id);
    setShowCreate(false);
    setForm({
      name: p.name,
      specialty: p.specialty,
      bio: p.bio,
      avatarUrl: p.avatarUrl,
      coverUrl: p.coverUrl,
      instagramUrl: p.instagramUrl,
      facebookUrl: p.facebookUrl,
      websiteUrl: p.websiteUrl,
      isActive: p.isActive,
      displayOrder: p.displayOrder,
    });
  };

  const cancelEdit = () => { setEditingId(null); setForm(null); };

  const handleSave = async () => {
    if (!form || editingId === null) return;
    const res = await call(() => photographersApi.update(editingId, form));
    if (res) {
      addToast("success", "Fotograf actualizat cu succes.");
      cancelEdit();
      load();
    }
  };

  const handleCreate = async () => {
    if (!createForm.name.trim()) return;
    const res = await call(() => photographersApi.create(createForm));
    if (res) {
      addToast("success", "Fotograf adaugat cu succes.");
      setShowCreate(false);
      setCreateForm(emptyCreate);
      load();
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Sigur vrei sa stergi fotograful "${name}"?`)) return;
    const res = await call(() => photographersApi.delete(id));
    if (res) {
      addToast("success", "Fotograf sters cu succes.");
      load();
    }
  };

  return (
    <div className="px-6 py-8 md:px-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Camera size={24} className="text-gold-400" />
          <div>
            <h1 className="font-serif text-2xl font-semibold text-stone-100">Fotografi</h1>
            <p className="mt-1 text-sm text-stone-500">Administreaza profilurile fotografilor.</p>
          </div>
        </div>
        <button
          onClick={() => { setShowCreate(!showCreate); cancelEdit(); }}
          className="cursor-pointer flex items-center gap-2 rounded-lg bg-gold-400 px-4 py-2.5 text-sm font-medium text-stone-950 hover:bg-gold-300"
        >
          <Plus size={16} /> Adauga Fotograf
        </button>
      </div>

      {showCreate && (
        <div className="mb-6 rounded-lg border border-gold-400/20 bg-stone-900/50 p-6 space-y-4">
          <h3 className="text-sm font-medium text-gold-400 uppercase tracking-wider">Fotograf Nou</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-400">Nume *</label>
              <input type="text" value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-400">Specialitate *</label>
              <input type="text" value={createForm.specialty} onChange={(e) => setCreateForm({ ...createForm, specialty: e.target.value })}
                className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-400">Avatar URL *</label>
              <input type="url" value={createForm.avatarUrl} onChange={(e) => setCreateForm({ ...createForm, avatarUrl: e.target.value })}
                className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-400">Cover URL</label>
              <input type="url" value={createForm.coverUrl} onChange={(e) => setCreateForm({ ...createForm, coverUrl: e.target.value })}
                className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-400">Bio</label>
            <textarea value={createForm.bio} onChange={(e) => setCreateForm({ ...createForm, bio: e.target.value })} rows={3}
              className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none resize-none" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-400">Instagram URL</label>
              <input type="url" value={createForm.instagramUrl ?? ""} onChange={(e) => setCreateForm({ ...createForm, instagramUrl: e.target.value || null })}
                className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-400">Facebook URL</label>
              <input type="url" value={createForm.facebookUrl ?? ""} onChange={(e) => setCreateForm({ ...createForm, facebookUrl: e.target.value || null })}
                className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-400">Website URL</label>
              <input type="url" value={createForm.websiteUrl ?? ""} onChange={(e) => setCreateForm({ ...createForm, websiteUrl: e.target.value || null })}
                className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreate} className="cursor-pointer flex items-center gap-2 rounded-lg bg-gold-400 px-4 py-2.5 text-sm font-medium text-stone-950 hover:bg-gold-300">
              <Check size={16} /> Creaza
            </button>
            <button onClick={() => { setShowCreate(false); setCreateForm(emptyCreate); }} className="cursor-pointer rounded-lg border border-stone-700 px-4 py-2.5 text-sm text-stone-400 hover:text-stone-100">
              Anuleaza
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-8">
              <div className="h-4 w-1/3 rounded bg-stone-800" />
            </div>
          ))}
        </div>
      ) : photographers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-stone-800 bg-stone-900/50 px-6 py-16 text-center">
          <Camera size={40} className="text-stone-700 mb-4" />
          <p className="text-lg font-medium text-stone-400">Niciun fotograf adaugat</p>
          <p className="mt-2 text-sm text-stone-600">Apasa butonul "Adauga Fotograf" pentru a incepe.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {photographers.map((p) => (
            <div key={p.id} className="rounded-lg border border-stone-800 bg-stone-900/50 p-6">
              {editingId === p.id && form ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-stone-400">Nume</label>
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-stone-400">Specialitate</label>
                      <input type="text" value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                        className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-stone-400">Avatar URL</label>
                      <input type="url" value={form.avatarUrl} onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
                        className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-stone-400">Cover URL</label>
                      <input type="url" value={form.coverUrl} onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
                        className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-stone-400">Bio</label>
                    <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3}
                      className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none resize-none" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-stone-400">Instagram URL</label>
                      <input type="url" value={form.instagramUrl ?? ""} onChange={(e) => setForm({ ...form, instagramUrl: e.target.value || null })}
                        className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-stone-400">Facebook URL</label>
                      <input type="url" value={form.facebookUrl ?? ""} onChange={(e) => setForm({ ...form, facebookUrl: e.target.value || null })}
                        className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-stone-400">Website URL</label>
                      <input type="url" value={form.websiteUrl ?? ""} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value || null })}
                        className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-stone-400 cursor-pointer">
                      <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-gold-400" />
                      Activ
                    </label>
                    <div>
                      <label className="text-xs font-medium text-stone-400 mr-2">Ordine:</label>
                      <input type="text" inputMode="numeric" value={form.displayOrder} onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); setForm({ ...form, displayOrder: v === "" ? 0 : Number(v) }); }}
                        className="w-20 rounded-lg border border-stone-800 bg-stone-900 py-1.5 px-3 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="cursor-pointer flex items-center gap-2 rounded-lg bg-gold-400 px-4 py-2.5 text-sm font-medium text-stone-950 hover:bg-gold-300">
                      <Check size={16} /> Salveaza
                    </button>
                    <button onClick={cancelEdit} className="cursor-pointer rounded-lg border border-stone-700 px-4 py-2.5 text-sm text-stone-400 hover:text-stone-100">
                      Anuleaza
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-5">
                  <img src={p.avatarUrl} alt={p.name} className="h-16 w-16 rounded-full object-cover border-2 border-stone-800" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium text-stone-100">{p.name}</h3>
                      {!p.isActive && (
                        <span className="rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-400 uppercase">Inactiv</span>
                      )}
                    </div>
                    <p className="text-sm text-stone-400">{p.specialty}</p>
                    <div className="mt-1 flex items-center gap-3 text-stone-600">
                      {p.instagramUrl && <Instagram size={14} />}
                      {p.websiteUrl && <Globe size={14} />}
                      <span className="text-xs">{p.busyDates.length} zile ocupate</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(p)}
                      className="cursor-pointer rounded-lg border border-stone-700 p-2.5 text-stone-500 hover:border-gold-400/30 hover:text-gold-400"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="cursor-pointer rounded-lg border border-stone-700 p-2.5 text-stone-500 hover:border-red-500/30 hover:text-red-400"
                    >
                      <Trash2 size={16} />
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
