import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { NotFoundImage } from '../index'

describe('NotFoundImage', () => {
  it('renders correctly', () => {
    render(<NotFoundImage />)

    // Verify container styles
    const container = screen.getByTestId('not-found-container')
    expect(container).toHaveClass(
      'bg-neutral-700',
      'items-center',
      'justify-center',
      'text-center',
      'text-4xl',
      'w-full',
      'h-90',
      'rounded-xl',
      'text-neutral-500',
      'flex',
      'flex-col'
    )

    // Verify error code text
    const errorCode = screen.getByText('4☹︎4')
    expect(errorCode).toBeInTheDocument()
    expect(errorCode).toHaveClass('tracking-widest')

    // Verify error message text
    const errorMessage = screen.getByText('not found')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('text-sm')
  })
}) 