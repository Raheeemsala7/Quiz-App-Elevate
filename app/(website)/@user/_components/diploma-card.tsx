import { IDiploma } from "@/lib/types/diploma"
import Image from "next/image"


export default function DiplomaCard({
    diploma,
    index,
}: {
    diploma: IDiploma
    index: number
}) {
    return (
        <div
            className="relative rounded-xl overflow-hidden aspect-[3/3.5] cursor-pointer group"
            style={{
                animation: `fadeInUp 0.4s ease ${(index % 6) * 0.06}s both`,
            }}
        >
            {/* Image */}
            <Image
                src={diploma.image}
                alt={diploma.title}

                fill
                unoptimized  // ✅ بيخلي next/image يبعت الـ request من البراوزر مباشرة مش من السيرفر
                className="object-fill transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 33vw, 250px"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-800/50 to-transparent" />

            {/* Badge */}
            <div className="absolute top-2 right-2 bg-blue-600/80 backdrop-blur-sm text-white text-[9px] font-mono font-bold px-2 py-1 rounded-full tracking-wide">
                Diploma
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <h3 className="text-white font-mono font-bold text-[11px] leading-tight mb-1">
                    {diploma.title}
                </h3>
                <p className="text-white/75 text-[10px] leading-snug line-clamp-2">
                    {diploma.description}
                </p>
            </div>
        </div>
    )
}