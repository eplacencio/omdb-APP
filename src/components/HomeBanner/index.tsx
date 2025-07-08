"use client";

import SearchBar from "../SearchBar";

export default function HomeBanner() {
  return (
    <section
      role="region"
      className="relative h-120 sm:h-180 bg-cover bg-center bg-no-repeat flex items-center flex-col justify-center w-full"
      style={{
        backgroundImage: "url('/cinema-screen-unsplash.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" data-testid="black-overlay" />

      <div className="max-w-4xl z-10 p-5">
        <h1 className="text-3xl sm:text-6xl font-bold mb-2 text-center text-white text-shadow-lg font-bebas">
          🎬 Discover Movies and Series Instantly
        </h1>
        <p className="text-md text-center my-6 sm:my-14 text-white sm:text-lg z-10">
          Explore a vast collection of movies and TV series using the OMDB
          database. Search by title, filter by type, and view detailed
          information about your favorite films — including cast, director,
          genre, and plot.
        </p>
        <section className="flex flex-col items-center justify-center w-full">
          <div className="flex justify-between items-center w-full">
            <SearchBar />
          </div>
        </section>
      </div>
      <div 
        className="absolute bottom-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent h-30 sm:h-60 w-full"
        data-testid="gradient-overlay"
      />
    </section>
  );
}
