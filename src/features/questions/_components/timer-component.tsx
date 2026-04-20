type TimerCircleProps = {
    total: number;
    remaining: number;
};

export function TimerCircle({ total, remaining }: TimerCircleProps) {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;

    const progress = (total - remaining) / total;
    const dashOffset = circumference * (1 - progress);

    const isDanger = remaining <= 10;

    const mm = Math.floor(remaining / 60);
    const ss = remaining % 60;

    const display = `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;

    

    return (
        <div className="relative size-16 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">

                {/* الفاضي */}
                <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    fill="none"
                    className="stroke-blue-100"
                    strokeWidth="3"
                />

                {/* المليان */}
                <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    fill="none"
                    className={isDanger ? "stroke-red-500" : "stroke-blue-600"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                />
            </svg>

            <span
                className={isDanger ? "text-red-500 text-xs font-bold" : "text-slate-700 text-xs font-bold"}
            >
                {display}
            </span>
        </div>
    );
}