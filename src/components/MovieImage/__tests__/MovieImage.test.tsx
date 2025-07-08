import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MovieImage } from '../index'
import { ImageProps } from 'next/image'

// Mock NotFoundImage component
jest.mock('@/components/NotFoundImage', () => ({
  NotFoundImage: function MockNotFoundImage() {
    return <div data-testid="mock-not-found">Not Found Image</div>
  }
}))

// Mock isValidUrl utility
jest.mock('@/utils/isValidUrl', () => ({
  isValidUrl: (url: string) => url === 'https://valid-image.jpg'
}))

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({ src, alt, onError, priority, loading, ...imgProps }: Partial<ImageProps> & { onError?: () => void }) {
    return (
      <img
        src={src as string}
        alt={alt}
        loading={loading}
        data-priority={priority}
        {...imgProps}
        data-testid="mock-next-image"
        onError={onError}
      />
    )
  }
})

describe('MovieImage', () => {
  const validProps = {
    src: 'https://valid-image.jpg',
    title: 'Test Movie',
    priority: true
  }

  it('renders image correctly with valid URL', () => {
    render(<MovieImage {...validProps} />)

    const image = screen.getByTestId('mock-next-image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', validProps.src)
    expect(image).toHaveAttribute('alt', validProps.title)
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('data-priority', 'true')
    expect(image).toHaveClass('w-full', 'min-h-90', 'max-h-120', 'object-cover', 'mb-2', 'rounded-xl', 'sm:mb-0')
  })

  it('renders NotFoundImage when URL is invalid', () => {
    render(
      <MovieImage
        src="https://invalid-image.jpg"
        title="Test Movie"
      />
    )

    expect(screen.getByTestId('mock-not-found')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-next-image')).not.toBeInTheDocument()
  })

  it('renders NotFoundImage when src is empty', () => {
    render(
      <MovieImage
        src=""
        title="Test Movie"
      />
    )

    expect(screen.getByTestId('mock-not-found')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-next-image')).not.toBeInTheDocument()
  })

  it('renders NotFoundImage when image fails to load', () => {
    render(<MovieImage {...validProps} />)

    const image = screen.getByTestId('mock-next-image')
    expect(image).toBeInTheDocument()

    // Simulate image load error
    fireEvent.error(image)

    expect(screen.getByTestId('mock-not-found')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-next-image')).not.toBeInTheDocument()
  })

  it('uses lazy loading when priority is false', () => {
    render(
      <MovieImage
        src={validProps.src}
        title={validProps.title}
        priority={false}
      />
    )

    const image = screen.getByTestId('mock-next-image')
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('data-priority', 'false')
  })

  it('uses default priority (false) when not provided', () => {
    render(
      <MovieImage
        src={validProps.src}
        title={validProps.title}
      />
    )

    const image = screen.getByTestId('mock-next-image')
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('data-priority', 'false')
  })

  it('passes quality and placeholder props to next/image', () => {
    render(<MovieImage {...validProps} />)

    const image = screen.getByTestId('mock-next-image')
    expect(image).toHaveAttribute('quality', '75')
  })
}) 