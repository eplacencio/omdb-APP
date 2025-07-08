import { useQuery } from '@tanstack/react-query';
import { omdbClient } from '@/data/omdbClient';

/**
 * Function to fetch movie details from the OMDB API
 * @param imdbID - The IMDB ID of the movie
 * @returns The movie details
 */
async function getMovieDetail(imdbID: string) {
  const response = await omdbClient.get('', { params: { i: imdbID } });

  if (response?.data?.Error) {
    throw new Error('We could not find what you were looking for.');
  }

  return response.data;
}

export function useMovieDetail(imdbID: string) {
  return useQuery({
    queryKey: ['movieDetail', imdbID],
    queryFn: () => getMovieDetail(imdbID),
    enabled: !!imdbID,
  });
}
