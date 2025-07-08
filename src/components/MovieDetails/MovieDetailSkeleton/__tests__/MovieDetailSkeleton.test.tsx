import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MovieDetailSkeleton from '../index'

describe('MovieDetailSkeleton', () => {
  it('renders correctly', () => {
    render(<MovieDetailSkeleton />)

    // Check main container
    const mainContainer = screen.getByRole('main')
    expect(mainContainer).toBeInTheDocument()
    expect(mainContainer).toHaveClass('w-full', 'min-h-screen', 'bg-neutral-900')

    // Check animation container
    const animationContainer = screen.getByTestId('animation-container')
    expect(animationContainer).toBeInTheDocument()
    expect(animationContainer).toHaveClass('max-w-4xl', 'lg:max-w-7xl', 'mx-auto', 'p-4', 'animate-pulse')
  })

  it('renders header skeleton', () => {
    render(<MovieDetailSkeleton />)

    const headerContainer = screen.getByTestId('header-container')
    expect(headerContainer).toBeInTheDocument()
    expect(headerContainer).toHaveClass('flex', 'flex-row')

    // Check back button placeholder
    const backButtonPlaceholder = screen.getByTestId('back-button-placeholder')
    expect(backButtonPlaceholder).toBeInTheDocument()
    expect(backButtonPlaceholder).toHaveClass('h-10', 'w-10', 'sm:h-15', 'sm:w-15', 'bg-white/10', 'rounded-full')

    // Check title placeholder
    const titlePlaceholder = screen.getByTestId('title-placeholder')
    expect(titlePlaceholder).toBeInTheDocument()
    expect(titlePlaceholder).toHaveClass('h-10', 'w-60', 'sm:h-15', 'sm:w-2xl', 'bg-white/10', 'rounded', 'ml-4')
  })

  it('renders content skeleton', () => {
    render(<MovieDetailSkeleton />)

    const contentContainer = screen.getByTestId('content-container')
    expect(contentContainer).toBeInTheDocument()
    expect(contentContainer).toHaveClass('bg-neutral-800', 'rounded-xl', 'p-6', 'flex-col', 'flex', 'sm:flex-row', 'gap-8')

    // Check poster placeholder
    const posterPlaceholder = screen.getByTestId('poster-placeholder')
    expect(posterPlaceholder).toBeInTheDocument()
    expect(posterPlaceholder).toHaveClass('w-full', 'h-100', 'sm:w-xs', 'sm:h-120', 'bg-white/10', 'rounded-xl')

    // Check details placeholders
    const detailsContainer = screen.getByTestId('details-container')
    expect(detailsContainer).toBeInTheDocument()
    expect(detailsContainer).toHaveClass('flex-1', 'space-y-4')

    // Check info placeholders
    const infoPlaceholders = screen.getAllByTestId('info-placeholder')
    expect(infoPlaceholders).toHaveLength(5)
    infoPlaceholders.forEach(placeholder => {
      expect(placeholder).toHaveClass('h-4', 'bg-white/10', 'rounded')
    })

    // Check plot placeholders
    const plotContainer = screen.getByTestId('plot-container')
    expect(plotContainer).toBeInTheDocument()
    expect(plotContainer).toHaveClass('mt-6', 'space-y-2')

    const plotPlaceholders = screen.getAllByTestId('plot-placeholder')
    expect(plotPlaceholders).toHaveLength(3)
    plotPlaceholders.forEach(placeholder => {
      expect(placeholder).toHaveClass('h-4', 'bg-white/10', 'rounded')
    })
  })
}) 