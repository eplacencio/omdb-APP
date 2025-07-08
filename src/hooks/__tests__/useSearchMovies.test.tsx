import { renderHook, waitFor } from '@testing-library/react'
import { useSearchMovies } from '../useSearchMovies'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { omdbClient } from '@/data/omdbClient'
import React from 'react'

// Mock the omdbClient
jest.mock('@/data/omdbClient', () => ({
  omdbClient: {
    get: jest.fn(),
  },
}))

const mockOmdbClient = omdbClient as jest.Mocked<typeof omdbClient>

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
    },
  })

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  Wrapper.displayName = 'QueryWrapper'
  return Wrapper
}

describe('useSearchMovies', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns initial state when no search term', async () => {
    const { result } = renderHook(() => useSearchMovies('', 'all'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.data).toBeUndefined()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    }, { timeout: 2000 })
  })

  it('fetches movies when search term is provided', async () => {
    const mockResponse = {
      data: {
        Search: [
          {
            Title: 'Test Movie',
            Year: '2024',
            imdbID: 'tt1234567',
            Type: 'movie',
            Poster: 'https://example.com/poster.jpg',
          },
        ],
      },
    }

    mockOmdbClient.get.mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() => useSearchMovies('test', 'all'), {
      wrapper: createWrapper(),
    })

    // Initially loading
    expect(result.current.isLoading).toBe(true)

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.data).toEqual(mockResponse.data.Search)
    }, { timeout: 2000 })

    expect(mockOmdbClient.get).toHaveBeenCalledWith('', {
      params: {
        s: 'test',
        type: undefined,
      },
    })
  })

  it('handles error state', async () => {
    const mockError = {
      data: {
        Error: 'API Error',
      },
    }
    mockOmdbClient.get.mockResolvedValueOnce(mockError)

    const { result } = renderHook(() => useSearchMovies('error', 'all'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeTruthy()
      expect(result.current.data).toBeUndefined()
    }, { timeout: 2000 })
  })

  it('applies type filter when provided', async () => {
    const mockResponse = {
      data: {
        Search: [
          {
            Title: 'Test Movie',
            Year: '2024',
            imdbID: 'tt1234567',
            Type: 'movie',
            Poster: 'https://example.com/poster.jpg',
          },
        ],
      },
    }

    mockOmdbClient.get.mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() => useSearchMovies('test', 'movie'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.data).toEqual(mockResponse.data.Search)
    }, { timeout: 2000 })

    expect(mockOmdbClient.get).toHaveBeenCalledWith('', {
      params: {
        s: 'test',
        type: 'movie',
      },
    })
  })
}) 