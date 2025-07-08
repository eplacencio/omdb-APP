import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MovieCard from '../index'
import { MovieSummary } from '@/domain/models'

// Mock MovieImage component
jest.mock('@/components/MovieImage', () => ({
  MovieImage: ({ src, title }: { src: string; title: string }) => (
    <img src={src} alt={title} data-testid="movie-image" />
  )
}))

describe('MovieCard', () => {
  const mockMovie: MovieSummary = {
    Title: 'Test Movie',
    Year: '2024',
    imdbID: 'tt1234567',
    Type: 'movie',
    Poster: 'https://test.com/poster.jpg'
  }

  it('should render movie information correctly', () => {
    render(<MovieCard movie={mockMovie} />)

    // Check if movie title is rendered
    expect(screen.getByText('Test Movie')).toBeInTheDocument()

    // Check if year and type are rendered
    expect(screen.getByText('2024 • movie')).toBeInTheDocument()

    // Check if MovieImage component is rendered with correct props
    const movieImage = screen.getByTestId('movie-image')
    expect(movieImage).toHaveAttribute('src', 'https://test.com/poster.jpg')
    expect(movieImage).toHaveAttribute('alt', 'Test Movie')
  })

  it('should render with priority prop', () => {
    render(<MovieCard movie={mockMovie} priority={true} />)

    // Component should still render correctly with priority prop
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('2024 • movie')).toBeInTheDocument()
  })

  it('should handle missing poster', () => {
    const movieWithoutPoster: MovieSummary = {
      ...mockMovie,
      Poster: 'N/A'
    }

    render(<MovieCard movie={movieWithoutPoster} />)

    // Should still render title and other information
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('2024 • movie')).toBeInTheDocument()
    
    // Check if MovieImage component is rendered with N/A poster
    const movieImage = screen.getByTestId('movie-image')
    expect(movieImage).toHaveAttribute('src', 'N/A')
  })
})