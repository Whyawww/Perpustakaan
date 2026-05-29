import { useAuthStore } from '@/store/authStore';
import { StatCard } from '@/components/ui/StatCard';
import { SEOMeta } from '@/components/SEO/SEOMeta';

export default function DashboardPage() {
    const username = useAuthStore((state) => state.username);

    return (
        <main className="animate-fade-in p-6">
            <SEOMeta
                title="Dashboard Utama"
                description="Selamat datang di panel Sistem Informasi Perpustakaan."
            />
            <h1 className="text-3xl font-bold text-[var(--text-h)] mb-2">Dashboard Utama</h1>
            <p className="text-[var(--text)] mb-6">Selamat bekerja kembali, {username || 'Petugas'}. Berikut rangkuman statistik hari ini.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in delay-100">
                <StatCard label="Total Buku" value="1,420 Eksemplar" valueColor="text-[var(--color-primary)]" />
                <StatCard label="Peminjaman Aktif" value="78 Transaksi" valueColor="text-[var(--color-accent)]" />
                <StatCard label="Total Denda Tunggakan" value="Rp 250.000" valueColor="text-[var(--color-secondary)]" />
            </div>
        </main>
    );
}