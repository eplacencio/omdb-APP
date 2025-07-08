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
  Genre: z.string(),
  Director: z.string(),
  Actors: z.string(),
  Plot: z.string(),
  Poster: z.string().url(),
  imdbID: z.string(),
  Type: z.string(),
  Response: z.literal('True'),
});