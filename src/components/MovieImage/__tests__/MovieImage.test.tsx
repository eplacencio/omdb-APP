import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MovieImage } from '..'

// Mock NotFoundImage component
jest.mock('@/components/NotFoundImage', () => ({
  NotFoundImage: function MockNotFoundImage() {
    return <div data-testid="not-found-image">Not Found Image</div>
  }
}))

// Mock isValidUrl utility
jest.mock('@/utils/isValidUrl', () => ({
  isValidUrl: (url: string) => url.startsWith('https://test.com/')
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} data-testid="mock-next-image" data-priority={priority ? 'true' : undefined} />
  },
}))

const validProps = {
  src: 'https://test.com/image.jpg',
  title: 'Test Image',
  priority: false
}

describe('MovieImage', () => {
  it('renders image correctly with valid URL', () => {
    render(<MovieImage {...validProps} />)

    const image = screen.getByTestId('mock-next-image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', validProps.src)
    expect(image).toHaveAttribute('alt', validProps.title)
  })

  it('renders NotFoundImage when URL is invalid', () => {
    render(<MovieImage {...validProps} src="invalid-url" />)

    expect(screen.getByTestId('not-found-image')).toBeInTheDocument()
  })

  it('renders NotFoundImage when src is empty', () => {
    render(<MovieImage {...validProps} src="" />)

    expect(screen.getByTestId('not-found-image')).toBeInTheDocument()
  })

  it('handles priority prop correctly', () => {
    render(<MovieImage {...validProps} priority />)

    const image = screen.getByTestId('mock-next-image')
    expect(image).toHaveAttribute('data-priority', 'true')
  })
}) 