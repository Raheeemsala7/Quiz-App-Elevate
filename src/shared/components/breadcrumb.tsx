"use client";

import { usePathname } from "next/navigation";

const isUUID = (str: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str) ||
    /^[0-9a-f]+-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

const formatSegment = (seg: string) =>
    seg
        .split("-")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ");

export default function Breadcrumb() {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);

    const filtered = segments.filter((seg) => !isUUID(seg));

    const labels = ["Diploma", ...filtered.map(formatSegment)];

    return (
        <div className="text-sm text-gray-500 bg-white p-4">
            {labels.join(" / ")}
        </div>
    );
}