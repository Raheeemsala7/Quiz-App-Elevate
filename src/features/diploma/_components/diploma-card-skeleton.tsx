import { Skeleton } from "@/src/shared/components/ui/skeleton";

export function DiplomaCardSkeleton() {
    return (
       <div className="relative overflow-hidden h-112 p-2.5">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-full rounded-none bg-gray-400/70" />

      {/* Info Skeleton */}
      <div className="absolute bottom-0 left-0 right-0 p-4 w-[95%] mx-auto mb-2 space-y-2 bg-gray-500/60 backdrop-blur">
        <Skeleton className="h-5 w-3/4 bg-gray-300" />
        <Skeleton className="h-4 w-full bg-gray-300" />
        <Skeleton className="h-4 w-5/6 bg-gray-300" />
      </div>
    </div>
    );
}