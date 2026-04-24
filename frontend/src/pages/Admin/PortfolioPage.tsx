import { useCallback, useEffect, useState } from "react";
import { Image, Plus, Trash2, X } from "lucide-react";
import { portfolioApi, photographersApi, useApiHandler } from "../../api";
import type { PortfolioImageDto, PhotographerDto, CreatePortfolioImageDto, PortfolioCategory, PortfolioAspect } from "../../api/types";

const CATEGORIES: PortfolioCategory[] = ["Fashion", "Wedding", "Portrait"];
const ASPECTS: PortfolioAspect[] = ["Tall", "Wide", "Square"];

export default function PortfolioPage() {
  const { call, addToast } = useApiHandler();
  const [images, setImages] = useState<PortfolioImageDto[]>([]);
  const [photographers, setPhotographers] = useState<PhotographerDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filterCat, setFilterCat] = useState<string>("all");

  const [form, setForm] = useState<CreatePortfolioImageDto>({
    src: "",
    alt: "",
    category: "Fashion",
    aspect: "Wide",
    photographerId: null,
    isPublished: true,
    displayOrder: 0,
  });

  const load = useCallback(async () => {
    const [imgs, photos] = await Promise.all([
      call(() => portfolioApi.list()),
      call(() => photographersApi.list()),
    ]);
    if (imgs) setImages(imgs);
    if (photos) setPhotographers(photos);
    setLoading(false);
  }, [call]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    if (!form.src || !form.alt) {
      addToast("error", "Completeaza URL-ul si descrierea.");
      return;
    }
    const res = await call(() => portfolioApi.create(form));
    if (res) {
      addToast("success", "Imagine adaugata cu succes.");
      setShowForm(false);
      setForm({ src: "", alt: "", category: "Fashion", aspect: "Wide", photographerId: null, isPublished: true, displayOrder: 0 });
      load();
    }
  };

  const handleDelete = async (img: PortfolioImageDto) => {
    const res = await call(() => portfolioApi.delete(img.id));
    if (res !== null) {
      addToast("success", "Imagine stearsa.");
      setImages((prev) => prev.filter((i) => i.id !== img.id));
    }
  };

  const filtered = filterCat === "all" ? images : images.filter((i) => i.category === filterCat);

  return (
    <div className="px-6 py-8 md:px-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image size={24} className="text-gold-400" />
          <div>
            <h1 className="font-serif text-2xl font-semibold text-stone-100">Portofoliu</h1>
            <p className="mt-1 text-sm text-stone-500">Gestioneaza imaginile din portofoliu.</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-gold-400/40 bg-gold-400/10 px-4 py-2.5 text-sm font-medium text-gold-400 transition-all hover:bg-gold-400/20"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Anuleaza" : "Adauga Imagine"}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-lg border border-stone-800 bg-stone-900/50 p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-400">URL Imagine *</label>
              <input
                type="url"
                value={form.src}
                onChange={(e) => setForm({ ...form, src: e.target.value })}
                placeholder="https://example.com/photo.jpg"
                className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 placeholder:text-stone-600 focus:border-gold-400/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-400">Descriere (Alt) *</label>
              <input
                type="text"
                value={form.alt}
                onChange={(e) => setForm({ ...form, alt: e.target.value })}
                placeholder="Descriere imagine"
                className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 placeholder:text-stone-600 focus:border-gold-400/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-400">Categorie</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as PortfolioCategory })}
                className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-400">Aspect</label>
              <select
                value={form.aspect}
                onChange={(e) => setForm({ ...form, aspect: e.target.value as PortfolioAspect })}
                className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none"
              >
                {ASPECTS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-400">Fotograf (optional)</label>
              <select
                value={form.photographerId ?? ""}
                onChange={(e) => setForm({ ...form, photographerId: e.target.value ? Number(e.target.value) : null })}
                className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none"
              >
                <option value="">Niciun fotograf</option>
                {photographers.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-400">Ordine Afisare</label>
              <input
                type="number"
                value={form.displayOrder}
                onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-stone-400 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                className="accent-gold-400"
              />
              Publicat
            </label>
            <button
              onClick={handleCreate}
              className="cursor-pointer rounded-lg bg-gold-400 px-5 py-2.5 text-sm font-medium text-stone-950 transition-colors hover:bg-gold-300"
            >
              Salveaza
            </button>
          </div>
        </div>
      )}

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilterCat("all")}
          className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filterCat === "all" ? "bg-gold-400/10 text-gold-400 border border-gold-400/20" : "text-stone-500 border border-stone-800 hover:text-stone-300"}`}
        >
          Toate ({images.length})
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilterCat(c)}
            className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filterCat === c ? "bg-gold-400/10 text-gold-400 border border-gold-400/20" : "text-stone-500 border border-stone-800 hover:text-stone-300"}`}
          >
            {c} ({images.filter((i) => i.category === c).length})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg border border-stone-800 bg-stone-900/50 aspect-square" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-stone-800 px-6 py-14 text-center">
          <Image size={32} className="mx-auto mb-3 text-stone-700" />
          <p className="text-sm text-stone-500">Nicio imagine in portofoliu.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((img) => (
            <div key={img.id} className="group relative overflow-hidden rounded-lg border border-stone-800 bg-stone-900/50">
              <img
                src={img.src}
                alt={img.alt}
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-xs font-medium text-stone-100 truncate">{img.alt}</p>
                  <p className="text-[10px] text-stone-400">{img.category} &middot; {img.aspect}</p>
                </div>
                <button
                  onClick={() => handleDelete(img)}
                  className="absolute top-2 right-2 cursor-pointer rounded-lg bg-red-500/20 border border-red-500/30 p-1.5 text-red-400 hover:bg-red-500/30"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              {!img.isPublished && (
                <span className="absolute top-2 left-2 rounded bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                  Draft
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
