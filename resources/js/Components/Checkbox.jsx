export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'w-4 h-4 shrink-0 rounded border-slate-300 text-brand-blue shadow-sm focus:ring-brand-blue transition-all cursor-pointer ' +
                className
            }
        />
    );
}
