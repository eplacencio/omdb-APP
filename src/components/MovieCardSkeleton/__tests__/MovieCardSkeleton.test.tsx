import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MovieCardSkeleton from '../index'

describe('MovieCardSkeleton', () => {
  it('renders correctly', () => {
    render(<MovieCardSkeleton />)

    // Check main container
    const container = screen.getByTestId('movie-card-skeleton')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass(
      'bg-white/10',
      'rounded-xl',
      'shadow',
      'animate-pulse',
      'overflow-hidden'
    )
  })

  it('renders image placeholder', () => {
    render(<MovieCardSkeleton />)

    const imagePlaceholder = screen.getByTestId('image-placeholder')
    expect(imagePlaceholder).toBeInTheDocument()
    expect(imagePlaceholder).toHaveClass(
      'w-full',
      'h-90',
      'sm:h-84',
      'bg-white/20'
    )
  })

  it('renders content placeholders', () => {
    render(<MovieCardSkeleton />)

    const contentContainer = screen.getByTestId('content-container')
    expect(contentContainer).toBeInTheDocument()
    expect(contentContainer).toHaveClass('p-3', 'space-y-2')

    // Title placeholder
    const titlePlaceholder = screen.getByTestId('title-placeholder')
    expect(titlePlaceholder).toBeInTheDocument()
    expect(titlePlaceholder).toHaveClass('h-4', 'w-3/4', 'bg-white/20', 'rounded')

    // Subtitle placeholder
    const subtitlePlaceholder = screen.getByTestId('subtitle-placeholder')
    expect(subtitlePlaceholder).toBeInTheDocument()
    expect(subtitlePlaceholder).toHaveClass('h-3', 'w-1/2', 'bg-white/10', 'rounded')
  })
}) 