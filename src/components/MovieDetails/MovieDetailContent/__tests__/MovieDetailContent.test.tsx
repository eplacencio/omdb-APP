import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import MovieDetailContent from '../index'
import { useMovieDetail } from '@/hooks/useMovieDetail'
import { useInfiniteSearchMovies } from '@/hooks/useInfiniteSearchMovies'
import { useSearchStore } from '@/state/searchStore'
import { MovieDetail, MovieSummary } from '@/domain/models'

// Mock hooks
jest.mock('@/hooks/useMovieDetail')
jest.mock('@/hooks/useInfiniteSearchMovies')
jest.mock('@/state/searchStore')

// Mock router
const mockBack = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack
  })
}))

// Mock child components
jest.mock('@/components/MovieDetails/MovieDetailCard', () => ({
  __esModule: true,
  default: ({ data, handleBack }: { data: MovieDetail; handleBack: () => void }) => (
    <div data-testid="movie-detail-card">
      <h1>{data.Title}</h1>
      <button onClick={handleBack}>Back</button>
    </div>
  )
}))

jest.mock('@/components/MovieCard', () => ({
  __esModule: true,
  default: ({ movie }: { movie: MovieSummary }) => (
    <div data-testid="movie-card">{movie.Title}</div>
  )
}))

jest.mock('@/components/ErrorMessage', () => ({
  __esModule: true,
  default: ({ message, handleBack }: { message?: string; handleBack?: () => void }) => (
    <div data-testid="error-message">
      {message}
      {handleBack && <button onClick={handleBack}>Back</button>}
    </div>
  )
}))

jest.mock('@/components/MovieDetails/MovieDetailSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="movie-detail-skeleton" />
}))

describe('MovieDetailContent', () => {
  const mockMovieDetail = {
    Title: 'Test Movie',
    Year: '2024',
    Genre: 'Action, Drama',
    Director: 'Test Director',
    Writer: 'Test Writer',
    Actors: 'Test Actor',
    Plot: 'Test Plot',
    Poster: 'https://test.com/poster.jpg',
    imdbID: 'tt1234567',
    Type: 'movie',
    Response: 'True' as const
  }

  const mockRelatedMovies: MovieSummary[] = [
    {
      Title: 'Related Movie 1',
      Year: '2024',
      imdbID: 'tt7654321',
      Type: 'movie',
      Poster: 'https://test.com/poster1.jpg'
    },
    {
      Title: 'Related Movie 2',
      Year: '2024',
      imdbID: 'tt9876543',
      Type: 'movie',
      Poster: 'https://test.com/poster2.jpg'
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useSearchStore as unknown as jest.Mock).mockReturnValue({ query: '' })
  })

  it('should render loading state', () => {
    ;(useMovieDetail as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      error: null
    })
    ;(useInfiniteSearchMovies as jest.Mock).mockReturnValue({
      data: null
    })

    render(<MovieDetailContent id="tt1234567" />)
    expect(screen.getByTestId('movie-detail-skeleton')).toBeInTheDocument()
  })

  it('should render error state', () => {
    const error = new Error('Failed to fetch')
    ;(useMovieDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
      error
    })
    ;(useInfiniteSearchMovies as jest.Mock).mockReturnValue({
      data: null
    })

    render(<MovieDetailContent id="tt1234567" />)
    expect(screen.getByTestId('error-message')).toBeInTheDocument()
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument()
  })

  it('should render movie details and related movies', () => {
    ;(useMovieDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockMovieDetail,
      error: null
    })
    ;(useInfiniteSearchMovies as jest.Mock).mockReturnValue({
      data: {
        pages: [{ Search: mockRelatedMovies }]
      }
    })

    render(<MovieDetailContent id="tt1234567" />)

    // Check movie details
    expect(screen.getByTestId('movie-detail-card')).toBeInTheDocument()
    expect(screen.getByText('Test Movie')).toBeInTheDocument()

    // Check related movies
    expect(screen.getByText('You might also like')).toBeInTheDocument()
    expect(screen.getByText('Related Movie 1')).toBeInTheDocument()
    expect(screen.getByText('Related Movie 2')).toBeInTheDocument()
  })

  it('should not show related movies section when only one or no movies', () => {
    ;(useMovieDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockMovieDetail,
      error: null
    })
    ;(useInfiniteSearchMovies as jest.Mock).mockReturnValue({
      data: {
        pages: [{ Search: [mockRelatedMovies[0]] }]
      }
    })

    render(<MovieDetailContent id="tt1234567" />)

    expect(screen.queryByText('You might also like')).not.toBeInTheDocument()
  })

  it('should use search query for related movies if available', () => {
    const searchQuery = 'action movies'
    ;(useSearchStore as unknown as jest.Mock).mockReturnValue({ query: searchQuery })
    ;(useMovieDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockMovieDetail,
      error: null
    })

    render(<MovieDetailContent id="tt1234567" />)

    expect(useInfiniteSearchMovies).toHaveBeenCalledWith(searchQuery, 'all')
  })

  it('should use genre as fallback query when search query is empty', () => {
    ;(useSearchStore as unknown as jest.Mock).mockReturnValue({ query: '' })
    ;(useMovieDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockMovieDetail,
      error: null
    })

    render(<MovieDetailContent id="tt1234567" />)

    expect(useInfiniteSearchMovies).toHaveBeenCalledWith('Action', 'all')
  })

  it('should filter out current movie from related movies', () => {
    const currentMovieId = 'tt1234567'
    const relatedMoviesWithCurrent = [
      ...mockRelatedMovies,
      {
        Title: 'Current Movie',
        Year: '2024',
        imdbID: currentMovieId,
        Type: 'movie',
        Poster: 'https://test.com/poster.jpg'
      }
    ]

    ;(useMovieDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockMovieDetail,
      error: null
    })
    ;(useInfiniteSearchMovies as jest.Mock).mockReturnValue({
      data: {
        pages: [{ Search: relatedMoviesWithCurrent }]
      }
    })

    render(<MovieDetailContent id={currentMovieId} />)

    // Current movie should not appear in related movies
    expect(screen.queryByText('Current Movie')).not.toBeInTheDocument()
  })

  it('should handle back button click', () => {
    ;(useMovieDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockMovieDetail,
      error: null
    })
    ;(useInfiniteSearchMovies as jest.Mock).mockReturnValue({
      data: {
        pages: [{ Search: mockRelatedMovies }]
      }
    })

    render(<MovieDetailContent id="tt1234567" />)

    // Find and click the back button
    const backButton = screen.getByRole('button', { name: /back/i })
    fireEvent.click(backButton)

    expect(mockBack).toHaveBeenCalledTimes(1)
  })
}) 