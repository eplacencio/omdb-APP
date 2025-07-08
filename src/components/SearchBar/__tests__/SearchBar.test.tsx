import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchBar from '../index'

// Mock the store
const mockSetQuery = jest.fn()
const mockSetFilter = jest.fn()
const mockStore = {
  query: '',
  setQuery: mockSetQuery,
  filter: 'all' as const,
  setFilter: mockSetFilter
}

jest.mock('@/state/searchStore', () => ({
  useSearchStore: () => mockStore
}))

describe('SearchBar', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
    // Reset store to default values
    mockStore.query = ''
    mockStore.filter = 'all'
  })

  it('should render search input and filter select', () => {
    render(<SearchBar />)

    // Check if search input exists
    const searchInput = screen.getByPlaceholderText('Search movies or series...')
    expect(searchInput).toBeInTheDocument()

    // Check if filter select exists with all options
    const filterSelect = screen.getByRole('combobox')
    expect(filterSelect).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Movies' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Series' })).toBeInTheDocument()
  })

  it('should handle search input changes', () => {
    render(<SearchBar />)

    const searchInput = screen.getByPlaceholderText('Search movies or series...')
    fireEvent.change(searchInput, { target: { value: 'test movie' } })

    expect(mockSetQuery).toHaveBeenCalledWith('test movie')
  })

  it('should handle filter select changes', () => {
    render(<SearchBar />)

    const filterSelect = screen.getByRole('combobox')
    fireEvent.change(filterSelect, { target: { value: 'movie' } })

    expect(mockSetFilter).toHaveBeenCalledWith('movie')
  })

  it('should show clear button when query is not empty', () => {
    // Set non-empty query in store
    mockStore.query = 'test'

    render(<SearchBar />)

    // Check if clear button is visible
    const clearButton = screen.getByLabelText('Clear search')
    expect(clearButton).toBeInTheDocument()

    // Click clear button
    fireEvent.click(clearButton)
    expect(mockSetQuery).toHaveBeenCalledWith('')
  })

  it('should not show clear button when query is empty', () => {
    render(<SearchBar />)

    // Check that clear button is not present
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()
  })

  it('should handle all filter options', () => {
    render(<SearchBar />)

    const filterSelect = screen.getByRole('combobox')

    // Test each filter option
    fireEvent.change(filterSelect, { target: { value: 'all' } })
    expect(mockSetFilter).toHaveBeenCalledWith('all')

    fireEvent.change(filterSelect, { target: { value: 'movie' } })
    expect(mockSetFilter).toHaveBeenCalledWith('movie')

    fireEvent.change(filterSelect, { target: { value: 'series' } })
    expect(mockSetFilter).toHaveBeenCalledWith('series')
  })
}) 