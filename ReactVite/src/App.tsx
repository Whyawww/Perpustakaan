import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/auth/Login/page';
import DashboardPage from '@/pages/dashboard/page';
import { ProtectedRoute } from '@/components/guards/ProtectedRoute';
import { MainLayout } from '@/components/layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />

            <Route path="/buku" element={<main className="p-6 animate-fade-in"><h1>Kelola Buku</h1><p className="text-[var(--text)]">Fitur Manajemen Buku segera hadir.</p></main>} />
            <Route path="/peminjaman" element={<main className="p-6 animate-fade-in"><h1>Peminjaman</h1><p className="text-[var(--text)]">Fitur Transaksi Sirkulasi segera hadir.</p></main>} />
            <Route path="/denda" element={<main className="p-6 animate-fade-in"><h1>Denda & Sanksi</h1><p className="text-[var(--text)]">Fitur Manajemen Denda segera hadir.</p></main>} />
          </Route>
        </Route>

        {/* Fallback Guard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;