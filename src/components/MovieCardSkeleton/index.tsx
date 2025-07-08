"use client";

export default function MovieCardSkeleton() {
  return (
    <div className="bg-white/10 rounded-xl shadow animate-pulse overflow-hidden">
      <div className="w-full h-90 sm:h-84 bg-white/20" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 bg-white/20 rounded" />
        <div className="h-3 w-1/2 bg-white/10 rounded" />
      </div>
    </div>
  );
}