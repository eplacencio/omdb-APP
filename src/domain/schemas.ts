import { z } from 'zod';

// MovieSummary
export const MovieSummarySchema = z.object({
  Title: z.string(),
  Year: z.string(),
  imdbID: z.string(),
  Type: z.union([z.literal('movie'), z.literal('series')]),
  Poster: z.string(),
});

// OMDB Search Response
export const OmdbSearchResponseSchema = z.object({
  Search: z.array(MovieSummarySchema),
  totalResults: z.string(),
  Response: z.union([z.literal('True'), z.literal('False')]),
  Error: z.string().optional(),
});

// Movie Detail
export const MovieDetailSchema = z.object({
  Title: z.string(),
  Year: z.string(),
  Rated: z.string(),
  Released: z.string(),
  Runtime: z.string(),
  Genre: z.string(),
  Director: z.string(),
  Writer: z.string(),
  Actors: z.string(),
  Plot: z.string(),
  Language: z.string(),
  Country: z.string(),
  Awards: z.string(),
  Poster: z.string().url(),
  Ratings: z.array(z.object({
    Source: z.string(),
    Value: z.string()
  })).optional(),
  Metascore: z.string(),
  imdbRating: z.string(),
  imdbVotes: z.string(),
  imdbID: z.string(),
  Type: z.string(),
  DVD: z.string().optional(),
  BoxOffice: z.string().optional(),
  Production: z.string().optional(),
  Website: z.string().url().optional(),
  Response: z.literal('True'),
});