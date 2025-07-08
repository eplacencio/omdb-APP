"use client";

import { useSearchStore } from "@/state/searchStore";
import { useInfiniteSearchMovies } from "@/hooks/useInfiniteSearchMovies";
import { useDebounce } from "@/hooks/useDebounce";

import { useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";
import HomeBanner from "@/components/HomeBanner";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import { MoviesSearch } from "@/domain/models";
import DotLoader from "@/components/DotLoader";

const ITEMS_PER_PAGE = 8;

export default function Home() {
  const { query, filter } = useSearchStore();
  const debouncedQuery = useDebounce(query, 500);
  const hasSearch = debouncedQuery && debouncedQuery.length > 0;
  const loadMoreSearchRef = useRef<HTMLDivElement>(null);
  const toSearch = hasSearch ? debouncedQuery : "action";

  const {
    data: searchData,
    isLoading: isLoadingSearch,
    error: searchError,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearch,
    isFetchingNextPage: isFetchingSearch,
  } = useInfiniteSearchMovies(toSearch, filter);

  // Memoized movies data
  const allSearchMovies: MoviesSearch = useMemo(() =>
    searchData?.pages.flatMap((p) => p.Search) ?? [],
    [searchData?.pages]
  );

  // Optimized intersection observer callback
  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && !isFetchingSearch) {
      fetchNextSearchPage();
    }
  }, [fetchNextSearchPage, isFetchingSearch]);

  // IntersectionObserver setup
  useEffect(() => {
    const currentRef = loadMoreSearchRef.current;
    if (!hasNextSearch || !currentRef) return;

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '50px',
    });

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, [hasNextSearch, handleIntersect]);

  // Loading state
  if (isLoadingSearch) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <main className="flex flex-col bg-neutral-900 min-h-screen">
      <div className="flex flex-col items-center justify-center z-10 pb-5">
        <HomeBanner />
        <div className="w-full max-w-4xl lg:max-w-7xl px-5">
          {allSearchMovies && allSearchMovies.length > 0 && (
            <section className="sm:py-10">
              {!hasSearch && (
                <h2 className="text-white text-xl sm:text-3xl mb-4 sm:my-4">
                  Most Wanted
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 space-4">
                {allSearchMovies.map((movie, index) => (
                  <Link key={movie.imdbID} href={`/details/${movie.imdbID}`}>
                    <MovieCard
                      movie={movie}
                      priority={index < 4} // Prioritize loading first 4 images
                    />
                  </Link>
                ))}
              </div>
              {hasNextSearch && (
                <div
                  ref={loadMoreSearchRef}
                  className="h-20 flex justify-center items-center"
                />
              )}
              {isFetchingSearch && <DotLoader />}
            </section>
          )}

          {searchError && (
            <ErrorMessage
              message={searchError?.message}
              moreInfo="Try searching with a different keyword or check for spelling mistakes."
            />
          )}
        </div>
      </div>
    </main>
  );
}
