import { IDiploma } from "@/src/features/lib/types/diploma"
import Image from "next/image"
import Link from "next/link"


export default function DiplomaCard({
    diploma,
    index,
}: {
    diploma: IDiploma
    index: number
}) {
    return (
        <Link
            href={`/${diploma.id}/${diploma.title}`}
            className="relative overflow-hidden aspect-[3/3.7] lg:aspect-[3/2.2] cursor-pointer group"
            style={{
                animation: `fadeInUp 0.4s ease ${(index % 6) * 0.06}s both`,
            }}
        >
            {/* Image */}

                <Image
                    src={diploma.image}
                    alt={diploma.title}
                    fill
                    unoptimized
                    className="object-fill transition-transform duration-500 rounded-none group-hover:scale-105"
                    sizes="(max-width: 768px) 33vw, 250px"
                />



            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-[#155DFCBF] w-[95%] mx-auto mb-2 ">
                <h3 className="text-white font-mono font-bold text-xl leading-tight font-mono mb-1">
                    {diploma.title}
                </h3>
                <p className="text-white/75 text-sm font-mono ">
                    {diploma.description}
                </p>
            </div>
        </Link>
    )
}