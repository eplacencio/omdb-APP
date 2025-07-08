"use client";

export default function MovieCardSkeleton() {
  return (
    <div
      className="bg-white/10 rounded-xl shadow animate-pulse overflow-hidden"
      data-testid="movie-card-skeleton"
    >
      <div
        className="w-full h-90 sm:h-84 bg-white/20"
        data-testid="image-placeholder"
      />
      <div className="p-3 space-y-2" data-testid="content-container">
        <div
          className="h-4 w-3/4 bg-white/20 rounded"
          data-testid="title-placeholder"
        />
        <div
          className="h-3 w-1/2 bg-white/10 rounded"
          data-testid="subtitle-placeholder"
        />
      </div>
    </div>
  );
}