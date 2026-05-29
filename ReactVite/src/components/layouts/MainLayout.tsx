import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export const MainLayout = () => {
    const logout = useAuthStore((state) => state.logout);
    const username = useAuthStore((state) => state.username);

    return (
        <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)] text-left">
            <Sidebar username={username} onLogout={logout} />
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar onLogout={logout} />
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};