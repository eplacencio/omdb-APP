export default function MovieDetailSkeleton() {
  return (
    <main className="w-full min-h-screen bg-neutral-900">
      <div className="max-w-4xl lg:max-w-7xl mx-auto p-4 animate-pulse" data-testid="animation-container">
        <div className="flex flex-col gap-6">
          <div className="flex flex-row" data-testid="header-container">
            <div
              className="h-10 w-10 sm:h-15 sm:w-15 bg-white/10 rounded-full"
              data-testid="back-button-placeholder"
            />
            <div
              className="h-10 w-60 sm:h-15 sm:w-2xl bg-white/10 rounded ml-4"
              data-testid="title-placeholder"
            />
          </div>
          <div
            className="bg-neutral-800 rounded-xl p-6 flex-col flex sm:flex-row gap-8"
            data-testid="content-container"
          >
            <div
              className="w-full h-100 sm:w-xs sm:h-120 bg-white/10 rounded-xl"
              data-testid="poster-placeholder"
            />

            <div className="flex-1 space-y-4" data-testid="details-container">
              <div className="h-4 bg-white/10 rounded w-3/4" data-testid="info-placeholder" />
              <div className="h-4 bg-white/10 rounded w-1/2" data-testid="info-placeholder" />
              <div className="h-4 bg-white/10 rounded w-2/3" data-testid="info-placeholder" />
              <div className="h-4 bg-white/10 rounded w-3/4" data-testid="info-placeholder" />
              <div className="h-4 bg-white/10 rounded w-1/3" data-testid="info-placeholder" />

              <div className="mt-6 space-y-2" data-testid="plot-container">
                <div className="h-4 bg-white/10 rounded w-full" data-testid="plot-placeholder" />
                <div className="h-4 bg-white/10 rounded w-5/6" data-testid="plot-placeholder" />
                <div className="h-4 bg-white/10 rounded w-4/6" data-testid="plot-placeholder" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}