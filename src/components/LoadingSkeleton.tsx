'use client';

interface LoadingSkeletonProps {
  count?: number;
}

export function LoadingSkeleton({ count = 8 }: LoadingSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="relative flex flex-col justify-between p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 overflow-hidden shadow-sm h-[270px] animate-pulse"
        >
          {/* Shimmer effect overlay */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-slate-700/20 to-transparent animate-shimmer" />

          {/* Top header skeleton */}
          <div className="flex items-center justify-between z-10">
            <div className="w-12 h-4 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Image placeholder skeleton */}
          <div className="my-2 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Bottom title + badges skeleton */}
          <div className="space-y-2.5 z-10">
            <div className="w-3/4 h-5 rounded-md bg-slate-200 dark:bg-slate-700" />
            <div className="flex gap-2">
              <div className="w-16 h-5 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="w-14 h-5 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
