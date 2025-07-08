'use client';

import MovieDetailContent from "@/components/MovieDetails/MovieDetailContent";
import { useParams } from "next/navigation";

export default function DetailPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <main className="bg-neutral-900 min-h-screen flex justify-center sm:py-5">
      <div className="max-w-4xl lg:max-w-7xl flex w-full flex-col">
        <MovieDetailContent id={id} />
      </div>
    </main>
  );
}
