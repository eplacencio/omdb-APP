import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ErrorMessage from '../index'

describe('ErrorMessage', () => {
  it('should render with default props', () => {
    render(<ErrorMessage />)

    // Check default title and message
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Oops!')).toBeInTheDocument()
    expect(screen.getByText('Not found')).toBeInTheDocument()

    // Back button should not be present by default
    expect(screen.queryByText('Go home')).not.toBeInTheDocument()
  })

  it('should render with custom title and message', () => {
    const props = {
      title: 'Custom Error',
      message: 'Something went wrong'
    }

    render(<ErrorMessage {...props} />)

    expect(screen.getByText('Custom Error')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('should render additional info when provided', () => {
    const props = {
      moreInfo: 'Please try again later'
    }

    render(<ErrorMessage {...props} />)

    expect(screen.getByText('Please try again later')).toBeInTheDocument()
  })

  it('should render and handle back button when provided', () => {
    const handleBack = jest.fn()
    
    render(<ErrorMessage handleBack={handleBack} />)

    const backButton = screen.getByText('Go home')
    expect(backButton).toBeInTheDocument()

    fireEvent.click(backButton)
    expect(handleBack).toHaveBeenCalledTimes(1)
  })

  it('should render only title when other props are not provided', () => {
    render(<ErrorMessage title="Error" message={undefined} moreInfo={undefined} />)

    // Title should be rendered
    expect(screen.getByText('Error')).toBeInTheDocument()

    // Optional elements should not be rendered
    expect(screen.queryByText(/Please try again/)).not.toBeInTheDocument()
    expect(screen.queryByText('Go home')).not.toBeInTheDocument()
  })
}) 