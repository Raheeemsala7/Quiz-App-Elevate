import { cn } from "@/src/shared/lib/utils";

export function TimerCircle({ totalSeconds }: { totalSeconds: number; }) {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - totalSeconds / totalSeconds);
    const isWarning = totalSeconds <= 60; // last 1 minute → red

    const hh = Math.floor(totalSeconds / 3600);
    const mm = Math.floor((totalSeconds % 3600) / 60);
    const ss = totalSeconds % 60;

    // show hh:mm if >= 1 hour, else mm:ss
    const display =
        hh > 0
            ? `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`
            : `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;

    return (
        <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="3" />
                <circle
                    cx="22" cy="22" r={radius}
                    fill="none"
                    stroke={isWarning ? "#ef4444" : "#3b82f6"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
                />
            </svg>
            <span className={cn("text-[11px] font-bold tabular-nums z-10", isWarning ? "text-red-500" : "text-slate-700")}>
                {display}
            </span>
        </div>
    );
}