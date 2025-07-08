import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MovieCardComponent from '..'
import { MovieSummary } from '@/domain/models'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} data-testid="mock-next-image" data-priority={priority ? 'true' : undefined} />
  },
}))

const mockMovie: MovieSummary = {
  Title: 'Test Movie',
  Year: '2024',
  imdbID: 'tt1234567',
  Type: 'movie',
  Poster: 'https://test.com/poster.jpg'
}

describe('MovieCard', () => {
  it('renders movie information correctly', () => {
    render(<MovieCardComponent movie={mockMovie} />)

    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('2024 • movie')).toBeInTheDocument()
    expect(screen.getByTestId('mock-next-image')).toHaveAttribute('src', 'https://test.com/poster.jpg')
  })

  it('handles missing poster gracefully', () => {
    const movieWithoutPoster = { ...mockMovie, Poster: 'N/A' }
    render(<MovieCardComponent movie={movieWithoutPoster} />)

    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByTestId('mock-next-image')).toBeInTheDocument()
  })

  it('handles priority prop correctly', () => {
    render(<MovieCardComponent movie={mockMovie} priority />)

    const image = screen.getByTestId('mock-next-image')
    expect(image).toHaveAttribute('data-priority', 'true')
  })
})