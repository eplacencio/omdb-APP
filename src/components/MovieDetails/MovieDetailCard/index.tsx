import BackButton from "@/components/BackButton";
import { MovieImage } from "@/components/MovieImage";
import { MovieDetail } from "@/domain/models";
import { memo } from "react";

interface MovieDetailCardProps {
  data: MovieDetail
  handleBack: () => void
}

function MovieDetailCard({
  data,
  handleBack
}: Readonly<MovieDetailCardProps>) {
  return (
    <section className="w-full p-5">
      <div className="flex flex-row items-center gap-4">
        <BackButton handleBack={handleBack} />
        <h1 className="text-2xl sm:text-5xl font-bold font-bebas text-white">
          {data?.Title}
        </h1>
      </div>
      <div className="p-6 bg-neutral-800 rounded-xl mt-4">
        <div className="flex flex-col sm:flex-row sm:gap-8">
          <div className="w-full sm:max-w-80">
            <MovieImage
              src={data?.Poster}
              title={data?.Title}
              priority={true}
            />
          </div>
          <div className="text-white mt-2 text-sm sm:text-lg sm:mt-0">
            <p className="mb-2">
              <b>Year:</b> {data?.Year}
            </p>
            <p className="my-2">
              <b>Genre:</b> {data?.Genre}
            </p>
            <p className="my-2">
              <b>Director:</b> {data?.Director}
            </p>
            <p className="my-2">
              <b>Actors:</b> {data?.Actors}
            </p>
            <p className="mt-4">{data?.Plot}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(MovieDetailCard);
