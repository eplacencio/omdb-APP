import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { OmdbSearchResponse } from "@/domain/models";

const PAGE_SIZE = 10;

/**
 * Hook to fetch movies from the OMDB API
 * @param query - The query to search for
 * @param filter - The filter to apply to the search
 * @returns The movies
 */
export function useInfiniteSearchMovies(query: string, filter: string) {
  return useInfiniteQuery<OmdbSearchResponse>({
    queryKey: ["movies", query, filter],
    enabled: !!query,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const typeParam = filter !== "all" ? filter : undefined;
      const response = await axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: process.env.NEXT_PUBLIC_API_SECURITY_KEY,
          s: query,
          type: typeParam,
          page: pageParam,
        },
      });

      if (response?.data?.Error) {
        return { Search: [], totalResults: "0" };
      }

      return response?.data ?? { Search: [], totalResults: "0" };
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.totalResults || lastPage.totalResults === "0") {
        console.log("lastPage", lastPage)
        return undefined;
      }

      const totalResults = parseInt(lastPage.totalResults);
      const maxPages = Math.ceil(totalResults / PAGE_SIZE);
      const nextPage = pages.length + 1;

      return nextPage <= maxPages ? nextPage : undefined;
    },
  });
}
