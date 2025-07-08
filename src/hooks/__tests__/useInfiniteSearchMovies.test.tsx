import { renderHook, waitFor } from '@testing-library/react'
import { useInfiniteSearchMovies } from '../useInfiniteSearchMovies'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MovieSummary } from '@/domain/models'

// Mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

// Mock environment variable
process.env.NEXT_PUBLIC_API_SECURITY_KEY = 'test-api-key'

// Test data
const mockMovieSummary: MovieSummary = {
  Title: 'Test Movie',
  Year: '2024',
  imdbID: 'tt1234567',
  Type: 'movie',
  Poster: 'https://test.com/poster.jpg'
}

const mockSearchResponse = {
  Search: [mockMovieSummary],
  totalResults: '1',
  Response: 'True'
}

// Test wrapper
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 1,
        staleTime: 0
      },
    }
  })
}

function createWrapper() {
  const queryClient = createTestQueryClient()
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  Wrapper.displayName = 'QueryClientTestWrapper'
  return Wrapper
}

describe('useInfiniteSearchMovies', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = createTestQueryClient()
    jest.clearAllMocks()
  })

  afterEach(() => {
    queryClient.clear()
  })

  it('should not fetch data when query is empty', async () => {
    const { result } = renderHook(
      () => useInfiniteSearchMovies('', 'all'),
      { wrapper: createWrapper() }
    )

    expect(result.current.data).toBeUndefined()
    expect(mockedAxios.get).not.toHaveBeenCalled()
  })

  it('should fetch movies successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockSearchResponse })

    const { result } = renderHook(
      () => useInfiniteSearchMovies('test', 'all'),
      { wrapper: createWrapper() }
    )

    await waitFor(() => {
      expect(result.current.data?.pages[0]).toEqual(mockSearchResponse)
    })

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://www.omdbapi.com/',
      {
        params: {
          apikey: 'test-api-key',
          s: 'test',
          page: 1
        }
      }
    )
  })

  it('should apply type filter when specified', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockSearchResponse })

    const { result } = renderHook(
      () => useInfiniteSearchMovies('test', 'movie'),
      { wrapper: createWrapper() }
    )

    await waitFor(() => {
      expect(result.current.data?.pages[0]).toEqual(mockSearchResponse)
    })

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://www.omdbapi.com/',
      {
        params: {
          apikey: 'test-api-key',
          s: 'test',
          type: 'movie',
          page: 1
        }
      }
    )
  })

  it('should handle single page results correctly', async () => {
    const singlePageResponse = {
      Search: [mockMovieSummary],
      totalResults: '1',
      Response: 'True'
    }

    mockedAxios.get.mockResolvedValueOnce({ data: singlePageResponse })

    const { result } = renderHook(
      () => useInfiniteSearchMovies('test', 'all'),
      { wrapper: createWrapper() }
    )

    await waitFor(() => {
      expect(result.current.data?.pages[0]).toEqual(singlePageResponse)
      expect(result.current.hasNextPage).toBe(false)
    })
  })

  it('should handle multi-page results correctly', async () => {
    const multiPageResponse = {
      Search: Array(10).fill(mockMovieSummary),
      totalResults: '15',
      Response: 'True'
    }

    mockedAxios.get.mockResolvedValueOnce({ data: multiPageResponse })

    const { result } = renderHook(
      () => useInfiniteSearchMovies('test', 'all'),
      { wrapper: createWrapper() }
    )

    await waitFor(() => {
      expect(result.current.data?.pages[0]).toEqual(multiPageResponse)
      expect(result.current.hasNextPage).toBe(true)
    })
  })

  it('should handle "all" filter correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockSearchResponse })

    const { result } = renderHook(
      () => useInfiniteSearchMovies('test', 'all'),
      { wrapper: createWrapper() }
    )

    await waitFor(() => {
      expect(result.current.data?.pages[0]).toEqual(mockSearchResponse)
    })

    // Verify API call
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://www.omdbapi.com/',
      {
        params: {
          apikey: 'test-api-key',
          s: 'test',
          page: 1
        }
      }
    )
  })
}) 