'use client';

import { useSearchStore } from '@/state/searchStore';

export default function SearchBar() {
  const { query, setQuery, filter, setFilter } = useSearchStore();

  return (
    <div className="flex flex-col gap-2 mb-4 w-full justify-center sm:flex-row sm:items-center">
      <div className='relative w-full sm:w-100'>
        <input
          type="text"
          value={query}
          name='search-input'
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies or series..."
          className="p-2 rounded w-full bg-white py-4 px-6 text-sm sm:w-100"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer pr-4"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <select
        value={filter}
        name='select-input'
        onChange={(e) => setFilter(e.target.value as unknown as 'all' | 'movie' | 'series')}
        className="rounded w-full bg-white mt-2 py-4 px-6 text-sm sm:w-30 sm:mt-0"
      >
        <option value="all">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
      </select>
    </div>
  );
}