import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomeBanner from '../index'

// Mock the SearchBar component since we don't want to test its functionality here
jest.mock('../../SearchBar', () => {
  return function MockSearchBar() {
    return <div data-testid="mock-search-bar">Search Bar</div>
  }
})

describe('HomeBanner', () => {
  it('renders correctly', () => {
    render(<HomeBanner />)

    // Check if the main section exists with correct styles
    const mainSection = screen.getByRole('region')
    expect(mainSection).toBeInTheDocument()
    expect(mainSection).toHaveClass(
      'relative',
      'h-120',
      'sm:h-180',
      'bg-cover',
      'bg-center',
      'bg-no-repeat',
      'flex',
      'items-center',
      'flex-col',
      'justify-center',
      'w-full'
    )

    // Check if background image is set correctly
    expect(mainSection).toHaveStyle({
      backgroundImage: "url('/cinema-screen-unsplash.jpg')"
    })
  })

  it('renders title and description', () => {
    render(<HomeBanner />)

    // Check title
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass(
      'text-3xl',
      'sm:text-6xl',
      'font-bold',
      'mb-2',
      'text-center',
      'text-white',
      'text-shadow-lg',
      'font-bebas'
    )
    expect(title).toHaveTextContent('🎬 Discover Movies and Series Instantly')

    // Check description
    const description = screen.getByText(/Explore a vast collection/)
    expect(description).toBeInTheDocument()
    expect(description).toHaveClass(
      'text-md',
      'text-center',
      'my-6',
      'sm:my-14',
      'text-white',
      'sm:text-lg',
      'z-10'
    )
  })

  it('includes SearchBar component', () => {
    render(<HomeBanner />)

    // Check if SearchBar is rendered
    const searchBar = screen.getByTestId('mock-search-bar')
    expect(searchBar).toBeInTheDocument()
  })

  it('renders overlay elements', () => {
    render(<HomeBanner />)

    // Check black overlay
    const blackOverlay = screen.getByTestId('black-overlay')
    expect(blackOverlay).toBeInTheDocument()
    expect(blackOverlay).toHaveClass('absolute', 'inset-0', 'bg-black/40', 'z-0')

    // Check gradient overlay
    const gradientOverlay = screen.getByTestId('gradient-overlay')
    expect(gradientOverlay).toBeInTheDocument()
    expect(gradientOverlay).toHaveClass(
      'absolute',
      'bottom-0',
      'bg-gradient-to-t',
      'from-neutral-900',
      'via-transparent',
      'to-transparent',
      'h-30',
      'sm:h-60',
      'w-full'
    )
  })
}) 