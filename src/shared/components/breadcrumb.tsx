"use client";

import { usePathname } from "next/navigation";

const labelsMap: Record<string, string> = {
    diplomas: "Diploma",
    exams: "Exams",
};

const isUUID = (str: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

export default function Breadcrumb() {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);

    // لو مفيش segments (root page) => اعرض "Diploma" على طول
    if (segments.length === 0) {
        return <div className="text-sm text-gray-500">Diploma</div>;
    }

    const filtered = segments.filter((seg) => !isUUID(seg));

    // لو كل الـ segments كانت UUID (زي /uuid فقط) => اعرض "Diploma"
    const labels = filtered.length === 0
        ? ["Diploma"]
        : filtered.map((seg) => {
            if (labelsMap[seg]) return labelsMap[seg];
            return seg
                .split("-")
                .map((w) => w[0].toUpperCase() + w.slice(1))
                .join(" ");
        });

    // دايمًا هيبدأ بـ "Diploma"
    const finalLabels = labels[0] === "Diploma" ? labels : ["Diploma", ...labels];

    return (
        <div className="text-sm text-gray-500">
            {finalLabels.join(" / ")}
        </div>
    );
}