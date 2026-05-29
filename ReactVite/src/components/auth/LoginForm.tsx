import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock, Loader2 } from "lucide-react";
import { loginUser } from "@/features/auth/api/authAPI";
import type { LoginRequest } from "@/features/auth/api/authAPI";
import { useAuthStore } from "@/store/authStore";

const loginSchema = z.object({
    username: z.string().min(3, "Username minimal 3 karakter"),
    password: z.string().min(5, "Password minimal 5 karakter"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginForm = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>(({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
    }));

    const loginMutation = useMutation({
        mutationFn: (data: LoginRequest) => loginUser(data),
        onSuccess: (response) => {
            setAuth(
                response.data.username,
                response.data.token,
                response.data.refresh_token
            );
            navigate("/");
        },
    });

    const onSubmit = (data: LoginFormInputs) => {
        loginMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            {loginMutation.isError && (
                <div className="p-3 text-sm text-[var(--color-secondary)] bg-red-50 dark:bg-red-950/30 border border-[var(--color-secondary)]/30 rounded-lg animate-fade-in">
                    {loginMutation.error instanceof Error ? loginMutation.error.message : "Kredensial tidak valid"}
                </div>
            )}

            <div className="flex flex-col text-left">
                <label className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Username</label>
                <div className="relative flex items-center">
                    <User className="absolute left-3 text-slate-400" size={18} />
                    <input
                        type="text"
                        {...register("username")}
                        className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all text-sm"
                        placeholder="Masukkan username anda"
                    />
                </div>
                {errors.username && <span className="text-[var(--color-secondary)] text-xs mt-1 font-medium">{errors.username.message}</span>}
            </div>

            <div className="flex flex-col text-left">
                <label className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Password</label>
                <div className="relative flex items-center">
                    <Lock className="absolute left-3 text-slate-400" size={18} />
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className="w-full pl-10 pr-10 py-3 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all text-sm"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border-0 bg-transparent cursor-pointer p-1 flex items-center rounded transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.password && (
                    <span id="password-error" role="alert" className="text-[var(--color-secondary)] text-xs mt-1 font-medium">
                        {errors.password.message}
                    </span>
                )}
            </div>

            <button
                type="submit"
                disabled={loginMutation.isPending}
                className="mt-3 w-full py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:opacity-95 disabled:opacity-75 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2 shadow-lg shadow-slate-900/10 cursor-pointer border-0 text-sm"
            >
                {loginMutation.isPending ? (
                    <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        <span>Mengautentikasi...</span>
                    </>
                ) : (
                    "Masuk ke Sistem"
                )}
            </button>
        </form>
    );
};