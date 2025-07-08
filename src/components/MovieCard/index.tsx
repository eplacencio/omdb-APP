"use client";

import { MovieSummary } from "@/domain/models";
import { MovieImage } from "@/components/MovieImage"
import { memo } from "react";

interface MovieCardProps {
  movie: MovieSummary;
  priority?: boolean;
}

function MovieCardComponent({
  movie,
  priority = false
}: Readonly<MovieCardProps>) {
  return (
    <div className="p-4 rounded-xl shadow-lg bg-neutral-800">
      <MovieImage
        src={movie?.Poster}
        title={movie?.Title}
        priority={priority}
        className="w-full min-h-90 max-h-90"
      />
      <p className="text-neutral-200 my-2">{movie.Title}</p>
      <p className="text-sm text-neutral-500">
        {movie.Year} • {movie.Type}
      </p>
    </div>
  );
}

export default memo(MovieCardComponent);
