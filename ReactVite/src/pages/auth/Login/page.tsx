import { Navigate } from "react-router-dom";
import { BookOpen, ShieldCheck } from "lucide-react";
import { SEOMeta } from "@/components/SEO/SEOMeta";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
    const token = useAuthStore((state) => state.token);

    if (token) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="animate-fade-in min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 sm:p-6">
            <SEOMeta
                title="Otorisasi Masuk"
                description="Masuk ke portal pengelolaan Sistem Informasi Perpustakaan (SInpus) untuk memproses sirkulasi buku."
                canonical="/login"
                noIndex
            />

            <div className="w-full max-w-md bg-white dark:bg-[var(--code-bg)] p-6 sm:p-10 rounded-2xl shadow-[var(--shadow)] border border-[var(--border)] relative overflow-hidden flex flex-col gap-6">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[var(--color-accent)]" />

                <div className="text-center flex flex-col items-center">
                    <div className="w-14 h-14 bg-[var(--accent-bg)] border border-[var(--accent-border)] text-[var(--color-accent)] rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                        <BookOpen size={28} strokeWidth={2.2} />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-h)] !m-0 tracking-tight">
                        SInpus Portal
                    </h1>
                    <p className="text-[var(--text)] text-xs sm:text-sm mt-1.5 font-medium">
                        Sistem Informasi Manajemen Perpustakaan Terpadu
                    </p>
                </div>

                <div className="bg-slate-50/50 dark:bg-slate-900/20 p-4 sm:p-6 rounded-xl border border-slate-100 dark:border-slate-800/40">
                    <LoginForm />
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                    <ShieldCheck size={14} className="text-[var(--color-accent)]" />
                    <span>Enkripsi end-to-end dengan standar sistem industri</span>
                </div>
            </div>
        </main>
    );
}