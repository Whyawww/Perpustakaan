import { LogOut, BookOpen } from 'lucide-react';

interface NavbarProps {
    onLogout: () => void;
}

export const Navbar = ({ onLogout }: NavbarProps) => {
    return (
        <header className="bg-white dark:bg-[var(--code-bg)] border-b border-[var(--border)] p-4 flex items-center justify-between md:hidden">
            <div className="flex items-center gap-2">
                <BookOpen className="text-[var(--color-primary)]" size={24} />
                <span className="font-bold text-[var(--text-h)]">SInpus</span>
            </div>
            <button onClick={onLogout} className="p-2 text-[var(--color-secondary)] border-0 bg-transparent cursor-pointer">
                <LogOut size={20} />
            </button>
        </header>
    );
};