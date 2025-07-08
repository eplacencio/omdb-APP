import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_SECURITY_KEY;

/**
 * OMDB API client
 * @see https://www.omdbapi.com/
 */
export const omdbClient = axios.create({
  baseURL: 'https://www.omdbapi.com/',
  params: {
    apikey: API_KEY,
  },
});