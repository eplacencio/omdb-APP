import MovieDetailContent from "@/components/MovieDetails/MovieDetailContent";

interface DetailPageProps {
  params: { id: string };
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  return (
    <main className="bg-neutral-900 min-h-screen flex justify-center sm:py-5">
      <div className="max-w-4xl lg:max-w-7xl flex w-full flex-col">
        <MovieDetailContent id={id} />
      </div>
    </main>
  );
}
