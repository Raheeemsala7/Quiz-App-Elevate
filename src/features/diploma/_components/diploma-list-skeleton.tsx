import { DiplomaCardSkeleton } from "./diploma-card-skeleton";

export function DiplomaListSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <DiplomaCardSkeleton key={index} />
            ))}
        </div>
    );
}