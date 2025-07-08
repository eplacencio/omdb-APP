import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DotLoader from '../index'

describe('DotLoader', () => {
  it('renders correctly', () => {
    render(<DotLoader />)

    const container = screen.getByTestId('dot-loader')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('flex', 'justify-center', 'items-center', 'gap-1', 'h-10')
  })

  it('renders three dots with correct styling', () => {
    render(<DotLoader />)

    const dots = screen.getAllByTestId('dot')
    expect(dots).toHaveLength(3)

    // Check each dot's styling
    dots.forEach((dot) => {
      expect(dot).toHaveClass(
        'w-2',
        'h-2',
        'rounded-full',
        'bg-white',
        'animate-bounce'
      )
    })

    // Check animation delays
    expect(dots[0]).toHaveClass('[animation-delay:-0.3s]')
    expect(dots[1]).toHaveClass('[animation-delay:-0.15s]')
    // Last dot doesn't have animation delay
    expect(dots[2]).not.toHaveClass('[animation-delay]')
  })
}) 