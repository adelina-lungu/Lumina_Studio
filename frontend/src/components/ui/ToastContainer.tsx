import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useToast } from "../../contexts/ToastContext";
import type { ToastType } from "../../contexts/ToastContext";

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 size={16} className="text-emerald-400" />,
  error: <AlertCircle size={16} className="text-red-400" />,
  info: <Info size={16} className="text-blue-400" />,
};

const borders: Record<ToastType, string> = {
  success: "border-emerald-500/30",
  error: "border-red-500/30",
  info: "border-blue-500/30",
};

const bgs: Record<ToastType, string> = {
  success: "bg-emerald-500/10",
  error: "bg-red-500/10",
  info: "bg-blue-500/10",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[300] flex -translate-x-1/2 flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 rounded-lg border ${borders[toast.type]} ${bgs[toast.type]} px-5 py-3 shadow-xl backdrop-blur-sm animate-fade-in-up`}
        >
          {icons[toast.type]}
          <p className="text-sm text-stone-200">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 cursor-pointer text-stone-500 transition-colors hover:text-stone-300"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
