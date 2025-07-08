import { useQuery } from "@tanstack/react-query"
import { omdbClient } from "@/data/omdbClient"
import { MovieSummary } from "@/domain/models"

/**
 * Hook to fetch movies from the OMDB API
 * @param query - The query to search for
 * @param filter - The filter to apply to the search
 * @returns The movies
 */
export function useSearchMovies(query: string, filter: string) {
  return useQuery<MovieSummary[]>({
    queryKey: ["movies", query, filter],
    queryFn: async () => {
      const typeParam = filter !== "all" ? filter : undefined
      const res = await omdbClient.get("", {
        params: {
          s: query.trim(),
          type: typeParam
        },
      })

      if (res?.data?.Error) {
        throw new Error(res.data.Error ?? "No results found")
      }

      return res.data.Search
    },
    enabled: !!query?.trim(),
    staleTime: 1000 * 60 * 5,
  })
}
