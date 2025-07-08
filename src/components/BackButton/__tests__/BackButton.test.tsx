import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import BackButton from '../index'

describe('BackButton', () => {
  it('renders correctly', () => {
    const handleBack = jest.fn()
    render(<BackButton handleBack={handleBack} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('←')
  })

  it('calls handleBack when clicked', () => {
    const handleBack = jest.fn()
    render(<BackButton handleBack={handleBack} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleBack).toHaveBeenCalledTimes(1)
  })

  it('has correct styling classes', () => {
    const handleBack = jest.fn()
    render(<BackButton handleBack={handleBack} />)

    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'flex',
      'justify-center',
      'items-center',
      'text-white',
      'sm:text-2xl',
      'font-bebas',
      'bg-neutral-800',
      'rounded-full',
      'p-2',
      'h-10',
      'w-10',
      'sm:p-5',
      'sm:w-15',
      'sm:h-15',
      'cursor-pointer',
      'text-lg'
    )
  })
}) 