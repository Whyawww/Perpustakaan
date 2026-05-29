interface StatCardProps {
    label: string;
    value: string | number;
    valueColor?: string;
}

export const StatCard = ({ label, value, valueColor = 'text-[var(--color-primary)]' }: StatCardProps) => {
    return (
        <div className="bg-white dark:bg-[var(--code-bg)] p-6 rounded-xl border border-[var(--border)] shadow-[var(--shadow)] transition-all hover:shadow-md">
            <h3 className="text-sm font-semibold text-[var(--text)] m-0 uppercase tracking-wider">{label}</h3>
            <p className={`text-3xl font-bold ${valueColor} mt-2 mb-0`}>{value}</p>
        </div>
    );
};