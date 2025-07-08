import { renderHook, waitFor } from '@testing-library/react'
import { useMovieDetail } from '../useMovieDetail'
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

describe('useMovieDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns initial state when no movie ID', async () => {
    const { result } = renderHook(() => useMovieDetail(''), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.data).toBeUndefined()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    }, { timeout: 2000 })
  })

  it('fetches movie details when ID is provided', async () => {
    const mockResponse = {
      data: {
        Title: 'Test Movie',
        Year: '2024',
        Genre: 'Action',
        Director: 'Test Director',
        Actors: 'Actor 1, Actor 2',
        Plot: 'Test plot',
        Poster: 'https://example.com/poster.jpg',
        imdbID: 'tt1234567',
        Type: 'movie',
        Response: 'True',
      },
    }

    mockOmdbClient.get.mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() => useMovieDetail('tt1234567'), {
      wrapper: createWrapper(),
    })

    // Initially loading
    expect(result.current.isLoading).toBe(true)

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.data).toEqual(mockResponse.data)
    }, { timeout: 2000 })

    expect(mockOmdbClient.get).toHaveBeenCalledWith('', {
      params: { i: 'tt1234567' },
    })
  })

  it('handles error state', async () => {
    const mockError = {
      data: {
        Error: 'We could not find what you were looking for.',
      },
    }
    mockOmdbClient.get.mockResolvedValueOnce(mockError)

    const { result } = renderHook(() => useMovieDetail('invalid-id'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeTruthy()
      expect(result.current.data).toBeUndefined()
    }, { timeout: 2000 })
  })
}) 