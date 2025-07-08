import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MovieDetailCard from '../index'
import { MovieDetail } from '@/domain/models'

// Mock the BackButton component
jest.mock('@/components/BackButton', () => {
  return function MockBackButton({ handleBack }: { handleBack: () => void }) {
    return (
      <button onClick={handleBack} data-testid="mock-back-button">
        Back
      </button>
    )
  }
})

// Mock the MovieImage component
jest.mock('@/components/MovieImage', () => ({
  MovieImage: function MockMovieImage({
    src,
    title,
  }: {
    src: string
    title: string
    priority?: boolean
  }) {
    return (
      <div data-testid="mock-movie-image">
        <img src={src} alt={title} />
      </div>
    )
  }
}))

describe('MovieDetailCard', () => {
  const mockMovie: MovieDetail = {
    Title: 'Test Movie',
    Year: '2024',
    Genre: 'Action, Drama',
    Director: 'Test Director',
    Actors: 'Actor 1, Actor 2',
    Plot: 'Test plot description',
    Poster: 'test-poster.jpg',
    imdbID: 'tt1234567',
    Type: 'movie',
    Response: 'True'
  }

  const mockHandleBack = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders movie details correctly', () => {
    render(<MovieDetailCard data={mockMovie} handleBack={mockHandleBack} />)

    // Check title
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(mockMovie.Title)

    // Check movie details
    expect(screen.getByText(`Year:`)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.Year)).toBeInTheDocument()
    expect(screen.getByText(`Genre:`)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.Genre)).toBeInTheDocument()
    expect(screen.getByText(`Director:`)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.Director)).toBeInTheDocument()
    expect(screen.getByText(`Actors:`)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.Actors)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.Plot)).toBeInTheDocument()
  })

  it('renders MovieImage with correct props', () => {
    render(<MovieDetailCard data={mockMovie} handleBack={mockHandleBack} />)

    const movieImage = screen.getByTestId('mock-movie-image')
    expect(movieImage).toBeInTheDocument()

    const image = movieImage.querySelector('img')
    expect(image).toHaveAttribute('src', mockMovie.Poster)
    expect(image).toHaveAttribute('alt', mockMovie.Title)
  })

  it('renders BackButton and handles click', () => {
    render(<MovieDetailCard data={mockMovie} handleBack={mockHandleBack} />)

    const backButton = screen.getByTestId('mock-back-button')
    expect(backButton).toBeInTheDocument()

    backButton.click()
    expect(mockHandleBack).toHaveBeenCalledTimes(1)
  })

  it('applies correct layout classes', () => {
    render(<MovieDetailCard data={mockMovie} handleBack={mockHandleBack} />)

    // Main section
    const section = screen.getByRole('region')
    expect(section).toHaveClass('w-full', 'p-5')

    // Header container
    const headerContainer = screen.getByTestId('header-container')
    expect(headerContainer).toHaveClass('flex', 'flex-row', 'items-center', 'gap-4')

    // Content container
    const contentContainer = screen.getByTestId('content-container')
    expect(contentContainer).toHaveClass('p-6', 'bg-neutral-800', 'rounded-xl', 'mt-4')

    // Layout container
    const layoutContainer = screen.getByTestId('layout-container')
    expect(layoutContainer).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'sm:gap-8')

    // Image container
    const imageContainer = screen.getByTestId('image-container')
    expect(imageContainer).toHaveClass('w-full', 'sm:max-w-80')

    // Details container
    const detailsContainer = screen.getByTestId('details-container')
    expect(detailsContainer).toHaveClass('text-white', 'mt-2', 'text-sm', 'sm:text-lg', 'sm:mt-0')
  })
}) 