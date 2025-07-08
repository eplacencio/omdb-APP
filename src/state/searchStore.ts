import { create } from 'zustand';

type Filter = 'all' | 'movie' | 'series';

interface SearchStore {
  query: string;
  filter: Filter;
  setQuery: (q: string) => void;
  setFilter: (f: Filter) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: '',
  filter: 'all',
  setQuery: (query: string) => set({ query }),
  setFilter: (filter: Filter) => set({ filter }),
}));
