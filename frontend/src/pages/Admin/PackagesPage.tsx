import { useCallback, useEffect, useState } from "react";
import { Package, Edit3, X, Check } from "lucide-react";
import { packagesApi, useApiHandler } from "../../api";
import type { ServicePackageDto, UpdateServicePackageDto, PackageTier } from "../../api/types";

const TIERS: PackageTier[] = ["Standard", "Premium", "Editorial"];

export default function PackagesPage() {
  const { call, addToast } = useApiHandler();
  const [packages, setPackages] = useState<ServicePackageDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<UpdateServicePackageDto | null>(null);
  const [featureInput, setFeatureInput] = useState("");

  const load = useCallback(async () => {
    const res = await call(() => packagesApi.list());
    if (res) setPackages(res);
    setLoading(false);
  }, [call]);

  useEffect(() => { load(); }, [load]);

  const startEdit = (pkg: ServicePackageDto) => {
    setEditingId(pkg.id);
    setForm({
      tier: pkg.tier,
      name: pkg.name,
      price: pkg.price,
      currency: pkg.currency,
      isHighlighted: pkg.isHighlighted,
      isActive: pkg.isActive,
      displayOrder: pkg.displayOrder,
      features: [...pkg.features],
    });
    setFeatureInput("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(null);
  };

  const handleSave = async () => {
    if (!form || editingId === null) return;
    const res = await call(() => packagesApi.update(editingId, form));
    if (res) {
      addToast("success", "Pachet actualizat cu succes.");
      cancelEdit();
      load();
    }
  };

  const addFeature = () => {
    if (!form || !featureInput.trim()) return;
    setForm({ ...form, features: [...form.features, featureInput.trim()] });
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    if (!form) return;
    setForm({ ...form, features: form.features.filter((_, i) => i !== index) });
  };

  return (
    <div className="px-6 py-8 md:px-10">
      <div className="mb-8 flex items-center gap-3">
        <Package size={24} className="text-gold-400" />
        <div>
          <h1 className="font-serif text-2xl font-semibold text-stone-100">Pachete Servicii</h1>
          <p className="mt-1 text-sm text-stone-500">Editeaza pachetele de servicii oferite.</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-8">
              <div className="h-4 w-1/4 rounded bg-stone-800" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {packages.map((pkg) => (
            <div key={pkg.id} className="rounded-lg border border-stone-800 bg-stone-900/50 p-6">
              {editingId === pkg.id && form ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-stone-400">Nume</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-stone-400">Tier</label>
                      <select
                        value={form.tier}
                        onChange={(e) => setForm({ ...form, tier: e.target.value as PackageTier })}
                        className="w-full rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none"
                      >
                        {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-stone-400">Pret</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={form.price}
                          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                          className="flex-1 rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={form.currency}
                          onChange={(e) => setForm({ ...form, currency: e.target.value })}
                          className="w-16 rounded-lg border border-stone-800 bg-stone-900 py-2.5 px-4 text-sm text-stone-100 focus:border-gold-400/50 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-stone-400">Functionalitati</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {form.features.map((f, i) => (
                        <span key={i} className="flex items-center gap-1 rounded-full border border-stone-700 bg-stone-800 px-3 py-1 text-xs text-stone-300">
                          {f}
                          <button onClick={() => removeFeature(i)} className="cursor-pointer text-stone-500 hover:text-red-400">
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                        placeholder="Adauga functionalitate..."
                        className="flex-1 rounded-lg border border-stone-800 bg-stone-900 py-2 px-4 text-sm text-stone-100 placeholder:text-stone-600 focus:border-gold-400/50 focus:outline-none"
                      />
                      <button onClick={addFeature} className="cursor-pointer rounded-lg border border-stone-700 px-3 py-2 text-sm text-stone-400 hover:text-stone-100 hover:border-stone-600">
                        Adauga
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-stone-400 cursor-pointer">
                      <input type="checkbox" checked={form.isHighlighted} onChange={(e) => setForm({ ...form, isHighlighted: e.target.checked })} className="accent-gold-400" />
                      Evidentiiat
                    </label>
                    <label className="flex items-center gap-2 text-sm text-stone-400 cursor-pointer">
                      <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-gold-400" />
                      Activ
                    </label>
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
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium text-stone-100">{pkg.name}</h3>
                      <span className="rounded border border-stone-700 px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase text-stone-400">
                        {pkg.tier}
                      </span>
                      {pkg.isHighlighted && (
                        <span className="rounded border border-gold-400/30 bg-gold-400/10 px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase text-gold-400">
                          Popular
                        </span>
                      )}
                      {!pkg.isActive && (
                        <span className="rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase text-red-400">
                          Inactiv
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-2xl font-bold text-gold-400">
                      {pkg.price} {pkg.currency}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {pkg.features.map((f, i) => (
                        <span key={i} className="rounded-full border border-stone-800 bg-stone-800/50 px-2.5 py-0.5 text-xs text-stone-400">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => startEdit(pkg)}
                    className="cursor-pointer rounded-lg border border-stone-700 p-2.5 text-stone-500 hover:border-gold-400/30 hover:text-gold-400"
                    title="Editeaza"
                  >
                    <Edit3 size={16} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
