"use client";

import { useMovieDetail } from "@/hooks/useMovieDetail";
import { useRouter } from "next/navigation";
import MovieDetailSkeleton from "../MovieDetailSkeleton";
import { useInfiniteSearchMovies } from "@/hooks/useInfiniteSearchMovies";
import { useSearchStore } from "@/state/searchStore";
import Link from "next/link";
import ErrorMessage from "@/components/ErrorMessage";
import MovieCard from "@/components/MovieCard";
import MovieDetailCard from "../MovieDetailCard";
import { useCallback, useMemo } from "react";

interface MovieDetailContentProps {
  id: string;
}

export default function MovieDetailContent({
  id,
}: Readonly<MovieDetailContentProps>) {
  const router = useRouter();
  const { data, isLoading, error } = useMovieDetail(id);

  const { query } = useSearchStore();
  const fallbackQuery = useMemo(() =>
    data?.Genre?.split(",")[0]?.trim() ?? "action",
    [data?.Genre]
  );
  const relatedQuery = query || fallbackQuery;
  const { data: relatedData } = useInfiniteSearchMovies(relatedQuery, "all");

  const relatedMovies = useMemo(() =>
    relatedData?.pages?.flatMap((p) => p.Search) ?? [],
    [relatedData?.pages]
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const filteredMovies = useMemo(() =>
    relatedMovies
      .filter((m) => m.imdbID !== id)
      .slice(0, 8),
    [relatedMovies, id]
  );

  if (isLoading) return <MovieDetailSkeleton />;
  if (error || !data)
    return <ErrorMessage message={error?.message} handleBack={handleBack} />;

  return (
    <div className="w-full">
      <MovieDetailCard data={data} handleBack={handleBack} />

      <section className="w-full px-5">
        {relatedMovies.length > 1 && (
          <div className="mt-10">
            <h2 className="text-xl sm:text-2xl mb-4 text-white">
              You might also like
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
              {filteredMovies.map((movie, index) => (
                <Link key={movie.imdbID} href={`/details/${movie.imdbID}`}>
                  <MovieCard
                    movie={movie}
                    priority={index < 4}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
