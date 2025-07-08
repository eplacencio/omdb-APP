import z from "zod";
import {
  MovieSummarySchema,
  OmdbSearchResponseSchema,
  MovieDetailSchema
} from "./schemas";

export type MovieSummary = z.infer<typeof MovieSummarySchema>;
export type OmdbSearchResponse = z.infer<typeof OmdbSearchResponseSchema>;
export type MoviesSearch = OmdbSearchResponse['Search'];
export type MovieDetail = z.infer<typeof MovieDetailSchema>;