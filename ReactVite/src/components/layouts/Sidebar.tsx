import { Link } from 'react-router-dom';
import { LogOut, BookOpen, LayoutDashboard, FileText, DollarSign } from 'lucide-react';

interface SidebarProps {
    username: string | null;
    onLogout: () => void;
}

export const Sidebar = ({ username, onLogout }: SidebarProps) => {
    return (
        <aside className="w-64 bg-[var(--color-primary)] text-white p-5 flex flex-col justify-between hidden md:flex border-r border-[var(--border)]">
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
                    <BookOpen className="text-[var(--color-accent)]" size={28} />
                    <div>
                        <h2 className="text-lg font-bold text-white m-0 leading-tight">SInpus</h2>
                        <span className="text-xs text-slate-400">Sistem Informasi Perpustakaan</span>
                    </div>
                </div>

                <nav className="flex flex-col gap-1">
                    <Link to="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-white no-underline text-sm font-medium transition-colors">
                        <LayoutDashboard size={20} className="text-[var(--color-accent)]" />
                        Dashboard
                    </Link>
                    <Link to="/buku" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-white no-underline text-sm font-medium transition-colors">
                        <BookOpen size={20} className="text-[var(--color-accent)]" />
                        Kelola Buku
                    </Link>
                    <Link to="/peminjaman" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-white no-underline text-sm font-medium transition-colors">
                        <FileText size={20} className="text-[var(--color-accent)]" />
                        Peminjaman
                    </Link>
                    <Link to="/denda" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-white no-underline text-sm font-medium transition-colors">
                        <DollarSign size={20} className="text-[var(--color-accent)]" />
                        Denda & Sanksi
                    </Link>
                </nav>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-700 pt-4">
                <div className="flex flex-col px-2">
                    <span className="text-sm font-semibold text-white truncate">{username || 'Petugas'}</span>
                    <span className="text-xs text-slate-400 capitalize">Pegawai</span>
                </div>
                <button
                    onClick={onLogout}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[var(--color-secondary)] hover:opacity-90 text-white text-sm font-semibold transition-opacity w-full border-0 cursor-pointer"
                >
                    <LogOut size={16} />
                    Keluar Akun
                </button>
            </div>
        </aside>
    );
};